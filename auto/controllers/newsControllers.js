// import { browser, page } from "../server.js";

import { browser, page } from "./commonController.js";

export const scrollHandler = async (req, res) => {
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
};
