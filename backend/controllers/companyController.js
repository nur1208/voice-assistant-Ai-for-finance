import CompanyModel from "../models/Company.js";

export const createCompany = async (req, res) => {
  const { symbol, name } = req.body;
  const newCompany = new CompanyModel({ symbol, name });
  const doc = await newCompany.save();

  res.json({
    status: "success",
    message: "company added successfully",
    doc,
  });
};

export const getCompanies = async (req, res) => {
  const { name, symbol } = req.query;
  let queryObject = {};
  if (name) {
    queryObject.name = { $regex: `(\\b)${name}`, $options: "i" };
  }

  if (symbol) {
    queryObject.symbol = symbol.toUpperCase();
  }

  const companies = await CompanyModel.find(queryObject);

  if (companies.length)
    res.json({
      status: "success",
      resultLength: companies.length,
      doc: companies,
    });
  else
    res.status(404).json({
      status: "fall",
      message: `didn't find any company with '${name}' name`,
    });
};
