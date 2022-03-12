import express from "express";
import { login, signUp } from "../controllers/authController.js";
import { createUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

userRouter.route("/").post(createUser);

export default userRouter;
