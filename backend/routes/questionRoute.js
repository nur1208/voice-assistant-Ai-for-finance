import express from "express";
import {
  createQuestion,
  getQuestions,
} from "../controllers/questionController.js";

const questionRouter = express.Router();

questionRouter.route("/").post(createQuestion).get(getQuestions);

export default questionRouter;
