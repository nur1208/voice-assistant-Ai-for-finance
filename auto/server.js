import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import cheerio from "cheerio";
import axios from "axios";
import { scrollHandler } from "./controllers/newsControllers.js";
import {
  closeHandler,
  findingAnswersHandler,
  findingCompaniesHandler,
  openHandler,
} from "./controllers/commonController.js";
import {
  changeChartHandler,
  zoomHandler,
} from "./controllers/chartController.js";
const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// export let browser;
// export let page;
let windowTypeHolder;

app.use(express.json());
app.use(cors("http://localhost:3000"));
// app.use(morgan("dev"));

app.post("/findingAnswers", findingAnswersHandler);

app.post("/findingCompanies", findingCompaniesHandler);

app.post("/open", openHandler);

app.post("/close", closeHandler);

app.post("/scroll", scrollHandler);
app.post("/zoom", zoomHandler);

app.post("/changeChart", changeChartHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
