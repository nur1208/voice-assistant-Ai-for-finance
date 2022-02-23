import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { PYTHON_API } from "../../../utils/serverUtils";
import { sleep } from "../../../utils/sleep";
import { customDateFormat } from "../SimulatorUtils";
import {
  statesDefault,
  useSaveTestedData,
} from "./useSaveTestedData";

export const useBackTest = () => {
  const [localStorageData, { updateLocalStorage }] =
    useSaveTestedData();
  const [holdingStocks, setHoldingStocks] = useState(
    localStorageData.holdingStocks
  );
  const [soldStocks, setSoldStocks] = useState(
    localStorageData.soldStocks
  );
  const [currentDate, setCurrentDate] = useState(
    new Date(localStorageData.currentDate)
  );
  const [currentCash, setCurrentCash] = useState(
    localStorageData.currentCash
  );
  const [currentStockPrice, setCurrentStockPrice] = useState(
    localStorageData.currentStockPrice
  );
  const [wins, setWins] = useState(localStorageData.wins);
  const [loess, setLoess] = useState(localStorageData.loess);
  const [accountValue, setAccountValue] = useState(
    localStorageData.accountValue
  );

  const [countDays, setCountDays] = useState(
    localStorageData.countDays
  );
  const [endDate, setEndDate] = useState(
    new Date(localStorageData.endDate)
  );

  const resetAllStates = () => {
    setHoldingStocks(statesDefault.holdingStocks);
    setSoldStocks(statesDefault.soldStocks);
    setCurrentDate(statesDefault.currentDate);
    setCurrentStockPrice(statesDefault.currentStockPrice);
    setCurrentCash(statesDefault.currentCash);
    setWins(statesDefault.wins);
    setLoess(statesDefault.loess);
    setAccountValue(statesDefault.accountValue);
    setCountDays(statesDefault.countDays);
    setEndDate(statesDefault.endDate);
  };

  // 702316;
  let holdStocksLocal = holdingStocks;
  let currentCashLocal = currentCash;
  let currentStockPriceLocal = currentStockPrice;
  // let countDays = 0;

  const handleBackTestingAxiosError = async (
    callFunction,
    paramsFunction,
    messageError,
    paramsFunction2
  ) => {
    let isFoundError = true;
    while (isFoundError) {
      try {
        await callFunction(paramsFunction, paramsFunction2);
        isFoundError = false;
      } catch (error) {
        console.log(error);

        console.log(messageError);

        await sleep(1000 * 10);
      }
    }
  };

  const updateCurrentPrice = async (date) => {
    // get the current price fot hold stocks

    const {
      data: { stocks: updatePriceStocks, todayChange },
    } = await axios.post(
      `${PYTHON_API}/getCurrentStockPrice?date=${date}`,
      {
        boughtStocks: holdStocksLocal,
      },
      {
        onDownloadProgress(progress) {
          console.log("download progress:", progress);
        },
      }
    );

    setHoldingStocks(updatePriceStocks);
    holdStocksLocal = updatePriceStocks;
    setCurrentStockPrice((lastPrice) => lastPrice + todayChange);
    currentStockPriceLocal =
      currentStockPriceLocal + todayChange;
  };

  const sell = async (date, isJustSell) => {
    const {
      data: {
        stocks: SoldStocksP,
        portfolio: portfolioAfterSell,
        totalReturnMoney,
      },
    } = await axios.post(
      `${PYTHON_API}/findSellSignalBT?date=${date}`,
      {
        boughtStocks: holdStocksLocal,
        portfolio: currentCashLocal,
        isJustSell,
      },
      {
        onDownloadProgress(progress) {
          console.log("download progress:", progress);
        },
      }
    );
    if (SoldStocksP.length > 0) {
      setSoldStocks((oldData) => [...oldData, ...SoldStocksP]);
      for (let index = 0; index < SoldStocksP.length; index++) {
        const sStock = SoldStocksP[index];
        const filteredArray = holdStocksLocal.filter(
          ({ symbol }) => symbol !== sStock.symbol
        );

        if (sStock.isReachedStopLoss) {
          setLoess((oldValue) => oldValue + 1);
        } else {
          setWins((oldValue) => oldValue + 1);
        }

        holdStocksLocal = filteredArray;
        setHoldingStocks((oldStocks) => filteredArray);
      }

      currentCashLocal = portfolioAfterSell;
      setCurrentCash(portfolioAfterSell);

      // currentStockPriceLocal = totalReturnMoney * -1;
      setCurrentStockPrice(
        (lastPrice) => lastPrice - totalReturnMoney
      );
      currentStockPriceLocal =
        currentStockPriceLocal - totalReturnMoney;
    }
  };

  let currentDateLocal = currentDate;

  const forceSelling = async () => {
    let endDateLocal = new Date(endDate);
    console.log({ endDateLocal, type: typeof endDateLocal });

    endDateLocal = new Date(
      endDateLocal.setDate(endDateLocal.getDate() + 5)
    );
    setEndDate(endDateLocal);
    runForceSelling(endDateLocal);
  };

  const runForceSelling = async (endDateLocal) => {
    await backTestMain(endDateLocal, runForceSelling, true);
  };

  const buy = async (date) => {
    const {
      data: { stocks, portfolio: portfolioAfterBuy, totalCost },
    } = await axios.post(
      `${PYTHON_API}/findBuySignalBT?date=${date}`,
      {
        boughtStocks: holdStocksLocal,
        portfolio: currentCashLocal,
      },
      {
        onDownloadProgress(progress) {
          console.log("download progress:", progress);
        },
      }
    );

    currentCashLocal = portfolioAfterBuy;
    setCurrentCash(portfolioAfterBuy);
    setCurrentStockPrice((lastPrice) => lastPrice - totalCost);
    currentStockPriceLocal = currentStockPriceLocal - totalCost;

    // newBought.push(data);
    setHoldingStocks((oldStocks) => [...oldStocks, ...stocks]);
    holdStocksLocal = [...holdStocksLocal, ...stocks];
  };

  const getTestedData = async () => {
    await backTestMain(endDate, getTestedData);
  };

  const backTestMain = async (
    endDateP,
    callBackRecursively,
    isForceSell
  ) => {
    if (typeof currentDateLocal === "string")
      currentDateLocal = new Date(currentDateLocal);

    console.log({
      currentDateLocal,
      endDateP,
      isForceSell,
      l: holdStocksLocal.length,
    });

    // false
    // getData
    // !(false && false) = !(false && true)  =true && true = go in
    // !(false && false) = !(false && true)  =true && false = go to else
    // !(true && false) = true && true = go in
    // !(true && false) = true && false = go to else
    // !(true && true) = false && false = go to else
    // !(true && true) = false && true = go to else
    if (
      !(isForceSell && holdStocksLocal.length === 0) &&
      currentDateLocal <= endDateP
    ) {
      // if (
      //   (currentDateLocal <= endDateP &&
      //     isForceSell &&
      //     holdStocksLocal.length > 0) ||
      //   currentDateLocal <= endDateP
      // ) {
      // const date = `${currentDate.getFullYear()}-${
      //   currentDate.getMonth() + 1 < 10
      //     ? `0${currentDate.getMonth() + 1}`
      //     : currentDate.getMonth() + 1
      // }-${
      //   currentDate.getDate() + 1 < 10
      //     ? `0${currentDate.getDate()}`
      //     : currentDate.getDate()
      // }`;

      const date = customDateFormat(currentDateLocal);
      try {
        // const data = await callApi(date);
        console.log({ holdStocksLocal, endDateP });

        if (holdStocksLocal.length > 0) {
          // get the current price fot hold stocks

          await handleBackTestingAxiosError(
            updateCurrentPrice,
            date,
            "something went wrong while updating Stocks price ❌"
          );
          // look for sell signals for hold stocks

          await handleBackTestingAxiosError(
            sell,
            date,
            "something went wrong while selling Stocks price ❌",
            isForceSell
          );
          setAccountValue((oldData) => [
            ...oldData,
            {
              catch: currentCashLocal,
              stockValue: currentStockPriceLocal,
              date,
            },
          ]);
        }
        // look for buy signals TODO clean up this code
        if (!isForceSell) {
          await handleBackTestingAxiosError(
            buy,
            date,
            "something went wrong while buying Stocks price ❌"
          );
        } else {
          await sleep(1000 * 10);
        }

        // setUserChange()
        // console.log(stocks);
        setCountDays((oldValue) => oldValue + 1);
      } catch (error) {
        console.log(error);
      }
      let newDate = currentDateLocal.setDate(
        currentDateLocal.getDate() + 1
      );
      currentDateLocal = new Date(newDate);

      // loop = new Date(newDate);
      // loop =
      setCurrentDate(new Date(newDate));
      // }
      // setBough((boughs) => [...boughs, newBought]);
      if (isForceSell) await callBackRecursively(endDateP);
      else await callBackRecursively();
    } else {
      let newDate = currentDateLocal.setDate(
        currentDateLocal.getDate() - 1
      );
      setCurrentDate(new Date(newDate));

      setCountDays((oldValue) => oldValue - 1);
      setEndDate(new Date(newDate));

      holdStocksLocal = [];
      currentCashLocal = 0;
    }
  };

  useEffect(() => {
    updateLocalStorage({
      holdingStocks,
      soldStocks,
      currentDate,
      currentStockPrice,
      currentCash,
      wins,
      loess,
      accountValue,
      countDays,
      endDate,
    });
  }, [
    updateLocalStorage,
    holdingStocks,
    soldStocks,
    currentDate,
    currentStockPrice,
    currentCash,
    wins,
    loess,
    accountValue,
    countDays,
    endDate,
  ]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    holdingStocks,
    countDays,
    currentCash,
    getTestedData,
    currentStockPrice,
    accountValue,
    date: `${customDateFormat(currentDate)} ${
      days[currentDate.getDay()]
    }`,
    wins,
    loess,
    soldStocks,
    isEndDate: currentDate >= endDate,
    resetAllStates,
    forceSelling,
  };
};
