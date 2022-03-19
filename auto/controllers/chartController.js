import {
  applyDateS,
  endDateInputS,
  startDateInputS,
} from "../selectors/chartSelectors.js";
import {
  browser,
  page,
  windowTypeHolder,
} from "./commonController.js";

export const changeChartHandler = async (req, res) => {
  const { type } = req.body;
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
};

export const zoomHandler = async (req, res) => {
  const { type } = req.body;
  // if (browser && page && windowTypeHolder === "chart") {
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
  // }
  // res.status(404).json({ message: "browser is not open" });
};

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export const dateValidation = (req, res, next) => {
  const { startDate, endDate } = req.body;

  if (!isValidDate(new Date(startDate)))
    return res.status(400).json({
      message: "start date should exit and valid date",
      status: "fall",
    });

  if (!isValidDate(new Date(endDate)))
    return res.status(400).json({
      message: "end date should exit and valid date",
      status: "fall",
    });

  if (new Date(startDate) > new Date(endDate))
    return res.status(400).json({
      message: "start date should be less then endDate",
      status: "fall",
    });

  next();
};

const customDateFormat = (currentDate) => {
  // console.log({ currentDate, type: typeof currentDate });

  let date = currentDate;
  if (typeof date === "string") date = new Date(date);

  return `${
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1
  }/${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }/${date.getFullYear()}`;
};

const selectDeleteAllInputDate = async (selector, date) => {
  await page.click(selector);
  await page.keyboard.down("ControlLeft");
  await page.keyboard.press("KeyA");
  await page.keyboard.up("ControlLeft");
  await page.keyboard.press("Delete");

  await page.waitForTimeout(1000 * 1);

  await page.type(selector, date, {
    delay: 100,
  });
};

export const changeDateHandler = async (req, res) => {
  try {
    await page.waitForSelector(".datePickerBtn", {
      timeout: 1000 * 60,
    });
    await page.click(".datePickerBtn");
    await page.waitForTimeout(1000 * 3);

    const { startDate, endDate } = req.body;

    console.log({
      startDate: customDateFormat(startDate),
    });

    await selectDeleteAllInputDate(
      startDateInputS,
      customDateFormat(startDate)
    );

    await page.waitForTimeout(1000 * 1);

    await selectDeleteAllInputDate(
      endDateInputS,
      customDateFormat(endDate)
    );
    await page.waitForTimeout(1000 * 1);
    await page.click(applyDateS);

    res.json({ message: "working!", status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong while selecting dates",
      status: "fall",
    });
  }
};
