import express from "express";
import {
  forgetPassword,
  login,
  protect,
  resetPassword,
  signUp,
  updatePassword,
} from "../controllers/authController.js";
import {
  createUser,
  updateMe,
  updateWatchList,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

// if the user forget his/her password, he/she can reset his/her password,
//this route for sending the token to hir/her email using one middleware:
// forgetPassword
userRouter.post("/forgetPassword", forgetPassword);

userRouter.put("/resetPassword", resetPassword);

// only logged in users allowed to access routes after this line
userRouter.use(protect);

userRouter.put("/updateMyPassword", updatePassword);

userRouter.route("/").post(createUser);

userRouter.route("/:id").put(updateWatchList, updateMe);

export default userRouter;
