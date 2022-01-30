import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";
import { mainNewsWrapperV2 } from "./getYahooFinanceNewsSelector.js";

export const getYahooFinanceNews = async () => {
  const mainPageHtml = "trailersContainer.html";
  const url = "https://finance.yahoo.com";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${url}/news`);
  await page.waitForSelector(mainNewsWrapperV2);

  const html = await page.evaluate(() => document.body.innerHTML);

  fs.writeFile(mainPageHtml, html, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });

  // read the html body from the file system (this is very faster then reading it from the internet)
  //   const html = await promisify(fs.readFile)(mainPageHtml);

  let $ = cheerio.load(html.toString());
  console.log($);

  await browser.close();
  console.log(
    "----------yahoo finance get news script is DONE----------"
  );
};
console.log(
  "----------yahoo finance get news script is running----------"
);
getYahooFinanceNews();
