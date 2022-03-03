import axios from "axios";
import {
  PYTHON_API,
  STOCK_ROUTE,
  TRADING_API,
} from "../../../utils/serverUtils";
import { useBackTest } from "../../Simulator/utils/useBackTest";
import { sleep } from "../../../utils/sleep";
import { secondCommandOptions } from "../hooks/useResponse";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { WaitForUserInputContext } from "../../../App";

export const useTradingCommendsHandler = (
  response,
  setSecondCommandFor,
  SpeechRecognition,
  handleOpenModal,
  isWaitingUserDone,
  setIsWaitingUserDone
) => {
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
            } = await axios(
              `${TRADING_API}/${STOCK_ROUTE}/buyStock?gameNum=5`
            );
            response(message);
          } catch (error) {
            response("something went wrong while buying Stocks");
          }
        } else {
          response("didn't find any buy signal");
        }
      } catch (error) {
        response(
          "something went wrong while looking for buying signals"
        );
      }
    } catch (error) {
      response(
        "something went wrong while saving S&P 500 stocks"
      );
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
          } = await axios(
            `${TRADING_API}/${STOCK_ROUTE}/sellStock?gameNum=5`
          );
          response(message);
        } catch (error) {
          response("something went wrong while selling stocks");
        }
      } else {
        response("didn't find any sell signals today");
      }
    } catch (error) {
      response(
        "something went wrong while checking for selling signals"
      );
    }
  };

  const stopLess = async () => {
    try {
      response("buying stop loss");
      const {
        data: { message },
      } = await axios(
        `${TRADING_API}/${STOCK_ROUTE}/addStopLess?gameNum=5`
      );
    } catch (error) {
      response("something went wrong while buying stop loss");
    }
  };

  const { getTestedData } = useBackTest();

  const { holdingStocks, isBTDone } = useSelector(
    (state) => state.back_testing
  );

  const [isResetBTData, setIsResetBTData] = useLocalStorage(
    "isResetBTData",
    false
  );

  // const [checkForBTIsDone, setCheckForBTIsDone] =
  //   useState(false);

  // let finansis response after resetting and starting back testing again
  // useEffect(() => {
  //   if (checkForBTIsDone && isBTDone) {
  //     response("back testing is done");
  //     setCheckForBTIsDone(false);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isBTDone]);

  // const data = useContext(WaitForUserInputContext);

  const getBTInput = () => {
    response("enter initial cash then click enter to submit");
    handleOpenModal("", "", true);
    // console.log("waiting");

    // console.log({ isWaitingUserDone });

    // while (true) {
    // if (isWaitingUserDone) {
    //   resolve();
    //   // break;
    // }
    // // }
    // console.log(data);

    // await handleWaitUserInput();
    // console.log("it's done waiting");
  };

  useEffect(() => {
    (async () => {
      console.log(
        "useEffect for starting finansis after reloading the page "
      );

      if (isResetBTData) {
        SpeechRecognition.startListening({ continuous: true });
        setIsResetBTData(false);
        // await sleep(50000);
        // setCheckForBTIsDone(true);
        // response("starting back testing");

        getBTInput();

        // await getTestedData();
        // response("back testing is done");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetBTData]);

  const startBackTesting = async () => {
    if (holdingStocks.length > 0 && isBTDone) {
      response("you already have tested data");
      await sleep(1000);
      response("do you want me to over write the old data");
      setSecondCommandFor(
        secondCommandOptions.rewritingTestedData
      );
    } else {
      getBTInput();
      // response("starting back testing");
      // await getTestedData();
      // response("back testing is done");
    }
  };

  useEffect(() => {
    if (isWaitingUserDone) {
      (async () => {
        response("starting back testing");
        await getTestedData();
        response("back testing is done");
        setIsWaitingUserDone(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaitingUserDone]);

  return { buyStocks, sellStocks, stopLess, startBackTesting };
};
