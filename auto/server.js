import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import cheerio from "cheerio";
import axios from "axios";
const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let browser;
let page;
let windowTypeHolder;

app.use(express.json());
app.use(cors("http://localhost:3000"));
// app.use(morgan("dev"));

app.post("/findingAnswers", async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { question } = req.body;
  //   console.log(req.body);
  const width = 1366 - 20;
  const height = 768 - 20;
  const timeout = 1000 * 90;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  //   console.log({ goToUrl });
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
    console.log(questionObject);

    console.log(error.message + "❌");
  }

  await browserLocal.close();
  res.json({
    message: "findingAnswers working",
    questionObject,
  });
});

app.post("/findingCompanies", async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { keyword } = req.body;
  //   console.log(req.body);
  const width = 1366 - 20;
  const height = 768 - 20;
  const timeout = 1000 * 90;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  //   console.log({ goToUrl });
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

      // console.log($("div:nth-child(2)", $(li).html()).text());
      if ($("div:nth-child(2)", $(li).html()).text().trim()) {
        if (
          $(
            "div:nth-child(1) > div:nth-child(1)",
            $(li).html()
          ).text() === "PRIVATE"
        )
          continue;

        // console.log("found ✅");

        const company = {};
        company.symbol = $(
          "div:nth-child(1) > div:nth-child(1)",
          $(li).html()
        ).text();

        company.name = $(
          "div:nth-child(1) > div:nth-child(2)",
          $(li).html()
        ).text();
        companies.push(company);
        try {
          const { data } = await axios.post(
            "http://localhost:4050/api/v1/companies",
            company
          );
        } catch (error) {
          console.log(company);

          console.log(error.message + "❌");
        }

        // console.log(data);
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
});

app.post("/open", async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { goToUrl, windowType } = req.body;
  if (windowType) {
    windowTypeHolder = windowType;
  }
  //   console.log(req.body);
  const width = 1366 - 20;
  const height = 768 - 20;
  const timeout = 1000 * 90;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  //   console.log({ goToUrl });
  browser = await puppeteer.launch({
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
});

app.post("/close", async (req, res) => {
  if (browser) {
    await browser.close();
    browser = null;
    windowTypeHolder = null;
    page = null;
  }
  res.json({ message: "close working", isAutoBrowserOpen: false });
});

app.post("/scroll", async (req, res) => {
  const { source } = req.body;
  if (browser && page) {
    const isEndOfPage = await page.evaluate((source) => {
      // if (
      //   document.scrollingElement.scrollTop + window.innerHeight <
      //   document.scrollingElement.scrollHeight
      // )

      // yahoo finance full article page scrolling limit
      if (source === "yahoo finance") {
        if (
          document.scrollingElement.scrollTop <
          document.querySelector(".caas-body").scrollHeight +
            window.innerHeight
        ) {
          window.scrollBy(0, 100);
          return false;
        }
        // investing full article page scrolling limit
      } else if (source === "investing") {
        if (
          document.scrollingElement.scrollTop <
          document.querySelector(".articlePage").scrollHeight
        ) {
          window.scrollBy(0, 100);
          return false;
        }
      }

      return true;
    }, source);
    res.json({ message: "scroll working", isEndOfPage });
    return;
  }
  res.status(404).json({ message: "browser is not open" });
});

app.post("/zoom", async (req, res) => {
  const { type } = req.body;
  if (browser && page && windowTypeHolder === "chart") {
    let isZoomed = false;
    if (type === "out") {
      await page.click("span.stx-zoom-out");
      isZoomed = true;
    } else if (type === "in") {
      await page.click("span.stx-zoom-in");
      isZoomed = true;
    }

    res.json({ message: "zoom working", isZoomed });
    return;
  }
  res.status(404).json({ message: "browser is not open" });
});

app.post("/changeChart", async (req, res) => {
  const { type } = req.body;
  if (browser && page && windowTypeHolder === "chart") {
    const validOptions = [
      "1 minute",
      "2 minutes",
      "5 minutes",
      "15 minutes",
      "30 minutes",
      "1 hour",
      "4 hours",
      "1 day",
      "1 week",
      "1 month",
      "1 year",
    ];

    // #chart-toolbar > div:nth-child(1) > div:nth-child(7)
    let isChanged = false;
    if (validOptions.includes(type)) {
      await page.click(
        "#chart-toolbar > div:nth-child(1) > div:nth-child(7)"
      );

      await page.waitForTimeout(1000 * 1);
      await page.click(
        `#presetList > li:nth-child(${
          validOptions.indexOf(type) + 1
        }) > button`
      );
      isChanged = true;
      res.json({ message: "changeChart working", isChanged });
      return;
    } else {
      res.status(400).json({ message: "invalid option" });
    }

    // li:nth-child(1)
  }
  res.status(404).json({ message: "browser is not open" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
