import mongoose from "mongoose";

const unknownKeywordForCompanySchema = new mongoose.Schema(
  {
    keyword: { type: String, unique: true, index: true },
  },
  {
    timestamps: true,
  }
);

const unknownKeywordForCompanyModel = mongoose.model(
  "UnknownKeywordForCompany",
  unknownKeywordForCompanySchema
);

export default unknownKeywordForCompanyModel;
