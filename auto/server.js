import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import dotenv from "dotenv";

import cheerio from "cheerio";
// let axios = require("axios");
import axios from "axios";
import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";
import morgan from "morgan";
import { scrollHandler } from "./controllers/newsControllers.js";
import {
  checkForBrowser,
  closeHandler,
  findingAnswersHandler,
  findingCompaniesHandler,
  openHandler,
} from "./controllers/commonController.js";
import {
  changeChartHandler,
  changeDateHandler,
  dateValidation,
  zoomHandler,
} from "./controllers/chartController.js";
import { sendEmailHandler } from "./controllers/sendEmailController.js";
import { sendEmailHandlerV2 } from "./controllers/sendEmailHandlerV2.js";
import { protect } from "./controllers/authController.js";

dotenv.config();

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors("http://localhost:3000"));
app.use(morgan("dev"));
// app.use(protect);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// const BACKEND_API_URL = "http://localhost:4050";
const BACKEND_API_URL = "https://finansis-backend-v2.vercel.app";
const httpsAgent = new HttpsProxyAgent("http://127.0.0.1:9999");

app.post("/test", async (req, res) => {
  console.log(req.body);

  const questionObject = req.body;
  console.log(questionObject);

  try {
    // const { data } = await axiosWtihHA.post(
    //   `${BACKEND_API_URL}/api/v1/questions`,
    //   questionObject
    // );
    // const response = await fetch(`${BACKEND_API_URL}`, {
    //   agent: httpsAgent,
    //   // method: "POST",
    //   // body: JSON.stringify({
    //   //   autoKey: process.env.AUTO_SERVER_SECRET,
    //   // }),
    //   headers: {
    //     auth: process.env.AUTO_SERVER_SECRET,
    //     host: "something else",
    //   },
    // });
    const response = await fetch(
      `${BACKEND_API_URL}/api/v1/questions`,
      {
        agent: httpsAgent,
        method: "POST",
        body: JSON.stringify(questionObject),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          auth: process.env.AUTO_SERVER_SECRET,
        },
      }
    );
    const body = await response.text();
    console.log("here");
    console.log(body);
  } catch (error) {
    console.log(error);

    console.log(error.message + "❌");
    console.log("here");
    return res.status(500).json({
      status: "fail",
      message: "something went wrong from auto server",
    });
  }
  res.send("working!");
});

// export let browser;
// export let page;
let windowTypeHolder;

app.post("/findingAnswers", findingAnswersHandler);

app.post("/findingCompanies", findingCompaniesHandler);

app.post("/open", openHandler);

app.post("/close", closeHandler);

app.post(
  "/scroll",
  checkForBrowser("detailArticle"),
  scrollHandler
);
app.post("/zoom", checkForBrowser("chart"), zoomHandler);

app.post(
  "/changeChart",
  checkForBrowser("chart"),
  changeChartHandler
);

app.post(
  "/changeDate",
  checkForBrowser("chart"),
  dateValidation,
  changeDateHandler
);

app.post("/sendEmail", sendEmailHandlerV2);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
