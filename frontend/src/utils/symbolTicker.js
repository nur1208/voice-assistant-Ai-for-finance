// import tickers from "./tickerToName.json";
import axios from "axios";
import { BACKEND_API_URL, COMPANIES_ROUTE } from "./serverUtils";
import tickers from "./tickerToNameV2.json";
// tickerToNameV2.json
export const lookupForTickers = (input) => {
  const ticker = input.toUpperCase();
  return tickers.hasOwnProperty(ticker)
    ? tickers[ticker].name
    : null;
};

const apiUrl = `${BACKEND_API_URL}/${COMPANIES_ROUTE}`;
export const lookupForTickersV2 = async (symbol) => {
  try {
    const {
      data: { doc },
    } = await axios.get(`${apiUrl}?symbol=${symbol}`);
    // console.log("🧐🧐");
    // console.log({ doc });
    return doc.length > 0 ? doc[0].name : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
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

export const searchCompanyNameV2 = async (name) => {
  try {
    const {
      data: { doc },
    } = await axios.get(`${apiUrl}?name=${name}`);
    console.log("🧐🧐");
    console.log({ doc });
    return doc.length > 0 ? doc : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
