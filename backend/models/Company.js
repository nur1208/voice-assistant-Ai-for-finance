import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    symbol: { type: String, unique: true, index: true },
    name: String,
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
