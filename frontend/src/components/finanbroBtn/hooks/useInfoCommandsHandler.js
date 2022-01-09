import { useState } from "react";
import Typography from "@mui/material/Typography";

import {
  lookupForTickers,
  lookupForTickersV2,
  searchCompanyName,
} from "./../../../utils/symbolTicker";

import { getAllTickersInDatabaseToJson } from "./../../../utils/getAllTickersInDatabaseToJson";

import axios from "axios";
export const useInfoCommandsHandler = (
  response,
  handleOpenModal,
  handleCloseModal
) => {
  const [popupWindow, setPopupWindow] = useState(null);
  const [foundStock, setFoundStock] = useState([]);

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
      const newPopupWindow = window.open(
        `https://finance.yahoo.com/chart/${symbol}`,
        "ORIGIN_CHART_WINDOW",
        "popup,width=1366,height=708"
      );
      setPopupWindow(newPopupWindow);
    } else {
      response(`number ${finalNum} out of range`);
    }
  };

  // const openChart = async (target) => {
  //   let finalTarget = target;
  //   if (!lookupForTickers(finalTarget)) {
  //     const symbolsFound = searchCompanyName(finalTarget);
  //     console.log(symbolsFound);
  //     if (symbolsFound.length > 2) {
  //       finalTarget = symbolsFound[0].symbol;

  //       response(
  //         "found the following stocks choose one by saying stock number 3 for example"
  //       );
  //       handleOpenModal(
  //         "found the following stocks:",
  //         symbolsFound
  //       );

  //       setFoundStock(symbolsFound);
  //       return;
  //     } else if (symbolsFound.length === 1) {
  //       finalTarget = symbolsFound[0].symbol;
  //     } else {
  //       response(`didn't find chart for ${target} `);

  //       response(
  //         `so give me a minute to learn about ${target} from yahoo finance`
  //       );

  //       // so I'll learn about ${target} and you can try again after 3 minutes
  //       const {
  //         data: { companies },
  //       } = await axios.post(
  //         "http://localhost:3333/findingCompanies",
  //         { keyword: target }
  //       );
  //       // first one
  //       if (companies.length > 0) {
  //         response(
  //           "found the following stocks choose one by saying stock number 3 for example"
  //         );
  //         handleOpenModal("found the following stocks:", companies);

  //         setFoundStock(companies);
  //         // await getAllTickersInDatabaseToJson();
  //         response(`I can open ${target} chart now`);
  //       } else {
  //         response(
  //           `I also didn't find chart for ${target} from yahoo finances`
  //         );
  //       }

  //       return;
  //     }
  //   }
  //   response(`opening ${target} chart`);

  //   const newPopupWindow = window.open(
  //     `https://finance.yahoo.com/chart/${finalTarget}`,
  //     "ORIGIN_CHART_WINDOW",
  //     "popup,width=1366,height=708"
  //   );
  //   setPopupWindow(newPopupWindow);
  // };

  const openChart = async (target) => {
    let finalTarget = target;
    // const isFound
    if (!(await lookupForTickersV2(finalTarget))) {
      const symbolsFound = searchCompanyName(finalTarget);
      console.log(symbolsFound);
      if (symbolsFound.length > 2) {
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
      } else if (symbolsFound.length === 1) {
        finalTarget = symbolsFound[0].symbol;
      } else {
        response(
          `didn't find chart for ${target}, so give me a minute to learn about ${target} from yahoo finance`
        );

        // response(
        //   `so give me a minute to learn about ${target} from yahoo finance`
        // );

        // so I'll learn about ${target} and you can try again after 3 minutes
        const {
          data: { companies },
        } = await axios.post(
          "http://localhost:3333/findingCompanies",
          { keyword: target }
        );
        // first one
        if (companies.length > 0) {
          response(
            "found the following stocks choose one by saying stock number 3 for example"
          );
          handleOpenModal("found the following stocks:", companies);

          setFoundStock(companies);
          // await getAllTickersInDatabaseToJson();
          response(`I can open ${target} chart now`);
        } else {
          response(
            `I also didn't find chart for ${target} from yahoo finances`
          );
        }

        return;
      }
    }
    response(`opening ${target} chart`);

    const newPopupWindow = window.open(
      `https://finance.yahoo.com/chart/${finalTarget}`,
      "ORIGIN_CHART_WINDOW",
      "popup,width=1366,height=708"
    );
    setPopupWindow(newPopupWindow);
  };

  const closeChart = () => {
    response(`closing the chart`);
    popupWindow.close();
  };

  return { openChart, closeChart, foundMultipleStocks };
};
