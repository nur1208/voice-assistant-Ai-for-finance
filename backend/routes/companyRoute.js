import express from "express";
import {
  createCompany,
  getCompanies,
  currentPrice,
} from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.route("/").post(createCompany).get(getCompanies);

companyRouter.get("/currentPrice/:ticker", currentPrice);

export default companyRouter;
