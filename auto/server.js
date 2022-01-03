import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let browser;

app.use(express.json());
app.use(cors("http://localhost:3000"));

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
      // "--auto-select-desktop-capture-source='Entire screen'",
      //   "'--no-sandbox'",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  const page = await browser.newPage();
  // 800x600
  await page.setViewport({
    width,
    height,
  });

  await page.goto(goToUrl, { timeout });

  res.json({ message: "open working", isAutoBrowserOpen: true });
});

app.post("/close", async (req, res) => {
  if (browser) {
    browser.close();
    browser = null;
  }
  res.json({ message: "close working", isAutoBrowserOpen: false });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
