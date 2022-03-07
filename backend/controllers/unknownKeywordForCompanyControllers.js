import unknownKeywordForCompanyModel from "../models/unknownKeywordForCompanyModel.js";

export const createUnknownKeywordForCompany = async (
  req,
  res
) => {
  const { keyword } = req.body;
  const newDoc = new unknownKeywordForCompanyModel({ keyword });
  const doc = await newDoc.save();

  res.json({
    status: "success",
    message: "keyword added successfully",
    doc,
  });
};

export const getUnknownKeywordForCompany = async (req, res) => {
  const { keyword } = req.query;

  const docs = await unknownKeywordForCompanyModel.find({
    keyword,
  });

  // zero is false
  if (docs.length)
    res.json({
      status: "success",
      resultLength: docs.length,
      docs,
    });
  else
    res.json({
      status: "fall",
      message: `didn't find '${keyword}' keyword`,
    });
};
