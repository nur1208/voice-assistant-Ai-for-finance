import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let browser;
let page;
app.use(express.json());
app.use(cors("http://localhost:3000"));
// app.use(morgan("dev"));

app.post("/open", async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { goToUrl } = req.body;
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
