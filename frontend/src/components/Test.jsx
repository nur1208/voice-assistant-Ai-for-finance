import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BACKEND_API_URL,
  TESTED_DATA_ROUTE,
  PYTHON_API,
} from "../utils/serverUtils";
import { useBackTest } from "./Simulator/utils/useBackTest";

export const Test = () => {
  const {
    holdingStocks,
    count,
    loop,
    currentCash,
    getTestedData,
  } = useBackTest();

  return (
    <div>
      <h1>{holdingStocks.length}</h1>
      <h1>{count}</h1>
      <h1>{loop + ""}</h1>
      <h1>{currentCash}</h1>
      <button onClick={getTestedData}>
        click here to get data
      </button>{" "}
      <ul>
        {holdingStocks.map(
          ({ symbol, currentPrice, boughtPrice }) => (
            <>
              <li>{symbol}</li>
              <li>{boughtPrice}</li>
              <li>{currentPrice ? currentPrice : 0}</li>
            </>
          )
        )}
      </ul>
    </div>
  );
};
