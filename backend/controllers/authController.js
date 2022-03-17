import { promisify } from "util";
// import crypto from "crypto";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
// import sendEmail from "../utils/sendEmail.js";
import {
  AUTO_SERVER,
  FRONTEND_SERVER,
} from "../utils/serverUtils.js";
// import sendEmail from "../../utils/sendEmail.js";
// import { Email } from "../../utils/email.js";

const signToken = (id) => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const { name, gender, email, _id } = user;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: { name, gender, email, id: _id } },
  });
};

/**
 * signUp middleware is very simple, it for registering users to our server, a user should pass name, email, password, passwordConfirm
 */
export const signUp = catchAsync(async (req, res) => {
  // make sure gender value is always lower case
  let genderLocal;
  if (req.body.gender) {
    genderLocal = req.body.gender.toLowerCase();
  }

  const newUser = await User.create({
    ...req.body,
    gender: genderLocal,
  });

  createSendToken(newUser, 201, req, res);
});

/**
 * login middleware is for login user to our server
 * - the user must send email and password in req.body
 * - checking if the email exist in our database
 * - if the email exist check if the password correct using bcrypt.compare function
 * - if all checking passed
 * - set jwt token in a user's browser cookie
 * - send jwt and a user info to the cline
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log("here");

  // 1 check if email and password exist

  if (!email || !password) {
    return next(
      new AppError("please provide email and password", 400)
    );
  }

  // 2 check if a user exist and the password correct

  const user = await User.findOne({ email }).select("+password");

  const isCorrectPassword = await user?.correctPassword(
    password,
    user.password
  );
  // console.log({ isCorrectPassword });

  // 401 means unauthorized
  if (!user || !isCorrectPassword) {
    return next(
      new AppError("Incorrect email or password", 401)
    );
  }

  // 3 if the everything okay send the token to the clint

  createSendToken(user, 200, req, res);
});

/**
 * protect middleware for allowing only logged in user to access all protect routes
 * - using jwt jsonWebToken that will be create and then send it to a user every time a user login to our system
 * - when a user send request to protect route a user need to send jwt to access that protect route
 * - if a user allowed to access a protect route then send a data to a user else send a user some error message
 */
export const protect = catchAsync(async (req, res, next) => {
  let token;
  // console.log(`here`);

  // 1 getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "you are not logged in! Please log in to get access",
        401
      )
    );
  }
  // 2 verification token
  const decode = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3 check if user still exists
  const currentUser = await User.findById(decode.id);
  // if the user deleted after we send him a token
  // and before the token expired
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist",
        401,
        "TokenExpiredError"
      )
    );
  }

  // grant access to protected route
  req.user = currentUser;
  next();
});

/**
 * forgetPassword middleware is for sending reset token to the user using the following steps:
 * - get user based on Posted email
 * - generate the random token
 * - send it to user's email
 */
export const forgetPassword = catchAsync(
  async (req, res, next) => {
    // 1) get user based on Posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError(
          "There is no user with that email address",
          404
        )
      );
    }
    // 2) generate the random token
    const resetToken = user.createPasswordRestToken();

    await user.save({ validateBeforeSave: false });

    // 3) send it to user's email
    const resetURL = `${FRONTEND_SERVER}/resetPassword/${resetToken}`;

    const message = `<div style="text-align: center; "><span style="font-size: 18px;">hey ${user.name}, I am finansis, please click the link to reset your password </span></div><div style="text-align: center; "><span style="font-size: 14px;">(or copy the link and paste it in your browser if you can't click it)</span><span style="font-size: 14px;">, (if you didn't forget your password, please ignore this email)</span><div style="text-align: center; "><span style="font-size: 18px;">${resetURL}</span></div>`;

    console.log(message);

    try {
      await axios.post(`${AUTO_SERVER}/sendEmail`, {
        to: user.email,
        subject:
          "your password reset token valid for 10 minutes",
        html: message,
      });

      // for test
      // await sendEmail({
      //   email: user.email,
      //   subject:
      //     "your password reset token valid for 10 minutes",
      //   message,
      // });

      // console.log("here");

      res.status(200).json({
        status: "success",
        message:
          "reset Token sent to your email successfully, the reset token valid for 10 minutes",
        data: {},
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.log(error);

      return next(
        new AppError(
          "there was an error sending the email, Try again later",
          500
        )
      );
    }
  }
);

/**
 * resetPassword middleware for validating reset token and reset a user password if the token is valid using the following steps:
 * -  get user base on the token.
 * - if token has not expired and there is a user so in that case, set the new password
 * - update the changedPasswordAt for the current user
 * - log the user in, send the JSON Web Token to the client
 */
export const resetPassword = async (req, res, next) => {
  // 1) get user base on the token.

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2)if token has not expired and there is a user so in that case, set the new password
  if (!user) {
    return next(
      new AppError("Token is invalid or has expired", 400)
    );
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // 3) update the changedPasswordAt for the current user
  // we did using per save mongoose middleware
  await user.save();

  //4) log the user in, send the JSON Web Token to the client
  createSendToken(user, 201, req, res);
};

/**
 * updatePassword is middleware for already logged in users update their password
 * using the following steps:
 *  - get the user from the collection
 *  - check if posted current password is correct
 *  - if all conditions passed update password
 *  - "re login" the user
 */
export const updatePassword = async (req, res, next) => {
  //  1 ) get the user from the collection
  const { password, newPassword } = req.body;
  const user = await User.findById(req.user.id).select(
    "+password"
  );

  if (!user) {
    return next(
      new AppError("user with that id not exist", 404)
    );
  }
  // 2 ) check if posted current password is correct

  if (!password) {
    return next(new AppError("password is required", 400));
  }

  if (!newPassword) {
    return next(new AppError("newPassword is required", 400));
  }

  if (await user.correctPassword(password, user.password)) {
    return next(new AppError("incorrect password", 401));
  }
  // 3 ) if _id, update password

  user.password = newPassword;

  await user.save();
  // 4 ) log in the user
  createSendToken(user, 201, req, res);
};
