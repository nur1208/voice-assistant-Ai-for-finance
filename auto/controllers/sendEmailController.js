import puppeteer from "puppeteer";
import cheerio from "cheerio";

const SIGN_UP_S =
  "body > header > div > aside > div > nav > ul > li:nth-child(2) > a";
const USERNAME_INPUT_S =
  "#lightbox > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > input[type=email]:nth-child(1)";

const USERNAME_BTN_S =
  "#lightbox > div:nth-child(3) > div > div > div > div:nth-child(4) > div > div > div > div > input";

const PASSWORD_INPUT_S =
  "#lightbox > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > input";
const PASSWORD_BTN_S =
  "#lightbox > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(4) > div:nth-child(2) > div > div > div > div > input";
const YES_BTN_S =
  "#lightbox > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(9) > div:nth-child(2) > div > div > div:nth-child(2) > input";

const NEW_MESSAGE_BTN_S =
  "#app > div > div.zZJcFiYp1GsQ-Zkcz02eC > div.mXEfuMleN9V2Rx6d6qvsu > div._2aSECY2_aC8BM-pa12gLyl > div > div > div.tQjtZGBXoedSUDzkcRzw5.css-156 > div.XayzgKk2Ga7sG02AhkQKJ > div._2nxYvsT9VmpG24V7lwcfcu > div > div > button";

const MESSAGE_AREA_S = "#virtualEditScroller93 > div";
// const SUBJECT_INPUT_S = "#TextField242";
export const sendEmailHandler = async (req, res) => {
  //   const width = window.outerWidth - 20;
  //   const height = window.outerHeight - 20;
  const { to, html, subject } = req.body;

  if (!to || !html || !subject) {
    res.status(400).json({
      status: "fail",
      message: "'to', 'html' and 'subject' are required fields",
    });
    return;
  }

  const goToUrl = "https://outlook.live.com/owa/";
  const width = 1366 - 20;
  const height = 768 - 20;
  const timeout = 1000 * 90;
  //   const { goToUrl } = newsArticles[articleNum - 1];
  const browser = await puppeteer.launch({
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
    // userDataDir:
    //   "C:/Users/dell/AppData/Local/Google/Chrome/User Data",

    ignoreDefaultArgs: ["--enable-automation"],
  });

  const page = await browser.newPage();
  // 800x600
  await page.setViewport({
    width,
    height,
  });

  await page.goto(goToUrl, {
    timeout,
    waitUntil: "domcontentloaded",
  });

  const inputField = async (inputS, fieldValue, btnS) => {
    await page.waitForTimeout(1000 * 5);

    await page.waitForSelector(inputS, { timeout });

    await page.type(inputS, fieldValue, {
      delay: 100,
    });

    await page.waitForTimeout(1000 * 5);
    await Promise.all([
      page.waitForNavigation({ timeout }),
      page.click(btnS),
    ]);
  };

  await page.waitForSelector(SIGN_UP_S, { timeout });
  // await page.evaluate(
  //   (goToUrl) =>
  //     window.open(goToUrl, "ORIGIN_ARTICLE_WINDOW", "popup"),
  //   goToUrl
  // );
  // #dologin
  await Promise.all([
    page.waitForNavigation({ timeout }),
    page.click(SIGN_UP_S),
  ]);

  await inputField(
    USERNAME_INPUT_S,
    process.env.MAIL_USERNAME,
    USERNAME_BTN_S
  );
  await inputField(
    PASSWORD_INPUT_S,
    process.env.MAIL_PASSWORD,
    PASSWORD_BTN_S
  );

  await page.waitForTimeout(1000 * 5);
  await Promise.all([
    page.waitForNavigation({ timeout }),
    page.click(YES_BTN_S),
  ]);

  await page.waitForTimeout(1000 * 15);
  await page.waitForSelector(NEW_MESSAGE_BTN_S, { timeout });

  await Promise.all([
    // page.waitForNavigation({ timeout }),
    page.click(NEW_MESSAGE_BTN_S),
  ]);

  let tries = 0;
  // while (tries >= 3) {
  for (let index = 0; index < 3; index++) {
    try {
      await page.waitForTimeout(1000 * 30);
      // await page.waitForSelector(MESSAGE_AREA_S, { timeout });

      const inputs = await page.$$("input");

      await page.waitForTimeout(1000 * 5);

      await inputs[4].type(to, {
        delay: 100,
      });
      await page.waitForTimeout(1000 * 15);

      await inputs[4].press("Enter");

      await inputs[5].type(subject, {
        delay: 100,
      });
      break;
    } catch (error) {
      console.log(error);
      // tries += 1;
    }
  }
  // }

  await page.waitForTimeout(1000 * 5);
  // await page.waitForSelector(SUBJECT_INPUT_S, { timeout });

  await page.evaluate((html) => {
    const removeChilds = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    };

    const s =
      "#ReadingPaneContainerId > div > div > div > div._17WvdmDfhREFqBNvlLv75X > div.bAHScQgzLTvwiV2QXvzpa._2kZu_nrsBS0LQbV-DFQuPl > div > div > div";

    removeChilds(document.querySelector(s));

    document
      .querySelector(s)
      .insertAdjacentHTML("afterbegin", html);
  }, html);

  await page.waitForTimeout(1000 * 5);

  const sendBtn = (await page.$$("button"))[61];

  await sendBtn.click();

  // const message = `Forgot your password? Submit a PUT request with your new password and passwordConfirm to SOMEFJAL. if you didn't forget your password, please ignore this email`;
  await browser.close();
  res.json({
    status: "success",
    message: `message send successfully to ${to}`,
  });
};
