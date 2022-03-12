import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
const saltRounds = 10;

export const createUser = async (req, res) => {
  try {
    const { password, ...body } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );
    // console.log({ password, body, hashedPassword });

    let genderLocal;
    if (body.gender) {
      genderLocal = body.gender.toLowerCase();
    }

    const newUser = new UserModel({
      ...body,
      password: hashedPassword,
      gender: genderLocal,
    });

    const { name, email, gender } = await newUser.save();

    res.json({
      status: "success",
      message: "user added successfully",
      doc: { name, email, gender },
    });
  } catch (error) {
    console.log(error);

    if (error.message.includes("duplicate key error"))
      return res.status(401).json({
        status: "fall",
        message: "email is exist",
      });

    res.status(500).json({
      status: "fall",
      message: error.message,
    });
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      if (el === "gender") {
        newObj[el] = obj[el].toLowerCase();
      } else {
        newObj[el] = obj[el];
      }
    }
  });

  return newObj;
};

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) current error if the user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update please use /updateMyPassword",
        400
      )
    );
  }
  // 2) update user current data

  const filteredBody = filterObj(req.body, "name", "gender");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        id: updatedUser._id,
      },
    },
  });
});
