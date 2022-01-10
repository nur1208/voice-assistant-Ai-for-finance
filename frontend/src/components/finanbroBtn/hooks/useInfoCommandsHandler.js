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
  const [openedChartsNum, setOpenedChartsNum] = useState(0);

  const openWindow = (symbol) => {
    const width = window.outerWidth - 20;
    // const height = (window.outerHeight - 20) / 2;
    const height = window.outerHeight - 20;

    const newPopupWindow = window.open(
      `${YAHOO_FINANCE_URL}/chart/${symbol}`,
      `ORIGIN_CHART_WINDOW_${openedChartsNum + 1}`,
      `popup,width=${width},height=${height}`
    );
    if (popupWindow)
      setPopupWindow([...popupWindow, newPopupWindow]);
    else setPopupWindow([newPopupWindow]);

    setOpenedChartsNum(openedChartsNum + 1);
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
      response(`opening ${symbol} chart`);

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
      openWindow(symbol);
    } else {
      response(`number ${finalNum} out of range`);
    }
  };

  const openChart = async (target) => {
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
    response(`opening ${target} chart`);
    openWindow(finalTarget);
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

  const closeChart = () => {
    if (popupWindow) {
      if (popupWindow.length > 0) response(`closing the chart`);
      else response(`closing all charts`);

      for (let index = 0; index < popupWindow.length; index++) {
        const window = popupWindow[index];
        window.close();
      }
      // popupWindow.close();
    } else {
      response(`there is no chart open to close it`);
    }
  };

  return { openChart, closeChart, foundMultipleStocks };
};
