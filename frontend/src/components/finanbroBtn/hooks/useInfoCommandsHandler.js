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
import { sleep } from "../../../utils/sleep";

export const useInfoCommandsHandler = (
  response,
  handleOpenModal,
  handleCloseModal,
  soldStocks
) => {
  const [popupWindow, setPopupWindow] = useState(null);
  const [foundStock, setFoundStock] = useState([]);
  const [openedWindowNum, setOpenedWindowNum] = useState(0);
  const [windowType, setWindowType] = useState("");
  const width = window.outerWidth - 20;
  const height = window.outerHeight - 20;
  const [popupWWControl, setPopupWWControl] = useState(null);
  const [chooseNum, setChooseNum] = useState(-1);
  // const [currentStock, setCurrentStock] = useState({});

  const changeChartTo = async (type) => {
    const validOptions = [
      "1 minute",
      "2 minutes",
      "5 minutes",
      "15 minutes",
      "30 minutes",
      "1 hour",
      "4 hours",
      "1 day",
      "1 week",
      "1 month",
      "1 year",
    ];

    if (!popupWWControl) {
      response(`browser with my control is closed`);
      return;
    }

    if (!validOptions.includes(type)) {
      response(`${type} is not valid option`);
      return;
    }

    try {
      await axios.post(`${AUTO_API_URL}/changeChart`, { type });

      response(`here is ${type} chart`);
    } catch (error) {
      response("something went wrong from auto app");
    }
  };

  const openMultipleCharts = async (companies) => {
    if (companies.includes("and")) {
      let companiesArray = companies.split("and");
      // companiesArray = companiesArray.map((s) => s.trim());
      response(
        `opening  ${companiesArray.join(" and ")} charts`
      );

      const popupWindows = [];
      let newPopupWindow;
      for (
        let index = 0;
        index < companiesArray.length;
        index++
      ) {
        const company = companiesArray[index];

        const finalTarget = await openYahooFinance(
          "chart",
          company.trim(),
          false,
          true
        );
        if (finalTarget) {
          newPopupWindow = window.open(
            `${YAHOO_FINANCE_URL}/chart/${finalTarget}`,
            `ORIGIN_CHART_WINDOW_${index + 1}`,
            `popup,width=${width},height=${height}`
          );
          popupWindows.push(newPopupWindow);
        }
      }

      setPopupWindow(popupWindows);
    } else {
      response("sorry I can't open that");
    }
    // console.log({ companiesArray });
    // response(`DONE opening ${companiesArray.join(" and ")} charts`);
  };

  const currentStockPrice = async (symbol) => {
    const {
      data: {
        chart: { result },
      },
    } = await axios.get(
      `https://yahoo-finance-api.vercel.app/${symbol}`
    );

    const {
      meta: { regularMarketPrice },
    } = result[0];

    handleOpenModal(
      `${symbol} ticker`,
      `the current price for ${symbol} is ${regularMarketPrice}`
    );

    response(`${regularMarketPrice}`);
    setTimeout(() => {
      handleCloseModal();
    }, 1000 * 7);
  };

  let currentStock = {};
  const changeDate = async () => {
    console.log({ currentStock });

    try {
      const { data } = await axios.post(
        `${AUTO_API_URL}/changeDate`,
        {
          startDate: currentStock.dateOfBuying,
          endDate: currentStock.dateOfSelling,
        }
      );
      response(`here is sold chart ${currentStock.symbol}`);
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message)
        response(error.response.data.message);
      else
        response(
          "something wrong from auto app, please make sure your auto app is running"
        );
    }
  };

  const openChartWithControl = async (symbol) => {
    try {
      response("loading the page will take seconds");
      const { data } = await axios.post(`${AUTO_API_URL}/open`, {
        goToUrl: `${YAHOO_FINANCE_URL}/chart/${symbol}`,
        windowType: "chart",
      });

      setPopupWWControl(data.isAutoBrowserOpen);
      response("the page is done loading");
      await sleep(1000 * 5);
      response("setting dates")
      if (windowType.type === "soldChart") {
        await changeDate();
      }
      // window.open(goToUrl, "_blank");
    } catch (error) {
      response(
        "something wrong from auto app, please make sure your auto app is running"
      );
    }
  };

  const zoomChart = async (type) => {
    const validOptions = ["in", "out"];
    const isValidOption = validOptions.includes(
      type.toLowerCase()
    );

    if (!isValidOption) {
      response(`${type} is not valid option for zooming`);
      return;
    }

    if (!popupWWControl) {
      response(
        `chart window is close so I can not zoom ${type}`
      );
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
    } else if (type === "news") {
      newPopupWindow = window.open(
        `${YAHOO_FINANCE_URL}/quote/${symbol}?p=${symbol}`,
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

      case "currentPrice":
        response(`the current price for ${symbol} is`);
        break;

      case "news":
        response(
          `scroll the window a bit down and you will find ${symbol} news`
        );
        break;

      default:
        break;
    }
  };

  const openYahooFinance = async (
    type,
    target,
    isWithControl,
    isIgnoreFoundMultiple
  ) => {
    let finalTarget = target.trim();
    // const isFound
    if (!(await lookupForTickersV2(finalTarget))) {
      const symbolsFound = await searchCompanyNameV2(
        finalTarget
      );
      console.log(symbolsFound);

      if (symbolsFound && symbolsFound.length > 2) {
        finalTarget = symbolsFound[0].symbol;

        if (isIgnoreFoundMultiple) {
          finalTarget = symbolsFound[0].symbol;
        } else {
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
        }
      } else if (symbolsFound && symbolsFound.length === 1) {
        finalTarget = symbolsFound[0].symbol;
      } else {
        // response(
        //   `so give me a minute to learn about ${target} from yahoo finance`
        // );

        // just let finansis remember that didn't find stocks for current keyword
        try {
          // check if the keyword is not exist in the database
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
              if (isIgnoreFoundMultiple) {
                finalTarget = companies[0].symbol;
              } else {
                response(
                  "found the following stocks choose one by saying stock number 3 for example"
                );
                handleOpenModal(
                  "found the following stocks:",
                  companies
                );

                setWindowType({ type, isWithControl });
                setFoundStock(companies);
              }

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
              return;
            }
          } else {
            response(
              `I didn't find any chart with ${target} keyword from yahoo finance`
            );
            return;
          }
        } catch (error) {
          response(
            `I didn't find any chart with ${target} keyword from yahoo finance`
          );
          return;
        }

        // so I'll learn about ${target} and you can try again after 3 minutes

        if (!isIgnoreFoundMultiple) return;
      }
    }
    yahooFinanceOpeningWResponses(type, target);

    if (type === "currentPrice") {
      await currentStockPrice(target);
      return;
    }

    if (isWithControl) {
      await openChartWithControl(finalTarget);
    } else if (isIgnoreFoundMultiple) {
      return finalTarget;
    } else {
      openWindow(type, finalTarget);
    }
  };

  const foundMultipleStocks = async (num) => {
    const wordNum = [
      "zero",
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
    // setChooseNum(finalNum);
    if (finalNum > 0 && finalNum <= foundStock.length) {
      const { symbol } = foundStock[finalNum - 1];
      currentStock = soldStocks[finalNum - 1];
      handleCloseModal();

      if (windowType.type === "soldChart") {
        openYahooFinance("chart", symbol, true, true);
        return;
      }

      yahooFinanceOpeningWResponses(windowType.type, symbol);
      if (windowType.type === "currentPrice") {
        await currentStockPrice(symbol);
        return;
      }

      if (windowType.isWithControl) {
        openChartWithControl(symbol);
      } else {
        openWindow(windowType.type, symbol);
      }
    } else {
      response(`number ${finalNum} out of range`);
    }
  };

  const closeChart = async () => {
    if (popupWindow) {
      if (popupWindow.length === 1)
        response(`closing the window`);
      else response(`closing all windows`);

      for (let index = 0; index < popupWindow.length; index++) {
        const window = popupWindow[index];
        window.close();
      }
      setPopupWindow(null);
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
      response(
        `here is the most losers stocks from yahoo finance`
      );

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

      for (
        let index = 0;
        index < theMostWindow.length;
        index++
      ) {
        const window = theMostWindow[index];
        window.close();
      }
      // popupWindow.close();
    } else {
      response(`there is no the most window open to close it`);
    }
  };

  const showSoldStockChart = async () => {
    response("the following stocks has been sold");
    // const onlySymbols = soldStocks.map(({ symbol }) => ({
    //   symbol,
    // }));
    handleOpenModal("sold the following stocks:", soldStocks);
    await sleep(1000);
    response("choose one by saying stock number 3 for example");

    setWindowType({ type: "soldChart", isWithControl: true });
    setFoundStock(soldStocks);
  };

  return {
    openYahooFinance,
    closeChart,
    foundMultipleStocks,
    openTheMost,
    closeTheMost,
    zoomChart,
    openMultipleCharts,
    changeChartTo,

    showSoldStockChart,
  };
};
