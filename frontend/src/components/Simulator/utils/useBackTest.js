import axios from "axios";
import { useState } from "react";
import { PYTHON_API } from "../../../utils/serverUtils";

export const useBackTest = () => {
  const customDateFormat = (currentDate) =>
    `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 < 10
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1
    }-${
      currentDate.getDate() + 1 < 10
        ? `0${currentDate.getDate()}`
        : currentDate.getDate()
    }`;

  const [bough, setBough] = useState([]);
  const [testedData, setTestData] = useState([]);
  const [holdingStocks, setHoldingStocks] = useState([]);
  const [soldStocks, setSoldStocks] = useState([]);
  const start = new Date("02/01/2021");
  let startDate = new Date(start);
  const [currentDate, setCurrentDate] = useState(startDate);
  const [currentCash, setCurrentCash] = useState(1000000);
  const [currentStockPrice, setCurrentStockPrice] = useState(0);
  const [wins, setWins] = useState(0);
  const [loess, setLoess] = useState(0);
  const [accountValue, setAccountValue] = useState([
    {
      catch: 1000000,
      stockValue: 0,
      data: customDateFormat(startDate),
    },
  ]);

  const [userChange, setUserChange] = useState({
    money: 0.0,
    percentage: 0.0,
  });

  // 702316;
  let holdStocksLocal = holdingStocks;
  let currentCashLocal = currentCash;
  let currentStockPriceLocal = currentStockPrice;
  let count = 0;

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
      setSoldStocks(SoldStocksP);
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

  const getTestedData = async () => {
    const end = new Date("02/03/2021");
    const newBought = [];
    if (currentDate <= end) {
      // const date = `${currentDate.getFullYear()}-${
      //   currentDate.getMonth() + 1 < 10
      //     ? `0${currentDate.getMonth() + 1}`
      //     : currentDate.getMonth() + 1
      // }-${
      //   currentDate.getDate() + 1 < 10
      //     ? `0${currentDate.getDate()}`
      //     : currentDate.getDate()
      // }`;

      const date = customDateFormat(currentDate);
      try {
        // const data = await callApi(date);
        if (holdStocksLocal.length > 0) {
          // get the current price fot hold stocks

          await updateCurrentPrice(date);
          // look for sell signals for hold stocks

          await sell(date);
        }
        // look for buy signals TODO clean up this code
        await buy(date);

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
        count = +1;
      } catch (error) {
        console.log(error);
      }
      let newDate = currentDate.setDate(
        currentDate.getDate() + 1
      );
      // loop = new Date(newDate);
      // loop =
      setCurrentDate(new Date(newDate));
      // }
      setBough((boughs) => [...boughs, newBought]);
      await getTestedData();
    } else {
      holdStocksLocal = [];
      currentCashLocal = 0;
    }
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    holdingStocks,
    count,
    loop: currentDate,
    currentCash,
    getTestedData,
    currentStockPrice,
    userChange,
    accountValue,
    date: `${customDateFormat(currentDate)} ${
      days[currentDate.getDay()]
    }`,
    wins,
    loess,
    soldStocks,
  };
};
