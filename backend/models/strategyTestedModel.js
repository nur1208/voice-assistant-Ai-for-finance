import mongoose from "mongoose";

const strategyTestedSchema = new mongoose.Schema(
  {
    boughtDate: Date,
    boughtPrice: Number,
    soldDate: Date,
    soldPrice: Number,
    symbol: String,
    shares: Number,
    stopLessPrice: Number,
    isReachedStopLoss: Boolean,
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
