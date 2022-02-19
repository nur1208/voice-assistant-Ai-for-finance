import axios from "axios";
import { useState } from "react";
import { PYTHON_API } from "../../../utils/serverUtils";

export const useBackTest = () => {
  const [bough, setBough] = useState([]);
  const [testedData, setTestData] = useState([]);
  const [holdingStocks, setHoldingStocks] = useState([]);

  const start = new Date("02/01/2021");
  let startDate = new Date(start);
  const [currentDate, setCurrentDate] = useState(startDate);
  const [currentCash, setCurrentCash] = useState(1000000);
  const [currentStockPrice, setCurrentStockPrice] = useState(0);
  const [wins, setWins] = useState(0);
  const [loess, setLoess] = useState(0);
  const [accountValue, setAccountValue] = useState([
    { catch: 100000, stockValue: 0 },
  ]);

  const [userChange, setUserChange] = useState({
    money: 0.0,
    percentage: 0.0,
  });

  // 702316;
  let holdStocksLocal = holdingStocks;
  let currentCashLocal = currentCash;
  let count = 0;
  const getTestedData = async () => {
    const end = new Date("02/03/2021");
    const newBought = [];
    if (currentDate <= end) {
      const date = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1 < 10
          ? `0${currentDate.getMonth() + 1}`
          : currentDate.getMonth() + 1
      }-${
        currentDate.getDate() + 1 < 10
          ? `0${currentDate.getDate()}`
          : currentDate.getDate()
      }`;
      try {
        // const data = await callApi(date);
        if (holdStocksLocal.length > 0) {
          // get the current price fot hold stocks
          const {
            data: { stocks: updatePriceStocks },
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
          // look for sell signals for hold stocks
          const {
            data: {
              stocks: SoldStocks,
              portfolio: portfolioAfterSell,
            },
          } = await axios.post(
            `${PYTHON_API}/findSellSignalBT?date=${date}`,
            {
              boughtStocks: holdStocksLocal,
              portfolio: currentCash,
            },
            {
              onDownloadProgress(progress) {
                console.log("download progress:", progress);
              },
            }
          );
          if (SoldStocks.length > 0) {
            console.log(SoldStocks);
            for (
              let index = 0;
              index < SoldStocks.length;
              index++
            ) {
              const sStock = SoldStocks[index];
              holdStocksLocal = holdStocksLocal.filter(
                ({ symbol }) => symbol !== sStock.symbol
              );
              setHoldingStocks((oldStocks) =>
                oldStocks.filter(
                  ({ symbol }) => symbol !== sStock.symbol
                )
              );
            }

            currentCashLocal = portfolioAfterSell;
            setCurrentCash(portfolioAfterSell);
          }
        }
        // look for buy signals TODO clean up this code
        const {
          data: { stocks, portfolioAfterBuy },
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
        // newBought.push(data);
        setHoldingStocks((oldStocks) => [
          ...oldStocks,
          ...stocks,
        ]);
        holdStocksLocal = [...holdStocksLocal, ...stocks];
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
  return {
    holdingStocks,
    count,
    loop: currentDate,
    currentCash,
    getTestedData,
    currentStockPrice,
    userChange,
  };
};
