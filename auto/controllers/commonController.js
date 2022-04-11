// import { browser, page } from "../server.js";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import axios from "axios";

export let browser;
export let page;
export let windowTypeHolder;

export const findingCompaniesHandler = async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { keyword } = req.body;
  const width = 1366 - 20;
  const height = 768 - 20;
  const timeout = 1000 * 60 * 3;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  const browserLocal = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    defaultViewport: { width, height },
    args: [
      `--window-size=${width},${height}`,
      // "--disable-infobars",
      // "--start-fullscreen",
      //   "'--no-sandbox'",
      // "-app-cache-force-enabled",
      "--arc-start-mode=always-start",
    ],
    // dumpio: true,
    // pipe: true,
    ignoreDefaultArgs: ["--enable-automation"],
  });

  page = await browserLocal.newPage();
  // 800x600
  await page.setViewport({
    width,
    height,
  });

  await page.goto("https://finance.yahoo.com/", {
    timeout,
    // waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1000 * 30);

  await page.type("#yfin-usr-qry", keyword, { delay: 500 });

  await page.waitForTimeout(1000 * 30);
  const ul = await page.evaluate(
    () => document.querySelectorAll("ul")[1].outerHTML
  );

  const companies = [];
  if (ul.includes('role="listbox"')) {
    console.log("yes ✅");
    const $ = cheerio.load(ul);
    const lis = $("li").toArray();
    for (let index = 0; index < lis.length; index++) {
      const li = lis[index];

      if ($("div:nth-child(2)", $(li).html()).text().trim()) {
        if (
          $(
            "div:nth-child(1) > div:nth-child(1)",
            $(li).html()
          ).text() === "PRIVATE"
        )
          continue;

        const company = {};
        company.symbol = $(
          "div:nth-child(1) > div:nth-child(1)",
          $(li).html()
        ).text();

        company.name = $(
          "div:nth-child(1) > div:nth-child(2)",
          $(li).html()
        ).text();
        try {
          const { data } = await axios.post(
            "http://localhost:4050/api/v1/companies",
            company
          );
          companies.push(data.doc);
        } catch (error) {
          console.log(error.message + "❌");
        }
      } else
        console.log($("div:nth-child(1)", $(li).html()).text());
    }
  } else {
    console.log("no ❌");
  }

  // await page.waitForTimeout(1000 * 60 * 5);
  // await page.evaluate(
  //   (goToUrl) =>
  //     window.open(goToUrl, "ORIGIN_ARTICLE_WINDOW", "popup"),
  //   goToUrl
  // );

  await browserLocal.close();
  res.json({
    message: "findingCompanies working",
    companies,
  });
};
export const findingAnswersHandler = async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { question } = req.body;
  const width = 1366 - 20;
  const height = 768 - 20;
  const timeout = 1000 * 90;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  const browserLocal = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
    defaultViewport: { width, height },
    args: [
      `--window-size=${width},${height}`,
      // "--disable-infobars",
      // "--start-fullscreen",
      //   "'--no-sandbox'",
      // "-app-cache-force-enabled",
      "--arc-start-mode=always-start",
    ],
    // dumpio: true,
    // pipe: true,
    ignoreDefaultArgs: ["--enable-automation"],
  });

  page = await browserLocal.newPage();
  // 800x600
  await page.setViewport({
    width,
    height,
  });

  await page.goto("https://duckduckgo.com/", {
    timeout,
    // waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1000 * 5);

  await page.type(
    "#search_form_input_homepage",
    `${question} investopedia`,
    {
      delay: 200,
    }
  );

  await Promise.all([
    page.waitForNavigation({ timeout }),
    page.click("#search_button_homepage"),
  ]);
  await page.waitForTimeout(1000 * 10);

  await Promise.all([
    page.waitForNavigation({ timeout }),
    page.click("#r1-0 a"),
  ]);

  await page.waitForTimeout(1000 * 10);

  if (!(await page.url()).includes("investopedia.com")) {
    await browserLocal.close();

    return res.status(404).json({
      status: "fail",
      message: "didn't find answer for your question",
    });
  }

  const ul = await page.evaluate(
    () =>
      document.querySelector("#mntl-sc-block-callout-body_1-0")
        .innerHTML
  );
  // nth-child(2)

  const $ = cheerio.load(ul);

  const questionObject = {};

  questionObject.question = question;
  questionObject.answer = $("ul > li:nth-child(1)").text();
  questionObject.source = "investopedia";
  questionObject.referenceUrl = page.url();

  try {
    const { data } = await axios.post(
      "http://localhost:4050/api/v1/questions",
      questionObject
    );
  } catch (error) {
    console.log(error.message + "❌");
  }

  await browserLocal.close();
  res.json({
    message: "findingAnswers working",
    questionObject,
  });
};

export const openHandler = async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const {
    goToUrl,
    windowType,
    windowWidth,
    windowHeight,
    executablePath,
  } = req.body;
  if (windowType) {
    windowTypeHolder = windowType;
  }
  const width = windowWidth;
  const height = windowHeight;
  const timeout = 1000 * 90;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  browser = await puppeteer.launch({
    headless: false,
    executablePath,
    defaultViewport: { width, height },
    args: [
      `--window-size=${width},${height}`,
      // "--disable-infobars",
      // "--start-fullscreen",
      //   "'--no-sandbox'",
      // "-app-cache-force-enabled",
      "--arc-start-mode=always-start",
    ],
    // dumpio: true,
    // pipe: true,
    ignoreDefaultArgs: ["--enable-automation"],
  });

  page = await browser.newPage();
  // 800x600
  await page.setViewport({
    width,
    height,
  });

  await page.goto(goToUrl, {
    timeout,
    waitUntil: "domcontentloaded",
  });

  // await page.evaluate(
  //   (goToUrl) =>
  //     window.open(goToUrl, "ORIGIN_ARTICLE_WINDOW", "popup"),
  //   goToUrl
  // );

  res.json({ message: "open working", isAutoBrowserOpen: true });
};

export const closeHandler = async (req, res) => {
  if (browser) {
    await browser.close();
    browser = null;
    windowTypeHolder = null;
    page = null;
  }
  res.json({
    message: "close working",
    isAutoBrowserOpen: false,
  });
};

export const checkForBrowser = (type) => (req, res, next) => {
  if (browser && page && windowTypeHolder === type) {
    return next();
  }
  res.status(404).json({ message: "browser is not open" });
};
