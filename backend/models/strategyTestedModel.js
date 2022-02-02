import mongoose from "mongoose";

const strategyTestedSchema = new mongoose.Schema(
  {
    boughtDate: { type: String, unique: true },
    boughtPrice: String,
    soldDate: String,
    soldPrice: String,
    symbol: String,
    shares: String,
    shares: String,
  },
  {
    timestamps: true,
  }
);

const StrategyTestedModel = mongoose.model(
  "StrategyTested",
  strategyTestedSchema
);

export default StrategyTestedModel;
