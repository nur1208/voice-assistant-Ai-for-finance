import axios from "axios";
import {
  PYTHON_API,
  STOCK_ROUTE,
  TRADING_API,
} from "../../../utils/serverUtils";
export const useTradingCommendsHandler = (response) => {
  const buyStocks = async () => {
    try {
      response("getting s&p 500 stocks");
      await axios(`${PYTHON_API}/saveSp500Tickers`);

      response("S and P 500 stocks saved successfully");

      try {
        response("Finding buy signals");
        // const {
        //   data: { totalNumberOfBuying },
        // } = await axios(`${PYTHON_API}/findBuySignal`);
        // # print(f"found {totalNumberOfBuying} buying signals ✅")

        // if (totalNumberOfBuying > 0) {
        if (5 > 0) {
          try {
            // response(`found ${totalNumberOfBuying} buying signals`);
            response("buying stocks");
            const {
              data: { message },
            } = await axios(`${TRADING_API}/${STOCK_ROUTE}/buyStock?gameNum=5`);
            response(message);
          } catch (error) {
            response("something went wrong while buying Stocks");
          }
        } else {
          response("didn't find any buy signal");
        }
      } catch (error) {
        response("something went wrong while looking for buying signals");
      }
    } catch (error) {
      response("something went wrong while saving S&P 500 stocks");
    }
  };

  const sellStocks = async () => {
    try {
      response("checking for sell signals");
      const {
        data: { totalNumberOfSell },
      } = await axios(`${PYTHON_API}/findSellSignal`);

      if (totalNumberOfSell > 0) {
        // if (4 > 0) {
        try {
          response(`found ${totalNumberOfSell} sell signals`);
          response("selling stocks:");

          const {
            data: { message },
          } = await axios(`${TRADING_API}/${STOCK_ROUTE}/sellStock?gameNum=5`);
          response(message);
        } catch (error) {
          response("something went wrong while selling stocks");
        }
      } else {
        response("didn't find any sell signals today");
      }
    } catch (error) {
      response("something went wrong while checking for selling signals");
    }
  };

  const stopLess = async () => {
    try {
      response("buying stop loss");
      const {
        data: { message },
      } = await axios(`${TRADING_API}/${STOCK_ROUTE}/addStopLess?gameNum=5`);
    } catch (error) {
      response("something went wrong while buying stop loss");
    }
  };
  return { buyStocks, sellStocks, stopLess };
};
