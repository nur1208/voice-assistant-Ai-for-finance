import puppeteer from "puppeteer";
import cheerio from "cheerio";

const SIGN_UP_S =
  "body > header > div > aside > div > nav > ul > li:nth-child(2) > a";
const USERNAME_INPUT_S = "#username";

const PASSWORD_INPUT_S = "#password";
// const LOGIN_BTN_S =
//   "body > div.app-root > div.ui-prominent.bg-norm.color-norm.h100.flex-no-min-children.flex-nowrap.flex-column.h100.sign-layout-bg.scroll-if-needed > div > div > main > div.sign-layout-main-content > form > button";

const LOGIN_BTN_S =
  "body > div.app-root > div.flex-no-min-children.flex-nowrap.flex-column.h100.sign-layout-bg.scroll-if-needed.relative > div.sign-layout-container.flex-item-fluid-auto.flex.flex-nowrap.flex-column.flex-justify-space-between > div > main > div.sign-layout-main-content > form > button";
const NEW_MESSAGE_BTN_S =
  "body > div.app-root > div.content-container.flex.flex-column.flex-nowrap.no-scroll > div.content.ui-prominent.flex-item-fluid-auto.flex.flex-column.flex-nowrap.reset4print > div > div.sidebar.flex.flex-nowrap.flex-column.no-print.outline-none > div.pl1.pr1.pb1.flex-item-noshrink > button";

const MESSAGE_WRAPPER_S =
  "body > div.app-root > div.composer-container > div > div > div > div > div";

const INPUTS_S =
  "body > div.app-root > div.composer-container > div > div > div > div > div input";
const SEND_BTN_S =
  "body > div.app-root > div.composer-container > div > div > div > footer > div > div.button-group.button-group-solid-norm.button-group-medium > button";
// const SUBJECT_INPUT_S = "#TextField242";
export const sendEmailHandlerV2 = async (req, res) => {
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

  const goToUrl = "https://account.protonmail.com/login";
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

  await page.waitForTimeout(1000 * 30);

  await page.waitForSelector(USERNAME_INPUT_S, { timeout });

  await page.type(
    USERNAME_INPUT_S,
    process.env.MAIL_USERNAME_V2
  );

  await page.type(
    PASSWORD_INPUT_S,
    process.env.MAIL_PASSWORD_V2
  );

  await Promise.all([
    page.waitForNavigation({ timeout }),
    page.click(LOGIN_BTN_S),
  ]);

  await page.waitForTimeout(1000 * 15);

  await page.waitForSelector(NEW_MESSAGE_BTN_S);

  await page.click(NEW_MESSAGE_BTN_S);

  await page.waitForSelector(MESSAGE_WRAPPER_S);
  await page.waitForTimeout(1000 * 15);

  const inputs = await page.$$(INPUTS_S);

  await page.waitForTimeout(1000 * 5);

  await inputs[0].type(to);
  await page.waitForTimeout(1000 * 5);

  await inputs[1].type(subject);

  await page.waitForTimeout(1000 * 5);

  const frameHandle = await page.$(
    "iframe[title='Email composer']"
  );

  const frame = await frameHandle.contentFrame();

  await frame.evaluate((html) => {
    const MESSAGE_AREA_S = "#rooster-editor > div:nth-child(1)";
    document
      .querySelector(MESSAGE_AREA_S)
      .insertAdjacentHTML("afterbegin", html);
  }, html);

  await page.waitForTimeout(1000 * 5);
  await page.click(SEND_BTN_S);

  await page.waitForTimeout(1000 * 15);

  // const message = `Forgot your password? Submit a PUT request with your new password and passwordConfirm to SOMEFJAL. if you didn't forget your password, please ignore this email`;
  await browser.close();
  res.json({
    status: "success",
    message: `message send successfully to ${to}`,
  });
};
