import axios from "axios";
import {
  PYTHON_API,
  STOCK_ROUTE,
  TRADING_API,
} from "../../../utils/serverUtils";
import {
  lastBTDate,
  useBackTest,
} from "../../Simulator/utils/useBackTest";
import { sleep } from "../../../utils/sleep";
import { secondCommandOptions } from "../hooks/useResponse";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { WaitForUserInputContext } from "../../../App";
import { useHandleUserInput } from "./useHandleUserInput";
import { MODAL_TYPE_OPTIONS } from "../../Modal/BasicModal/BasicModalUtils";
import { customDateFormat } from "../../Simulator/SimulatorUtils";

export const BTfields = {
  CASH: {
    label: { view: "Cash", stateName: "currentCash" },
    message: "enter initial cash",
  },
  START_DATE: {
    label: { view: "Start Date", stateName: "currentDate" },
    message: "enter start date",
  },
  ACCOUNT_RISK: {
    label: { view: "Account Risk", stateName: "accountRisk" },
    message: "enter percentage of account risk per trade",
  },
  EDN_DATE: {
    label: { view: "End Date", stateName: "endDate" },
    message: "enter end date",
  },
};

const gameNum = 2;
const strategyVersion = 4;
export const useTradingCommendsHandler = (
  response,
  setSecondCommandFor,
  SpeechRecognition,
  handleOpenModal,
  isWaitingUserDone,
  setIsWaitingUserDone,
  isForceSellAgain,
  setIsForceSellAgain,
  setFoundBuySignalStocks,
  setSoldStocks,
  handleCloseModal
) => {
  const {
    resetBTState,
    updateSecondCommand,
    updateProgress,
    updateModal,
    updateBTState,
    updateIsStartRecognize,
  } = useReduxActions();

  const findBuySignal = async () => {
    try {
      response("getting s&p 500 stocks");
      await axios(`${PYTHON_API}/saveSp500Tickers`);

      response("S and P 500 stocks saved successfully");
      try {
        response("Finding buy signals");
        const {
          data: { totalNumberOfBuying, foundBuySignalStocks },
        } = await axios(`${PYTHON_API}/findBuySignal`);
        // # print(f"found {totalNumberOfBuying} buying signals ✅")

        if (totalNumberOfBuying > 0) {
          response(
            `found ${totalNumberOfBuying} buying signals`
          );
        } else {
          response("didn't find any buy signal");
        }

        setFoundBuySignalStocks(foundBuySignalStocks);
        return { totalNumberOfBuying };
      } catch (error) {
        response(
          "something went wrong while looking for buying signals"
        );
        return { error };
      }
    } catch (error) {
      response(
        "something went wrong while saving S&P 500 stocks"
      );
      return { error };
    }
  };

  const buyStocks = async () => {
    updateProgress({ buy: "loading" });

    // const { totalNumberOfBuying, error } = await findBuySignal();
    const error = false;
    const totalNumberOfBuying = 8;
    // if findBuySignal through an error exit this function here
    if (error) {
      updateProgress({ buy: "fall" });
      return;
    }

    // the process is success but din't find any buy signal
    if (!totalNumberOfBuying) {
      updateProgress({ buy: "success" });
      return;
    }

    try {
      response(`found ${totalNumberOfBuying} buying signals`);
      response("buying stocks");
      const {
        data: { message },
      } = await axios(
        `${TRADING_API}/${STOCK_ROUTE}/buyStock?gameNum=${gameNum}`
      );
      response(message);
      updateProgress({ buy: "success" });
    } catch (error) {
      response("something went wrong while buying Stocks");
      updateProgress({ buy: "fall" });
    }
  };

  const handleTradingError = async (callback, type) => {
    await sleep(1000);
    response(`do you want me to try to ${type} again`);
    // await callback();

    setSecondCommandFor({
      type: secondCommandOptions.tryTradingAgain,
      other: { callback, TradingType: type },
    });

    updateSecondCommand({
      type: secondCommandOptions.tryTradingAgain,
      other: { callback, TradingType: type },
    });
  };

  const sellStocks = async () => {
    try {
      updateProgress({ sell: "loading" });
      response("checking for sell signals");
      const {
        data: { totalNumberOfSell, soldStocks },
      } = await axios(`${PYTHON_API}/findSellSignal`);

      if (totalNumberOfSell > 0) {
        setSoldStocks(soldStocks);
        // if (4 > 0) {
        try {
          response(`found ${totalNumberOfSell} sell signals`);
          response("selling stocks:");

          const {
            data: { message },
          } = await axios(
            `${TRADING_API}/${STOCK_ROUTE}/sellStock?gameNum=${gameNum}`
          );
          response(message);
          updateProgress({ sell: "success" });
        } catch (error) {
          response("something went wrong while selling stocks");
          updateProgress({ sell: "fall" });
          await handleTradingError(sellStocks, "sell");
        }
      } else {
        response("didn't find any sell signals today");
        updateProgress({ sell: "success" });
      }
    } catch (error) {
      response(
        "something went wrong while checking for selling signals"
      );
      updateProgress({ sell: "fall" });

      await handleTradingError(sellStocks, "sell");
    }
  };

  const stopLess = async () => {
    try {
      updateProgress({ setStopLoss: "loading" });

      response("buying stop loss");
      const {
        data: { message, status },
      } = await axios(
        `${TRADING_API}/${STOCK_ROUTE}/addStopLess?gameNum=${gameNum}&strategyVersion=${strategyVersion}`
      );

      if (status === "fall") {
        response("didn't found stocks to set stop loss to them");
      } else {
        response(message);
      }
      updateProgress({ setStopLoss: "success" });
    } catch (error) {
      response("something went wrong while buying stop loss");
      updateProgress({ setStopLoss: "fall" });
    }
  };

  const { getTestedData, forceSelling } = useBackTest();

  const { holdingStocks, isBTDone, currentDate, currentCash } =
    useSelector((state) => state.back_testing);

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

  // note make getBTInput dynamic

  const getBTInput = async (label, message) => {
    response(message);
    await sleep(1000);
    // debugger;

    // response("then click enter to submit");
    handleOpenModal("", "", true, label);
  };

  useEffect(() => {
    (async () => {
      console.log(
        "useEffect for starting finansis after reloading the page "
      );

      if (isResetBTData) {
        updateIsStartRecognize(true);
        SpeechRecognition.startListening({ continuous: true });
        setIsResetBTData(false);
        // await sleep(50000);
        // setCheckForBTIsDone(true);
        // response("starting back testing");

        await getBTInput(
          BTfields.CASH.label,
          BTfields.CASH.message
        );

        // await getTestedData();
        // response("back testing is done");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetBTData]);

  const startBackTesting = async () => {
    // if (holdingStocks.length > 0 && isBTDone) {
    if (isBTDone) {
      response("you already have tested data");
      await sleep(1000);
      response("do you want me to over write the old data");
      setSecondCommandFor(
        secondCommandOptions.rewritingTestedData
      );
    } else {
      // updateBTState({ isBTRunning: true });

      await getBTInput(
        BTfields.CASH.label,
        BTfields.CASH.message
      );
    }
  };

  const otherHandleInputParams = {
    isWaitingUserDone,
    setIsWaitingUserDone,
  };

  useHandleUserInput(
    BTfields.CASH.label.stateName,
    otherHandleInputParams,
    async () => {
      await getBTInput(
        BTfields.START_DATE.label,
        BTfields.START_DATE.message
      );
    }
  );

  useHandleUserInput(
    BTfields.START_DATE.label.stateName,
    otherHandleInputParams,
    async () => {
      await getBTInput(
        BTfields.ACCOUNT_RISK.label,
        BTfields.ACCOUNT_RISK.message
      );
    }
  );

  useHandleUserInput(
    BTfields.ACCOUNT_RISK.label.stateName,
    otherHandleInputParams,
    async () => {
      await getBTInput(
        BTfields.EDN_DATE.label,
        BTfields.EDN_DATE.message
      );
    }
  );

  const [isForForceSell, setIsForForceSell] = useState(false);

  useHandleUserInput(
    BTfields.EDN_DATE.label.stateName,
    otherHandleInputParams,
    async () => {
      response("starting back testing");
      const date = customDateFormat(currentDate);

      await sleep(1000 * 1);
      await getTestedData();
      response("back testing is done");
      console.log("here in last useHandleUser");
      await sleep(1000);
      setIsForForceSell(true);
    }
  );

  useEffect(() => {
    if (isForForceSell) {
      console.log(holdingStocks.length);
      console.log("in useEffect check for force sell");
      if (holdingStocks.length > 0) {
        response("do you want me to force sell");
        setSecondCommandFor(secondCommandOptions.forceSelling);
      }

      setIsForForceSell(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForForceSell]);

  const forceSellingHandler = async () => {
    console.log({
      finalDate: new Date("2022-2-1"),
      currentDate,
      stopBackTestingC: currentDate > new Date("2022-2-1"),
    });

    if (currentDate > new Date(lastBTDate)) {
      response(
        "sorry I don't have more data to test, right now"
      );
      return;
    }

    if (holdingStocks.length > 0) {
      response("starting force selling");
      await forceSelling();
      response("force selling is done");
      setIsForceSellAgain(true);
    } else {
      response("you don't have any stocks to sell");
    }
  };

  useEffect(() => {
    if (isForceSellAgain) {
      (async () => {
        if (holdingStocks.length > 0) {
          response("you still have stocks that haven't sold ");
          await sleep(1000);

          response(
            "if you want me to force sell again, tell me force sell again"
          );
        }
        setIsForceSellAgain(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForceSellAgain]);

  const resetBTDataHandler = async () => {
    response("resetting back testing data ");
    await sleep(1000);

    resetBTState();

    window.location.reload();
  };

  const sellWithProfitOrNot = async () => {
    response("starting selling stocks with profit or without");
    await forceSelling(true);
    response("selling stocks with profit or without is done");
  };

  const tradeStocks = async () => {
    response("starting stocks trading");
    await stopLess();
    await sellStocks();
    await buyStocks();
  };

  const openProgressModal = async () => {
    response("here is your trading progress");
    handleOpenModal("Trading Progress");
    updateModal({ type: MODAL_TYPE_OPTIONS.PROGRESS });

    await sleep(1000 * 10);
    handleCloseModal();
  };

  return {
    buyStocks,
    sellStocks,
    stopLess,
    startBackTesting,
    forceSellingHandler,
    resetBTDataHandler,
    sellWithProfitOrNot,
    tradeStocks,
    findBuySignal,
    openProgressModal,
  };
};
