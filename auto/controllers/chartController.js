import {
  browser,
  page,
  windowTypeHolder,
} from "./commonController.js";

export const changeChartHandler = async (req, res) => {
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
};

export const zoomHandler = async (req, res) => {
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
};
