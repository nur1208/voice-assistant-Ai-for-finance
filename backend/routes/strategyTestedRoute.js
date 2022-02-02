import express from "express";
import {
  createStrategyTested,
  deleteStrategyTested,
  getStrategyTested,
} from "../controllers/strategyTestedController.js";

const strategyTestedRouter = express.Router();

strategyTestedRouter
  .route("/")
  .post(createStrategyTested)
  .get(getStrategyTested)
  .delete(deleteStrategyTested);

export default strategyTestedRouter;
