import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BACKEND_API_URL,
  TESTED_DATA_ROUTE,
  PYTHON_API,
} from "../utils/serverUtils";
import { useBackTest } from "./Simulator/utils/useBackTest";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import { bindActionCreators } from "redux";
import { useAxiosFetch } from "../hooks/useAxiosFetch";
import { useReduxActions } from "../hooks/useReduxActions";

export const Test = () => {
  const {
    holdingStocks,
    count,
    loop,
    currentCash,
    getTestedData,
  } = useBackTest();

  const dispatch = useDispatch();

  const { signUp } = useReduxActions();
  // const { data, loading, error, errorMessage } = useAxiosFetch(
  //   `${PYTHON_API}/findBuySignal`
  // );
  // const [controller, setcontroller] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const controllerLocal = new AbortController();

  //     setcontroller(controllerLocal);
  //     const { data } = await axios({
  //       url: `${PYTHON_API}/findBuySignal`,
  //       method: "get",
  //       signal: controllerLocal.signal,

  //       // signal: controller.signal,
  //     });
  //   })();
  // }, []);

  return (
    <div>
      <h1>{holdingStocks.length}</h1>
      <h1>{count}</h1>
      <h1>{loop + ""}</h1>
      <h1>{currentCash}</h1>
      <button
        onClick={() =>
          signUp({
            name: "R",
            password: "12341234",
            email: "r6w@yahoo.com",
            gander: "Female",
          })
        }
      >
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
