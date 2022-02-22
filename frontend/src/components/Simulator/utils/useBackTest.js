import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { PYTHON_API } from "../../../utils/serverUtils";
import { sleep } from "../../../utils/sleep";
import { customDateFormat } from "../SimulatorUtils";
import { useSaveTestedData } from "./useSaveTestedData";

export const useBackTest = () => {
  const [localStorageData, updateLocalStorage] =
    useSaveTestedData();
  const [holdingStocks, setHoldingStocks] = useState(
    localStorageData.holdingStocks
  );
  const [soldStocks, setSoldStocks] = useState(
    localStorageData.soldStocks
  );
  const [currentDate, setCurrentDate] = useState(
    localStorageData.currentDate
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

  // const [testedData, setTestData] = useState([]);
  // const [holdingStocks, setHoldingStocks] = useState([]);
  // const [soldStocks, setSoldStocks] = useState([]);
  // const start = new Date("02/01/2021");
  // let startDate = new Date(start);
  // const [currentDate, setCurrentDate] = useState(startDate);
  // const [currentCash, setCurrentCash] = useState(1000000);
  // const [currentStockPrice, setCurrentStockPrice] = useState(0);
  // const [wins, setWins] = useState(0);
  // const [loess, setLoess] = useState(0);
  // const [accountValue, setAccountValue] = useState([
  //   {
  //     catch: 1000000,
  //     stockValue: 0,
  //     data: customDateFormat(startDate),
  //   },
  // ]);

  // const [countDays, setCountDays] = useState(0);

  // 702316;
  let holdStocksLocal = holdingStocks;
  let currentCashLocal = currentCash;
  let currentStockPriceLocal = currentStockPrice;
  // let countDays = 0;

  const handleBackTestingAxiosError = async (
    callFunction,
    paramsFunction,
    messageError
  ) => {
    let isFoundError = true;
    while (isFoundError) {
      try {
        await callFunction(paramsFunction);
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
    //     isFoundError = false;
    // let isFoundError = true;
    // while (isFoundError) {
    //   try {
    //     const {
    //       data: { stocks: updatePriceStocks, todayChange },
    //     } = await axios.post(
    //       `${PYTHON_API}/getCurrentStockPrice?date=${date}`,
    //       {
    //         boughtStocks: holdStocksLocal,
    //       },
    //       {
    //         onDownloadProgress(progress) {
    //           console.log("download progress:", progress);
    //         },
    //       }
    //     );

    //     setHoldingStocks(updatePriceStocks);
    //     holdStocksLocal = updatePriceStocks;
    //     setCurrentStockPrice(
    //       (lastPrice) => lastPrice + todayChange
    //     );
    //     currentStockPriceLocal =
    //       currentStockPriceLocal + todayChange;
    //     isFoundError = false;
    //   } catch (error) {
    //     console.log(error);

    //     console.log(
    //       "something went wrong while updating Stocks price ❌"
    //     );

    //     await sleep(1000 * 10);
    //   }
    // }
  };

  const sell = async (date) => {
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

  let currentDataLocal = currentDate;

  const getTestedData = async () => {
    // const end = new Date("02/10/2021");
    const end = new Date("04/22/2020");
    console.log("here");

    // 2020 - 04 - 13;
    const newBought = [];

    if (typeof currentDataLocal === "string")
      currentDataLocal = new Date(currentDataLocal);

    if (currentDataLocal <= end) {
      // const date = `${currentDate.getFullYear()}-${
      //   currentDate.getMonth() + 1 < 10
      //     ? `0${currentDate.getMonth() + 1}`
      //     : currentDate.getMonth() + 1
      // }-${
      //   currentDate.getDate() + 1 < 10
      //     ? `0${currentDate.getDate()}`
      //     : currentDate.getDate()
      // }`;

      const date = customDateFormat(currentDataLocal);
      try {
        // const data = await callApi(date);
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
            "something went wrong while selling Stocks price ❌"
          );
        }
        // look for buy signals TODO clean up this code
        await handleBackTestingAxiosError(
          buy,
          date,
          "something went wrong while buying Stocks price ❌"
        );

        setAccountValue((oldData) => [
          ...oldData,
          {
            catch: currentCashLocal,
            stockValue: currentStockPriceLocal,
            date,
          },
        ]);

        // setUserChange()
        // console.log(stocks);
        setCountDays((oldValue) => oldValue + 1);
      } catch (error) {
        console.log(error);
      }
      let newDate = currentDataLocal.setDate(
        currentDataLocal.getDate() + 1
      );
      // loop = new Date(newDate);
      // loop =
      setCurrentDate(new Date(newDate));
      // }
      // setBough((boughs) => [...boughs, newBought]);
      await getTestedData();
    } else {
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
  ]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    holdingStocks,
    countDays,
    currentCash,
    getTestedData,
    currentStockPrice,
    accountValue,
    date: `${customDateFormat(new Date(currentDate))} ${
      days[new Date(currentDate).getDay()]
    }`,
    wins,
    loess,
    soldStocks,
  };
};
