import { ArrowDownIcon } from "./components/ArrowDownIcon";
import { ArrowUpIcon } from "./components/ArrowUpIcon";
import { HorizontalLineIcon } from "./components/HorizontalLineIcon";

export const customDateFormat = (currentDate) => {
  // console.log({ currentDate, type: typeof currentDate });

  return `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1
  }-${
    currentDate.getDate() < 10
      ? `0${currentDate.getDate()}`
      : currentDate.getDate()
  }`;
};

export const calculateReturn = (initPrice, endPrice) => {
  const money = Number(endPrice - initPrice).toFixed(2);
  const percentage = Number(
    (endPrice - initPrice) / (initPrice / 100)
  ).toFixed(2);

  return { money, percentage };
};

export const iconSizeOptions = (size) =>
  size === "small"
    ? { fontSize: "16px", height: "16px", width: "16px" }
    : size === "medium"
    ? {
        fontSize: "18px",
        height: "18px",
        width: "18px",
      }
    : {
        fontSize: "36px",
        height: "36px",
        width: "36px",
      };

export const renderPriceChangeStyle = (percentage) =>
  `${
    percentage > 0
      ? "success--text"
      : percentage < 0
      ? "error--text"
      : ""
  }`;

export const renderPriceChangeIcon = (percentage, size) =>
  percentage > 0 ? (
    <ArrowUpIcon size={size} />
  ) : percentage < 0 ? (
    <ArrowDownIcon size={size} />
  ) : (
    <HorizontalLineIcon size={size} />
  );

export const renderPriceChangeReturn = (
  type,
  accountValue,
  isTotalChange,
  isSp500
) => {
  const perPrice = accountValue[accountValue.length - 2];
  const currentPrice = accountValue[accountValue.length - 1];

  const perPriceTotal = accountValue[0];
  // const currentPriceTotal = accountValue[accountValue.length - 1];

  // console.log({
  //   isSp500,
  //   perPrice,
  //   currentPrice,
  //   calculateReturn: calculateReturn(perPrice, currentPrice),
  // });

  const returnData =
    accountValue.length > 1
      ? isTotalChange
        ? calculateReturn(
            perPriceTotal.catch + perPriceTotal.stockValue,
            currentPrice.catch + currentPrice.stockValue
          )
        : isSp500
        ? calculateReturn(perPrice.close, currentPrice.close)
        : calculateReturn(
            perPrice.catch + perPrice.stockValue,
            currentPrice.catch + currentPrice.stockValue
          )
      : { money: 0, percentage: 0 };

  // console.log({ returnData });

  return Number(returnData[type]).toFixed(2);
};

export const renderDay = (value) =>
  `${value <= 1 ? "day" : "days"}`;
