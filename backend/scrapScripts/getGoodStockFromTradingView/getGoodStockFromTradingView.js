import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { promisify } from "util";
import axios from "axios";
import {
  firstSymbolS,
  tableS,
  symbolS,
} from "./getGoodStockFromTradingViewS.js";

export const getGoodStocks = async () => {
  const mainPageHtml = "trailersContainer.html";
  const url = "https://www.tradingview.com/chart/kdswYql9/";

  const timeout = 1000 * 60 * 2;
  const width = 1366 - 20;
  const height = 768 - 20;

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    defaultViewport: { width, height },
    userDataDir: "C:/Users/nur/AppData/Local/Google/Chrome/User Data",
    args: [`--window-size=${width},${height}`, "--arc-start-mode=always-start"],
    ignoreDefaultArgs: ["--enable-automation"],
  });
  const page = await browser.newPage();
  await page.goto(`${url}`, { timeout });
  // #bottom-area > div.bottom-widgetbar-content.screener.tv-screener > div.tv-screener__content-pane.tv-screener__content-pane--fully-loaded > table > tbody > tr:nth-child(1) > td.tv-data-table__cell.apply-common-tooltip.tv-screener-table__cell.tv-screener-table__cell--left.tv-screener-table__cell--with-marker > div > div.tv-screener-table__symbol-container-description > div
  await page.waitForSelector(firstSymbolS);
  const html = await page.evaluate(() => document.body.innerHTML);

  const $ = cheerio.load(html);

  const stocksWrapper = $(symbolS, $(tableS).html()).toArray();
  console.log(stocksWrapper.length);

  const stocks = [];

  for (let index = 0; index < 31; index++) {
    const sWrapper = stocksWrapper[index];
    stocks.push($(sWrapper).text());
    // console.log($(sWrapper).text());
  }

  await browser.close();

  return stocks;
};

getGoodStocks();
