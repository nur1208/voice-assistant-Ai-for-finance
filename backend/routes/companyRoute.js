import express from "express";
import {
  createCompany,
  getCompanies,
} from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.route("/").post(createCompany).get(getCompanies);

export default companyRouter;
