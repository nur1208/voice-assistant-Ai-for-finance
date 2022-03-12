import express from "express";
import {
  login,
  protect,
  signUp,
} from "../controllers/authController.js";
import {
  createUser,
  updateMe,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

// only logged in users allowed to access routes after this line
userRouter.use(protect);

userRouter.route("/").post(createUser);

userRouter.route("/:id").put(updateMe);

export default userRouter;
