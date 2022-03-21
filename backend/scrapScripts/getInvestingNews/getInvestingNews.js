import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";
import axios from "axios";
import {
  mainWrapper,
  goToUrlS,
  titleS,
  imageUrlS,
  descriptionS,
  lastImageS,
  publishAtS,
  publisherS,
} from "./getInvestingNewsS.js";
import {
  convertTimeSinceToDate,
  autoScroll,
  addArticlesToDB,
} from "../utils.js";

export const getInvestingNews = async () => {
  const mainPageHtml = "trailersContainer.html";
  const url = "https://www.investing.com";

  const timeout = 1000 * 60 * 2;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${url}/news/latest-news`, { timeout });

  while (true) {
    try {
      await page.waitForSelector(mainWrapper, { timeout });

      await page.waitForTimeout(1000 * 30);

      // await page.evaluate(() => window.scrollBy(0, 2200));

      // await page.waitForTimeout(1000 * 1);

      /// make sure the scroll is at the top of the page
      await page.evaluate(() => window.scrollBy(0, -9999));

      await autoScroll(page, {
        scrollHeight: 2300,
        delay: 1000 * 5,
      });

      await page.waitForSelector(lastImageS, { timeout });

      //   await page.waitForTimeout(1000 * 60 * 1);

      const html = await page.evaluate(
        () => document.body.innerHTML
      );

      let $ = cheerio.load(html.toString());

      const articles = $(mainWrapper).children().toArray();

      for (let index = 0; index < articles.length; index++) {
        const articleElement = articles[index];

        const articleHtml = $(articleElement).html();

        const article = {};

        if ($(goToUrlS, articleHtml).attr("href")) {
          article.title = $(titleS, articleHtml).text();
          article.goToUrl = `${url}${$(titleS, articleHtml).attr(
            "href"
          )}`;
          article.source = "investing";

          article.imageUrl = $(imageUrlS, articleHtml).attr(
            "src"
          );

          article.description = $(
            descriptionS,
            articleHtml
          ).text();

          article.publishedAt = convertTimeSinceToDate(
            $(publishAtS, articleHtml)
              .text()
              .split("-")[1]
              .trim()
          );

          article.publisher = $(publisherS, articleHtml).text();

          await addArticlesToDB(article);
        }
      }

      await page.waitForTimeout(1000 * 60 * 5);
      await page.reload({ timeout });
    } catch (error) {
      console.log(error);
      await page.waitForTimeout(1000 * 60 * 1);
      await page.reload({ timeout });
    }
  }
};

getInvestingNews();
