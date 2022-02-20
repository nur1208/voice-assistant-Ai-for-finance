export const calculateReturn = (initPrice, endPrice) => {
  const money = Number(endPrice - initPrice).toFixed(2);
  const percentage = Number(
    (endPrice - initPrice) / (initPrice / 100)
  ).toFixed(2);

  return { money, percentage };
};

export const renderPriceChangeReturn = (
  type,
  accountValue,
  isTotalChange
) => {
  const perPrice = accountValue[accountValue.length - 2];
  const currentPrice = accountValue[accountValue.length - 1];

  const perPriceTotal = accountValue[0];
  // const currentPriceTotal = accountValue[accountValue.length - 1];
  console.log({
    accountLength: accountValue.length,
    accountValue,
  });
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

  return <spam>{Number(returnData[type]).toFixed(2)}</spam>;
};
