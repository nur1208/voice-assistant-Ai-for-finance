import express from "express";
import {
  createNews,
  getNews,
} from "../controllers/newsController.js";
const newsRouter = express.Router();

newsRouter.route("/").post(createNews).get(getNews);

// newsRouter.get("/", (req, res) => {
//   res.send("working");
// });
export default newsRouter;
