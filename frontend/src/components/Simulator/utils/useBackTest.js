import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
// import { updateBTState } from "../../../state/action-creator";
import { PYTHON_API } from "../../../utils/serverUtils";
import { sleep } from "../../../utils/sleep";
import {
  calculateReturn,
  customDateFormat,
} from "../SimulatorUtils";
import {
  statesDefault,
  useSaveTestedData,
} from "./useSaveTestedData";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { useReduxActions } from "../../../hooks/useReduxActions";

export const lastBTDate = "2022-2-1";

export const useBackTest = () => {
  const [_, { updateLocalStorage }] = useSaveTestedData();
  // const [holdingStocks, setHoldingStocks] = useState(
  //   localStorageData.holdingStocks
  // );
  // const [soldStocks, setSoldStocks] = useState(
  //   localStorageData.soldStocks
  // );
  // const [currentDate, setCurrentDate] = useState(
  //   new Date(localStorageData.currentDate)
  // );
  // const [currentCash, setCurrentCash] = useState(
  //   localStorageData.currentCash
  // );
  // const [currentStockPrice, setCurrentStockPrice] = useState(
  //   localStorageData.currentStockPrice
  // );
  // const [wins, setWins] = useState(localStorageData.wins);
  // const [losses, setLosses] = useState(localStorageData.loess);
  // const [accountValue, setAccountValue] = useState(
  //   localStorageData.accountValue
  // );

  // const [countDays, setCountDays] = useState(
  //   localStorageData.countDays
  // );
  // const [endDate, setEndDate] = useState(
  //   new Date(localStorageData.endDate)
  // );

  // const [sp500Data, setSp500Data] = useState(
  //   localStorageData.sp500Data
  // );

  // const dispatch = useDispatch();

  // const { updateBTState, resetBTState } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );

  const { updateBTState, updateModal } = useReduxActions();
  // const resetAllStates = () => {
  //   setHoldingStocks(statesDefault.holdingStocks);
  //   setSoldStocks(statesDefault.soldStocks);
  //   setCurrentDate(statesDefault.currentDate);
  //   setCurrentStockPrice(statesDefault.currentStockPrice);
  //   setCurrentCash(statesDefault.currentCash);
  //   setWins(statesDefault.wins);
  //   setLosses(statesDefault.loess);
  //   setAccountValue(statesDefault.accountValue);
  //   setCountDays(statesDefault.countDays);
  //   setEndDate(statesDefault.endDate);
  //   setSp500Data(statesDefault.sp500Data);
  //   // resetLocalStorage();
  //   resetBTState();
  // };

  const {
    holdingStocks,
    currentCash,
    currentStockPrice,
    accountValue,
    countDays,
    soldStocks,
    wins,
    losses,
    endDate,
    sp500Data,
    currentDate,
    accountRisk,
    isMarketOpen,
  } = useSelector((state) => state.back_testing);

  // 702316;
  let holdStocksLocal = holdingStocks;
  let currentCashLocal = currentCash;
  let currentStockPriceLocal = currentStockPrice;
  let accountValueLocal = [
    {
      catch: currentCash,
      stockValue: 0,
      date: customDateFormat(currentDate),
    },
  ];
  let accountValueLocalForce = accountValue;
  // let countDays = 0;
  let countDaysLocal = countDays;
  let soldStocksLocal = soldStocks;
  let winsLocal = wins;
  let lossesLocal = losses;
  let endDateLocal = endDate;
  let sp500DataLocal = sp500Data;
  let currentDateLocal = currentDate;
  let isMarketOpenLocal = isMarketOpen;

  const handleBackTestingAxiosError = async (
    callFunction,
    paramsFunction,
    messageError,
    paramsFunction2,
    paramsFunction3
  ) => {
    let isFoundError = true;
    while (isFoundError) {
      try {
        await callFunction(
          paramsFunction,
          paramsFunction2,
          paramsFunction3
        );
        isFoundError = false;
      } catch (error) {
        console.log(error);

        console.log(messageError);
        // setMessagePopupData({
        //   open: true,
        //   severity: "error",
        //   message: messageError,
        // });

        updateModal({ invalidMessage: messageError });
        await sleep(1000 * 10);
      }
    }
  };

  const [some, setIsMarketOpen] = useLocalStorage(
    "isMarketOpen",
    true
  );
  const checkIsMarketOpen = async (date) => {
    const {
      data: { isMarketOpen },
    } = await axios.get(
      `${PYTHON_API}/isMarketOpen?date=${date}`
    );

    setIsMarketOpen(isMarketOpen);
    updateBTState({ isMarketOpen });
  };

  const getSp500Data = async (date) => {
    const {
      data: { close },
    } = await axios.get(
      `${PYTHON_API}/getSP500Date?date=${date}`
    );

    if (close > 0) {
      sp500DataLocal = [...sp500DataLocal, { date, close }];
      // setSp500Data((oldData) => [...oldData, { date, close }]);
    } else {
      sp500DataLocal = [
        ...sp500DataLocal,
        {
          close: sp500DataLocal[sp500DataLocal.length - 1].close,
          date,
        },
      ];

      // setSp500Data((oldData) => [
      //   ...oldData,
      //   { close: oldData[oldData.length - 1].close, date },
      // ]);
    }

    // sp500Data.length > 0
    //   : setSp500Data([close]);
  };

  const updateCurrentPrice = async (date) => {
    // get the current price fot hold stocks

    const {
      data: { stocks: updatePriceStocks, todayChange },
    } = await axios.post(
      `${PYTHON_API}/getCurrentStockPrice?date=${date}`,
      {
        boughtStocks: holdStocksLocal,
      }
    );

    // setHoldingStocks(updatePriceStocks);
    holdStocksLocal = updatePriceStocks;
    // setCurrentStockPrice((lastPrice) => lastPrice + todayChange);
    currentStockPriceLocal =
      currentStockPriceLocal + todayChange;
  };

  const sell = async (date, isJustSell, isWithProfitOrNot) => {
    // create axiosPayload object if justSellType === "take any profit"
    // add isJustSell : true to axiosPayload
    // if justSellType === "sell anyway"
    // add isJustSellWithoutProfit === "true"
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
        isWithProfitOrNot:
          isWithProfitOrNot === undefined
            ? false
            : isWithProfitOrNot,
      }
    );
    if (SoldStocksP.length > 0) {
      // setSoldStocks((oldData) => [...oldData, ...SoldStocksP]);
      soldStocksLocal = [...soldStocksLocal, ...SoldStocksP];
      for (let index = 0; index < SoldStocksP.length; index++) {
        const sStock = SoldStocksP[index];
        const filteredArray = holdStocksLocal.filter(
          ({ symbol }) => symbol !== sStock.symbol
        );

        const returnPercentage = calculateReturn(
          sStock.boughtPrice,
          sStock.soldPrice
        ).percentage;

        if (
          sStock.isReachedStopLoss ||
          Number(returnPercentage) < 0
        ) {
          lossesLocal = lossesLocal + 1;
          // setLosses((oldValue) => oldValue + 1);
        } else {
          winsLocal = winsLocal + 1;
          // setWins((oldValue) => oldValue + 1);
        }

        holdStocksLocal = filteredArray;
        // setHoldingStocks((oldStocks) => filteredArray);
      }

      currentCashLocal = portfolioAfterSell;
      // setCurrentCash(portfolioAfterSell);

      // currentStockPriceLocal = totalReturnMoney * -1;
      // setCurrentStockPrice(
      //   (lastPrice) => lastPrice - totalReturnMoney
      // );
      currentStockPriceLocal =
        currentStockPriceLocal - totalReturnMoney;
    }
  };

  // let currentDateLocal = currentDate;

  const forceSelling = async (isWithProfitOrNot) => {
    let endDateLocalP = new Date(endDate);

    endDateLocalP = new Date(
      endDateLocalP.setDate(endDateLocalP.getDate() + 5)
    );
    endDateLocal = endDateLocalP;
    // setEndDate(endDateLocalP);
    await runForceSelling(endDateLocalP, isWithProfitOrNot);
  };

  const runForceSelling = async (
    endDateLocal,
    isWithProfitOrNot
  ) => {
    await backTestMain(
      endDateLocal,
      runForceSelling,
      true,
      isWithProfitOrNot
    );
  };

  const buy = async (date) => {
    const {
      data: { stocks, portfolio: portfolioAfterBuy, totalCost },
    } = await axios.post(
      `${PYTHON_API}/findBuySignalBT?date=${date}`,
      {
        boughtStocks: holdStocksLocal,
        portfolio: currentCashLocal,
        accountRisk,
      }
    );

    currentCashLocal = portfolioAfterBuy;
    // setCurrentCash(portfolioAfterBuy);
    // setCurrentStockPrice((lastPrice) => lastPrice - totalCost);
    currentStockPriceLocal = currentStockPriceLocal - totalCost;

    // newBought.push(data);
    // setHoldingStocks((oldStocks) => [...oldStocks, ...stocks]);
    holdStocksLocal = [...holdStocksLocal, ...stocks];
  };

  const getTestedData = async () => {
    await backTestMain(endDate, getTestedData);
  };

  const backTestMain = async (
    endDateP,
    callBackRecursively,
    isForceSell,
    isWithProfitOrNot
  ) => {
    // setIsBTRunning(true);
    updateBTState({ isBTRunning: true });
    if (typeof currentDateLocal === "string")
      currentDateLocal = new Date(currentDateLocal);

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
      const date = customDateFormat(currentDateLocal);
      try {
        // const data = await callApi(date);

        // await checkIsMarketOpen(date);

        await handleBackTestingAxiosError(
          checkIsMarketOpen,
          date,
          "something went wrong while checking if market is open"
        );

        if (holdStocksLocal.length > 0) {
          // get the current price fot hold stocks

          // fixing updating data for the same date when first date of force selling
          if (
            !sp500Data.length ||
            sp500Data[sp500Data.length - 1].date !== date
          ) {
            await handleBackTestingAxiosError(
              getSp500Data,
              date,
              "something went wrong while getting S&P 500 data"
            );

            await handleBackTestingAxiosError(
              updateCurrentPrice,
              date,
              "something went wrong while updating Stocks price"
            );
            // look for sell signals for hold stocks

            await handleBackTestingAxiosError(
              sell,
              date,
              "something went wrong while selling Stocks price",
              isForceSell,
              isWithProfitOrNot
            );
            // setAccountValue((oldData) => [
            //   ...oldData,
            //   {
            //     catch: currentCashLocal,
            //     stockValue: currentStockPriceLocal,
            //     date,
            //   },
            // ]);

            if (isForceSell) {
              accountValueLocalForce = [
                ...accountValueLocalForce,
                {
                  catch: currentCashLocal,
                  stockValue: currentStockPriceLocal,
                  date,
                },
              ];
            } else {
              accountValueLocal = [
                ...accountValueLocal,
                {
                  catch: currentCashLocal,
                  stockValue: currentStockPriceLocal,
                  date,
                },
              ];
            }
          }
        }
        // look for buy signals TODO clean up this code
        if (!isForceSell) {
          await handleBackTestingAxiosError(
            buy,
            date,
            "something went wrong while buying Stocks price"
          );
        } else {
          await sleep(1000 * 10);
        }

        // setUserChange()
        countDaysLocal = countDaysLocal + 1;
        // setCountDays((oldValue) => oldValue + 1);
      } catch (error) {
        console.log(error);
      }
      let newDate = currentDateLocal.setDate(
        currentDateLocal.getDate() + 1
      );
      currentDateLocal = new Date(newDate);

      // if (currentDateLocal > new Date("2022-2-1")) {
      //   updateBTState({ isBTRunning: false });
      //   return;
      // }
      // loop = new Date(newDate);
      // loop =
      // setCurrentDate(new Date(newDate));
      // }
      // setBough((boughs) => [...boughs, newBought]);

      // updateBTState("soksdja;kl");
      const updateValues = {
        holdingStocks: holdStocksLocal,
        soldStocks: soldStocksLocal,
        currentDate: currentDateLocal,
        currentStockPrice: currentStockPriceLocal,
        currentCash: currentCashLocal,
        wins: winsLocal,
        losses: lossesLocal,
        accountValue: isForceSell
          ? accountValueLocalForce
          : accountValueLocal,
        countDays: countDaysLocal,
        endDate: endDateLocal,
        sp500Data: sp500DataLocal,
        isEndDate: currentDateLocal >= endDateLocal,
        isBTDone: false,
      };
      updateBTState(updateValues);

      updateLocalStorage(updateValues);

      if (isForceSell)
        await callBackRecursively(endDateP, isWithProfitOrNot);
      else await callBackRecursively();
    } else {
      let newDate = currentDateLocal.setDate(
        currentDateLocal.getDate() - 1
      );
      // setCurrentDate(new Date(newDate));
      countDaysLocal = countDaysLocal - 1;
      // setCountDays((oldValue) => oldValue - 1);

      if (isForceSell) {
        endDateLocal = new Date(newDate);
        // setEndDate(new Date(newDate));
      }

      const updateValue = {
        holdingStocks: holdStocksLocal,
        soldStocks: soldStocksLocal,
        // currentDate: currentDateLocal,
        currentDate: new Date(newDate),
        currentStockPrice: currentStockPriceLocal,
        currentCash: currentCashLocal,
        wins: winsLocal,
        losses: lossesLocal,
        accountValue: isForceSell
          ? accountValueLocalForce
          : accountValueLocal,
        countDays: countDaysLocal,
        endDate: endDateLocal,
        sp500Data: sp500DataLocal,
        isEndDate: currentDateLocal >= endDateLocal,
        isBTDone: true,
      };

      updateBTState({ ...updateValue, isBTRunning: false });

      updateLocalStorage(updateValue);
      // setIsBTRunning(true);
      // updateBTState({ isBTRunning: true });

      holdStocksLocal = [];
      currentCashLocal = 0;
    }
  };

  // update local storage when any state in useBackTest change.
  // useEffect(() => {
  //   updateLocalStorage({
  //     holdingStocks,
  //     soldStocks,
  //     currentDate,
  //     currentStockPrice,
  //     currentCash,
  //     wins,
  //     loess: losses,
  //     accountValue,
  //     countDays,
  //     endDate,
  //     sp500Data,
  //   });
  // }, [
  //   // updateLocalStorage,
  //   holdingStocks,
  //   soldStocks,
  //   currentDate,
  //   currentStockPrice,
  //   currentCash,
  //   wins,
  //   losses,
  //   accountValue,
  //   countDays,
  //   endDate,
  //   sp500Data,
  // ]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    holdingStocks,
    countDays,
    currentCash,
    getTestedData,
    currentStockPrice,
    accountValue,
    // date: `${customDateFormat(currentDate)} ${
    //   days[currentDate.getDay()]
    // }`,
    wins,
    losses,
    soldStocks,
    isEndDate: currentDate >= endDate,
    // resetAllStates,
    forceSelling,
    sp500Data,
  };
};
