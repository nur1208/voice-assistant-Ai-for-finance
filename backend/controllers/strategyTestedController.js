import StrategyTestedModel from "../models/strategyTestedModel.js";

export const createStrategyTested = async (req, res) => {
  const strategyTested = new StrategyTestedModel(req.body);

  try {
    const newDoc = await strategyTested.save();
    res.json({ status: "success", doc: newDoc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fall", message: "something went wrong" });
  }
};

export const getStrategyTested = async (req, res) => {
  try {
    const queryObject = {};

    const validUpdateProp = [
      "boughtDate",
      "symbol",
      "soldDate",
      "isReachedStopLoss",
    ];

    for (let index = 0; index < validUpdateProp.length; index++) {
      const prop = validUpdateProp[index];
      if (req.query[prop]) {
        queryObject[prop] = req.query[prop];
      }
    }

    console.log(queryObject);
    const docs = await StrategyTestedModel.find(queryObject);

    if (docs.length > 0)
      res.json({ status: "success", resultLength: docs.length, docs });
    else
      res.status(404).json({
        status: "fall",
        message: "didn't find tested date",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fall", message: "something went wrong" });
  }
};

export const deleteStrategyTested = async (req, res) => {
  try {
    await StrategyTestedModel.deleteMany();
    res.json({
      status: "success",
      message: "tested date result deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fall", message: "something went wrong" });
  }
};
