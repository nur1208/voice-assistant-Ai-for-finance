import tickers from "./tickerToName.json";

export const lookupForTickers = (input) => {
  const ticker = input.toUpperCase();
  return tickers.hasOwnProperty(ticker)
    ? tickers[ticker].name
    : null;
};

export const searchCompanyName = (input) => {
  const found = [];
  for (const key in tickers) {
    const ticker = tickers[key];
    if (ticker.name.toLowerCase().includes(input.toLowerCase())) {
      found.push({ symbol: key, ...ticker });
    }
  }
  return found;
};
