import express from "express";
import {
  createUnknownKeywordForCompany,
  getUnknownKeywordForCompany,
} from "../controllers/unknownKeywordForCompanyControllers.js";

const unknownKeywordForCompanyRouter = express.Router();

unknownKeywordForCompanyRouter
  .route("/")
  .post(createUnknownKeywordForCompany)
  .get(getUnknownKeywordForCompany);

export default unknownKeywordForCompanyRouter;
