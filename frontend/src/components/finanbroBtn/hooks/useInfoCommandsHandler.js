import { useState } from "react";
import Typography from "@mui/material/Typography";

import {
  lookupForTickers,
  lookupForTickersV2,
  searchCompanyName,
  searchCompanyNameV2,
} from "./../../../utils/symbolTicker";

import { getAllTickersInDatabaseToJson } from "./../../../utils/getAllTickersInDatabaseToJson";

import axios from "axios";
import {
  AUTO_API_URL,
  BACKEND_API_URL,
  KNOWN_KEYWORD_ROUTE,
  YAHOO_FINANCE_URL,
} from "../../../utils/serverUtils";

export const useInfoCommandsHandler = (
  response,
  handleOpenModal,
  handleCloseModal
) => {
  const [popupWindow, setPopupWindow] = useState(null);
  const [foundStock, setFoundStock] = useState([]);
  const [openedWindowNum, setOpenedWindowNum] = useState(0);
  const [windowType, setWindowType] = useState("");
  const width = window.outerWidth - 20;
  const height = window.outerHeight - 20;
  const [popupWWControl, setPopupWWControl] = useState(null);

  const openChartWithControl = async (symbol) => {
    try {
      response("loading the page will take seconds");
      const { data } = await axios.post(`${AUTO_API_URL}/open`, {
        goToUrl: `${YAHOO_FINANCE_URL}/chart/${symbol}`,
        windowType: "chart",
      });

      setPopupWWControl(data.isAutoBrowserOpen);
      response("the page is done loading");

      // window.open(goToUrl, "_blank");
    } catch (error) {
      response(
        "something wrong from auto app, please make sure your auto app is running"
      );
    }
  };

  const zoomChart = async (type) => {
    const validOptions = ["in", "out"];
    const isValidOption = validOptions.includes(type.toLowerCase());

    if (!popupWWControl) {
      response("the window is close so I can not zoom in or out");
      return;
    }

    if (!isValidOption) {
      response(`${type} is not valid option for zooming`);
      return;
    }

    // if all validation true then only execute the following code:
    try {
      await axios.post(`${AUTO_API_URL}/zoom`, { type });
      response(`zooming ${type}`);
    } catch (error) {
      response(
        "something went wrong from auto app, please check if auto app is running"
      );
    }
  };

  const openWindow = (type, symbol) => {
    // const height = (window.outerHeight - 20) / 2;

    let newPopupWindow;
    if (type === "chart") {
      newPopupWindow = window.open(
        `${YAHOO_FINANCE_URL}/chart/${symbol}`,
        `ORIGIN_CHART_WINDOW_${openedWindowNum + 1}`,
        `popup,width=${width},height=${height}`
      );
    } else if (type === "statistics") {
      newPopupWindow = window.open(
        `${YAHOO_FINANCE_URL}/quote/${symbol}/key-statistics?p=${symbol}`,
        `ORIGIN_CHART_WINDOW_${openedWindowNum + 1}`,
        `popup,width=${width},height=${height}`
      );
    }
    if (popupWindow)
      setPopupWindow([...popupWindow, newPopupWindow]);
    else setPopupWindow([newPopupWindow]);

    setOpenedWindowNum(openedWindowNum + 1);
    setWindowType("");
  };
  const yahooFinanceOpeningWResponses = (type, symbol) => {
    switch (type) {
      case "chart":
        response(`opening ${symbol} chart`);
        break;
      case "statistics":
        response(`here is ${symbol} statistics`);
        break;

      default:
        break;
    }
  };
  const foundMultipleStocks = (num) => {
    const wordNum = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    let finalNum = num;
    if (wordNum.includes(finalNum)) {
      finalNum = wordNum.indexOf(finalNum);
    }
    console.log({ finalNum });
    if (finalNum > 0 && finalNum <= foundStock.length) {
      const { symbol } = foundStock[finalNum - 1];

      yahooFinanceOpeningWResponses(windowType.type, symbol);
      handleCloseModal();
      // const width = window.outerWidth - 20;
      // const height = (window.outerHeight - 20) / 2;
      // const newPopupWindow = window.open(
      //   `https://finance.yahoo.com/chart/${symbol}`,
      //   `ORIGIN_CHART_WINDOW_${openedChartsNum + 1}`,
      //   `popup,width=${width},height=${height}`
      // );
      // setPopupWindow([...popupWindow, newPopupWindow]);
      // setOpenedChartsNum(openedChartsNum + 1);
      if (windowType.isWithControl) {
        openChartWithControl(symbol);
      } else {
        openWindow(windowType.type, symbol);
      }
    } else {
      response(`number ${finalNum} out of range`);
    }
  };

  const openYahooFinance = async (type, target, isWithControl) => {
    let finalTarget = target;
    // const isFound
    if (!(await lookupForTickersV2(finalTarget))) {
      const symbolsFound = await searchCompanyNameV2(finalTarget);
      console.log(symbolsFound);
      if (symbolsFound && symbolsFound.length > 2) {
        finalTarget = symbolsFound[0].symbol;

        response(
          "found the following stocks choose one by saying stock number 3 for example"
        );
        handleOpenModal(
          "found the following stocks:",
          symbolsFound
        );

        setWindowType({ type, isWithControl });

        setFoundStock(symbolsFound);
        return;
      } else if (symbolsFound && symbolsFound.length === 1) {
        finalTarget = symbolsFound[0].symbol;
      } else {
        // response(
        //   `so give me a minute to learn about ${target} from yahoo finance`
        // );

        try {
          const {
            data: { status },
          } = await axios.get(
            `${BACKEND_API_URL}/${KNOWN_KEYWORD_ROUTE}?keyword=${target}`
          );
          if (status === "fall") {
            response(
              `didn't find chart for ${target}, so give me a minute to learn about ${target} from yahoo finance`
            );

            // so I'll learn about ${target} and you can try again after 3 minutes
            const {
              data: { companies },
            } = await axios.post(
              `${AUTO_API_URL}/findingCompanies`,
              {
                keyword: target,
              }
            );
            // first one
            if (companies.length > 0) {
              response(`I can open ${target} chart now`);
              response(
                "found the following stocks choose one by saying stock number 3 for example"
              );
              handleOpenModal(
                "found the following stocks:",
                companies
              );

              setWindowType({ type, isWithControl });
              setFoundStock(companies);
              // await getAllTickersInDatabaseToJson();
              // TODO clean up the following code
            } else {
              response(
                `I also didn't find chart for ${target} from yahoo finance`
              );

              await axios.post(
                `${BACKEND_API_URL}/${KNOWN_KEYWORD_ROUTE}`,
                {
                  keyword: target,
                }
              );
            }
          } else {
            response(
              `I didn't find any chart with ${target} keyword from yahoo finance`
            );
          }
        } catch (error) {
          response(
            `I didn't find any chart with ${target} keyword from yahoo finance`
          );
        }

        // so I'll learn about ${target} and you can try again after 3 minutes

        return;
      }
    }
    yahooFinanceOpeningWResponses(type, target);

    if (isWithControl) {
      openChartWithControl(finalTarget);
    } else {
      openWindow(type, finalTarget);
    }
    // two charts are open you can switch between them by presing alt and clikcing tab to switch betweens the windows

    // const width = window.outerWidth - 20;
    // const height = (window.outerHeight - 20) / 2;

    // const newPopupWindow = window.open(
    //   `https://finance.yahoo.com/chart/${finalTarget}`,
    //   `ORIGIN_CHART_WINDOW_${openedChartsNum + 1}`,
    //   `popup,width=${width},height=${height}`
    // );
    // // setPopupWindow(newPopupWindow);
    // setPopupWindow([...popupWindow, newPopupWindow]);
    // setOpenedChartsNum(openedChartsNum + 1);
  };

  const closeChart = async () => {
    if (popupWindow) {
      if (popupWindow.length === 1) response(`closing the window`);
      else response(`closing all windows`);

      for (let index = 0; index < popupWindow.length; index++) {
        const window = popupWindow[index];
        window.close();
      }
      // popupWindow.close();
    } else if (popupWWControl) {
      response(`closing the window`);
      const { data } = await axios.post(`${AUTO_API_URL}/close`);

      setPopupWWControl(data.isAutoBrowserOpen);
    } else {
      response(`there is no chart open to close it`);
    }
  };

  const [theMostWindow, setTheMostWindow] = useState(null);
  const [theMostNum, setTheMostNum] = useState(0);
  const openTheMost = (type) => {
    let newMostWindow;

    if (type === "actives" || type === "active") {
      response(
        `here is the most actives stocks from yahoo finance`
      );

      newMostWindow = window.open(
        `${YAHOO_FINANCE_URL}/most-active`,
        `THE_MOST_WINDOW_${theMostNum + 1}`,
        `popup,width=${width},height=${height}`
      );
    } else if (type === "gainers" || type === "gainer") {
      response(
        `here is the most gainers stocks from yahoo finance`
      );

      newMostWindow = window.open(
        `${YAHOO_FINANCE_URL}/gainers`,
        `THE_MOST_WINDOW_${theMostNum + 1}`,
        `popup,width=${width},height=${height}`
      );
    } else if (type === "losers" || type === "loser") {
      response(`here is the most losers stocks from yahoo finance`);

      newMostWindow = window.open(
        `${YAHOO_FINANCE_URL}/losers`,
        `THE_MOST_WINDOW_${theMostNum + 1}`,
        `popup,width=${width},height=${height}`
      );
    } else if (type === "trending") {
      response(`here is trending stocks from yahoo finance`);

      newMostWindow = window.open(
        `${YAHOO_FINANCE_URL}/trending-tickers`,
        `THE_MOST_WINDOW_${theMostNum + 1}`,
        `popup,width=${width},height=${height}`
      );
    } else {
      response(`didn't find the most ${type} stocks`);
      return;
    }

    if (theMostWindow)
      setTheMostWindow([...theMostWindow, newMostWindow]);
    else setTheMostWindow([newMostWindow]);

    setTheMostNum(theMostNum + 1);
  };

  const closeTheMost = () => {
    if (theMostWindow) {
      if (theMostWindow.length === 1)
        response(`closing the window`);
      else response(`closing all windows`);

      for (let index = 0; index < theMostWindow.length; index++) {
        const window = theMostWindow[index];
        window.close();
      }
      // popupWindow.close();
    } else {
      response(`there is no the most window open to close it`);
    }
  };

  return {
    openYahooFinance,
    closeChart,
    foundMultipleStocks,
    openTheMost,
    closeTheMost,
    zoomChart,
  };
};
