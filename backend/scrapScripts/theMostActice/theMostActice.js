import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";

export const theMostActive = async () => {
  const mainPageHtml = "trailersContainer.html";
  const timeout = 1000 * 60;

  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage();
  await page.goto("https://finance.yahoo.com/gainers", {
    timeout,
  });
  await page.waitForSelector("#fin-scr-res-table", { timeout });

  const html = await page.evaluate(
    () => document.querySelector("#fin-scr-res-table").innerHTML
  );

  fs.writeFile(mainPageHtml, html, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });

  // read the html body from the file system (this is very faster then reading it from the internet)
  //   const html = await promisify(fs.readFile)(mainPageHtml);

  let $ = cheerio.load(html.toString());

  await browser.close();
};
theMostActive();
