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

export const updateWatchList = catchAsync(
  async (req, res, next) => {
    let watchList;
    if (req.body.watchList && req.body.watchList.length > 0) {
      // if watchList is exist in user document
      if (req.user.watchList && req.user.watchList.length > 0) {
        const userWatchListOnlyIds = req.user.watchList.map(
          ({ _id }) => _id.toString()
        );

        const isThereDuplicate = req.body.watchList.map(
          (stock) => userWatchListOnlyIds.includes(stock)
        );
        if (isThereDuplicate.includes(true))
          return next(
            new AppError(
              "found duplicate stocks in watchList, each element in it must be unique",
              400
            )
          );

        watchList = [
          ...userWatchListOnlyIds,
          ...req.body.watchList,
        ];
      } else {
        watchList = [...req.body.watchList];
      }
    }

    if (
      req.body.removeWatchList &&
      req.body.removeWatchList.length > 0
    ) {
      // if watchList is exist in user document

      if (req.user.watchList && req.user.watchList.length > 0) {
        const userWatchListOnlyIds = req.user.watchList.map(
          ({ _id }) => _id.toString()
        );

        const isAllExist = req.body.removeWatchList.map(
          (stock) => userWatchListOnlyIds.includes(stock)
        );
        if (isAllExist.includes(false))
          return next(
            new AppError(
              "one of the element in removeWatchList not exist in user's watchList",
              400
            )
          );

        const a = userWatchListOnlyIds;
        const b = req.body.removeWatchList;
        watchList = a.filter((x) => b.indexOf(x) === -1);
      } else {
        return next(
          new AppError("user's watchList is empty", 400)
        );
      }
    }

    // remove old watchList and add a new one
    req.body.watchList = watchList;

    next();
  }
);

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

  const filteredBody = filterObj(
    req.body,
    "name",
    "gender",
    "watchList",
    "executableChromePath"
  );
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
        watchList: updatedUser?.watchList,
        executableChromePath: updatedUser.executableChromePath,
      },
    },
  });
});
