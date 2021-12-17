import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";
import axios from "axios";
import {
  imageURLS,
  mainNewsWrapperV2,
  publishAtS,
  publishAtSV2,
  sourceS,
  sourceSV2,
  titleS,
  typeS,
  typeV2S,
  descriptionS,
  descriptionSV2,
  adDivS,
} from "./getYahooFinanceNewsSelector.js";
import { convertTimeSinceToDate } from "../utils.js";

export const getYahooFinanceNews = async () => {
  const mainPageHtml = "trailersContainer.html";
  const url = "https://finance.yahoo.com";

  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  // await page.goto(`${url}/news`);
  // await page.waitForSelector(mainNewsWrapperV2);

  // const html = await page.evaluate(() => document.body.innerHTML);

  // fs.writeFile(mainPageHtml, html, function (err) {
  //   if (err) throw err;
  //   console.log("Saved!");
  // });

  // read the html body from the file system (this is very faster then reading it from the internet)
  const html = await promisify(fs.readFile)(mainPageHtml);

  let $ = cheerio.load(html.toString());

  const lis = $(mainNewsWrapperV2).children().toArray();

  for (let index = 0; index < lis.length; index++) {
    const li = lis[index];

    const liHtml = $(li).html();

    const article = {};
    article.title = $(titleS, liHtml).text();

    // ads so skip them
    if ($(adDivS, liHtml).text()) continue;

    if ($(imageURLS, liHtml).attr("src")) {
      article.type = $(typeS, liHtml).text();
      article.publishAt = convertTimeSinceToDate(
        $(publishAtS, liHtml).text()
      );
      article.source = $(sourceS, liHtml).text();
      article.imageUrl = $(imageURLS, liHtml).attr("src");
      article.description = $(descriptionS, liHtml).text();
    } else {
      article.type = $(typeV2S, liHtml).text();
      article.publishAt = article.publishAt =
        convertTimeSinceToDate($(publishAtSV2, liHtml).text());

      article.source = $(sourceSV2, liHtml).text();
      article.description = $(descriptionSV2, liHtml).text();

      const apiUrl = "http://localhost:4050/api/v1/news";
      const {
        data: { isExist, articles },
      } = await axios.get(
        `${apiUrl}?title=${encodeURIComponent(
          article.title
        )}&publishedAt=${encodeURIComponent(
          article.publishAt
        )}&source=${article.source}`
      );

      if (isExist) {
        console.log("article is exist");
      } else {
        console.log("article is not exist");

        await axios.post(apiUrl, article);
        console.log(
          "so article added successfully to the database"
        );
      }
    }

    // console.log(article);
  }

  // await browser.close();
  console.log(
    "----------yahoo finance get news script is DONE----------"
  );
};
console.log(
  "----------yahoo finance get news script is running----------"
);
getYahooFinanceNews();
