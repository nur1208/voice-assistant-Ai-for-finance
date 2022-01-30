import axios from "axios";
import { PYTHON_API, TRADING_API } from "../../../utils/serverUtils";
export const useTradingCommendsHandler = (response) => {
  const buyStocks = async () => {
    try {
      response("first getting s&p 500 stocks");
      await axios(`${PYTHON_API}/saveSp500Tickers/`);

      response("S and P 500 stocks saved successfully");

      try {
        response("Finding buy signals");
        const {
          data: { totalNumberOfBuying },
        } = await axios(`${PYTHON_API}/findBuySignal/`);
        // # print(f"found {totalNumberOfBuying} buying signals ✅")

        if (totalNumberOfBuying > 0) {
          try {
            response(`found ${totalNumberOfBuying} buying signals`);
            response("buying stocks");
            const {
              data: { message },
            } = await axios(`${TRADING_API}/buyStock/`);
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
  return { buyStocks };
};
