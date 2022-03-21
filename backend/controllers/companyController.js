import axios from "axios";
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

export const currentPrice = async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v8/finance/chart/${req.params.ticker}`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
          "Accept-Encoding": "none",
          "Accept-Language": "en-US,en;q = 0.8",
          Connection: "keep-alive",
          Referer: "https://cssspritegenerator.com",
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11",
        },
        // proxy: {
        //   host: "127.0.0.1",
        //   port: 4780,
        // },
      }
    );
    res.json(data);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
