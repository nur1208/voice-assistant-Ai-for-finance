import { ArrowDownIcon } from "./components/ArrowDownIcon";
import { ArrowUpIcon } from "./components/ArrowUpIcon";
import { HorizontalLineIcon } from "./components/HorizontalLineIcon";

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
  isTotalChange
) => {
  const perPrice = accountValue[accountValue.length - 2];
  const currentPrice = accountValue[accountValue.length - 1];

  const perPriceTotal = accountValue[0];
  // const currentPriceTotal = accountValue[accountValue.length - 1];

  const returnData =
    accountValue.length > 1
      ? isTotalChange
        ? calculateReturn(
            perPriceTotal.catch + perPriceTotal.stockValue,
            currentPrice.catch + currentPrice.stockValue
          )
        : calculateReturn(
            perPrice.catch + perPrice.stockValue,
            currentPrice.catch + currentPrice.stockValue
          )
      : { money: 0, percentage: 0 };

  return Number(returnData[type]).toFixed(2);
};

export const renderDay = (value) =>
  `${value <= 1 ? "day" : "days"}`;
