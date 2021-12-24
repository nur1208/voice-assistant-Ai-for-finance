import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";
import {
  imageUrlS,
  mainWrapper,
  stockSymbolS,
  titleS,
  publishAtS,
  publishAtSV2,
} from "./getSeekingalphaNewsS.js";
import { addArticlesToDB, convertDayTimeToDate } from "../utils.js";

export const getSeekingalphaNews = async () => {
  const mainPageHtml = "trailersContainer.html";
  const timeout = 1000 * 60 * 2;

  const url = "https://seekingalpha.com";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${url}/market-news`, { timeout });

  while (true) {
    try {
      await page.waitForSelector(mainWrapper, { timeout });

      const html = await page.evaluate(
        () => document.body.innerHTML
      );

      //   fs.writeFile(mainPageHtml, html, function (err) {
      //     if (err) throw err;
      //     console.log("Saved!");
      //   });

      // read the html body from the file system (this is very faster then reading it from the internet)
      //   const html = await promisify(fs.readFile)(mainPageHtml);

      await page.waitForTimeout(1000 * 30);

      let $ = cheerio.load(html.toString());

      const articleElements = $(mainWrapper).children().toArray();

      for (let index = 0; index < articleElements.length; index++) {
        const articleElement = articleElements[index];

        const articleHtml = $(articleElement).html();

        const article = {};
        article.title = $(titleS, articleHtml).text();
        // something
        if (
          article.title === "On the hour" ||
          article.title.length > 1000
        )
          continue;

        article.goToUrl = `${url}${$(titleS, articleHtml).attr(
          "href"
        )}`;

        // if there is real image not the default one
        if (
          $(imageUrlS, articleHtml)
            .attr("src")
            .includes("static.seekingalpha")
        )
          article.imageUrl = $(imageUrlS, articleHtml).attr("src");

        if ($(stockSymbolS, articleHtml).text()) {
          article.stockSymbol = $(stockSymbolS, articleHtml).text();
          article.publishedAt = convertDayTimeToDate(
            $(publishAtS, articleHtml).text().split("%")[1]
          );
        } else {
          article.publishedAt = convertDayTimeToDate(
            $(publishAtSV2, articleHtml).text()
          );
        }
        article.source = "seeking alpha";

        await addArticlesToDB(article);
        // console.log(article);
      }
      await page.waitForTimeout(1000 * 60 * 5);
      await page.reload({ timeout });
    } catch (error) {
      console.log(error);
      await page.waitForTimeout(1000 * 60 * 1);
      await page.reload({ timeout });
    }
  }
  //   await browser.close();
};

getSeekingalphaNews();
