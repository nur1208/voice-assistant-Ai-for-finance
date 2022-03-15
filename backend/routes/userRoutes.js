import express from "express";
import {
  forgetPassword,
  login,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController.js";
import {
  createUser,
  updateMe,
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

userRouter.route("/").post(createUser);

userRouter.route("/:id").put(updateMe);

export default userRouter;
