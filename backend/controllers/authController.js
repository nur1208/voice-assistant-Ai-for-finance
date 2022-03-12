import { promisify } from "util";
// import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
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

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // if env production set secure to true
    // cuz we only need that in production
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  const { name, gender, email } = user;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: { name, gender, email } },
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

  createSendToken(newUser, 201, res);
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

  createSendToken(user, 200, res);
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
  // if the user delete after we send him a token
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
