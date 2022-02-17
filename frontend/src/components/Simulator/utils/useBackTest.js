import axios from "axios";
import { useState } from "react";
import { PYTHON_API } from "../../../utils/serverUtils";

export const useBackTest = () => {
  const [bough, setBough] = useState([]);
  const [testedData, setTestData] = useState([]);
  const [holdingStocks, setHoldingStocks] = useState([]);

  const start = new Date("02/01/2021");
  let loopD = new Date(start);
  const [loop, setLoop] = useState(loopD);
  const [currentCash, setCurrentCash] = useState(1000000);

  // 702316;
  let holdStocksLocal = holdingStocks;
  let count = 0;
  const getTestedData = async () => {
    const end = new Date("02/03/2021");
    const newBought = [];
    if (loop <= end) {
      const date = `${loop.getFullYear()}-${
        loop.getMonth() + 1 < 10
          ? `0${loop.getMonth() + 1}`
          : loop.getMonth() + 1
      }-${
        loop.getDate() + 1 < 10
          ? `0${loop.getDate()}`
          : loop.getDate()
      }`;
      try {
        // const data = await callApi(date);
        if (holdStocksLocal.length > 0) {
          // get the current price fot hold stocks
          const {
            data: { stocks: updatePriceStocks },
          } = await axios.post(
            `${PYTHON_API}/getCurrentStockPrice?date=${date}`,
            { boughtStocks: holdStocksLocal },
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
            data: { stocks: SoldStocks },
          } = await axios.post(
            `${PYTHON_API}/findSellSignalBT?date=${date}`,
            { boughtStocks: holdStocksLocal },
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
          }
        }
        // look for buy signals
        const {
          data: { stocks },
        } = await axios.post(
          `${PYTHON_API}/findBuySignalBT?date=${date}`,
          { boughtStocks: holdStocksLocal },
          {
            onDownloadProgress(progress) {
              console.log("download progress:", progress);
            },
          }
        );
        // newBought.push(data);
        setHoldingStocks((oldStocks) => [
          ...oldStocks,
          ...stocks,
        ]);
        holdStocksLocal = [...holdStocksLocal, ...stocks];
        console.log(stocks);
        count = +1;
      } catch (error) {
        console.log(error);
      }
      let newDate = loop.setDate(loop.getDate() + 1);
      // loop = new Date(newDate);
      // loop =
      setLoop(new Date(newDate));
      // }
      setBough((button) => [...button, newBought]);
      await getTestedData();
    } else {
      holdStocksLocal = [];
    }
  };
  return {
    holdingStocks,
    count,
    loop,
    currentCash,
    getTestedData,
  };
};
