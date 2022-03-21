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
import { autoScroll, convertTimeSinceToDate } from "../utils.js";

export const getYahooFinanceNews = async () => {
  const mainPageHtml = "trailersContainer.html";
  const url = "https://finance.yahoo.com";

  const timeout = 1000 * 60 * 2;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${url}/news`, { timeout });

  // start loop
  while (true) {
    try {
      await page.waitForSelector(mainNewsWrapperV2, { timeout });

      await page.waitForTimeout(1000 * 60 * 1);

      await page.evaluate(() => window.scrollBy(0, -9999));

      await autoScroll(page);

      // await page.evaluate(() => window.scrollBy(0, 4991));

      await page.waitForTimeout(1000 * 60 * 1);

      const html = await page.evaluate(
        () => document.body.innerHTML
      );
      // fs.writeFile(mainPageHtml, html, function (err) {
      //   if (err) throw err;
      //   console.log("Saved!");
      // });

      // read the html body from the file system (this is very faster then reading it from the internet)
      // const html = await promisify(fs.readFile)(mainPageHtml);

      let $ = cheerio.load(html.toString());

      const lis = $(mainNewsWrapperV2).children().toArray();

      for (let index = 0; index < lis.length; index++) {
        const li = lis[index];

        const liHtml = $(li).html();

        const article = {};
        article.title = $(titleS, liHtml).text();
        article.goToUrl = `${url}${$(titleS, liHtml).attr(
          "href"
        )}`;
        article.source = "yahoo finance";
        // ads so skip them
        if ($(adDivS, liHtml).text()) continue;

        if ($(imageURLS, liHtml).attr("src")) {
          article.type = $(typeS, liHtml).text();
          article.publishedAt = convertTimeSinceToDate(
            $(publishAtS, liHtml).text()
          );
          article.publisher = $(sourceS, liHtml).text();
          article.imageUrl = $(imageURLS, liHtml).attr("src");
          article.description = $(descriptionS, liHtml).text();
        } else {
          article.type = $(typeV2S, liHtml).text();
          article.publishedAt = article.publishAt =
            convertTimeSinceToDate(
              $(publishAtSV2, liHtml).text()
            );

          article.publisher = $(sourceSV2, liHtml).text();
          article.description = $(descriptionSV2, liHtml).text();
        }
        const apiUrl = "http://localhost:4050/api/v1/news";
        const {
          data: { isExist },
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

      await page.waitForTimeout(1000 * 60 * 3);
      await page.reload({ timeout });
    } catch (error) {
      console.log(error);
      await page.waitForTimeout(1000 * 60 * 1);
      await page.reload({ timeout });
    }
    // loop ends
  }

  // await browser.close();
};
console.log(
  "----------yahoo finance get news script is running----------"
);
getYahooFinanceNews();
