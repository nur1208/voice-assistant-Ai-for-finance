import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BACKEND_API_URL,
  TESTED_DATA_ROUTE,
  PYTHON_API,
} from "../utils/serverUtils";

export const Test = () => {
  const [bough, setBough] = useState([]);

  const [testedData, setTestData] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { docs },
      } = await axios.get(
        `${BACKEND_API_URL}/${TESTED_DATA_ROUTE}`
      );
      // console.log(docs);
      setTestData(docs);
    })();
  }, []);

  // const callApi = async (date) => {
  //   try {
  //     const {
  //       data: { stocks },
  //     } = await axios.post(
  //       `${PYTHON_API}/findBuySignalBT?date=${date}`,
  //       { boughtStocks: [] }
  //     );
  //     return { stocks };
  //   } catch (error) {
  //     console.log(error);
  //     // reject(error);
  //   }
  // };
  // new Promise((resolve, reject) => {
  //   setTimeout(
  //     async (date) => {
  //       // try {
  //       //   const foundBought = testedData.filter((item) =>
  //       //     item.boughtDate.includes(date)
  //       //   );
  //       //   const foundSold = testedData.filter((item) =>
  //       //     item.soldDate.includes(date)
  //       //   );
  //       //   resolve({ foundBought, foundSold });
  //       // } catch (error) {
  //       //   // console.log(error);
  //       //   reject(error);
  //       // }

  //       try {
  //         const {
  //           data: { stocks },
  //         } = await axios.post(
  //           `${PYTHON_API}/findBuySignalBT?date=${date}`,
  //           { boughtStocks: [] }
  //         );
  //         resolve({ stocks });
  //       } catch (error) {
  //         // console.log(error);
  //         reject(error);
  //       }
  //     },
  //     1000 * 2,
  //     date
  //   );
  // });

  const start = new Date("02/01/2021");

  let loopD = new Date(start);
  const [loop, setLoop] = useState(loopD);

  const [currentCash, setCurrentCash] = useState(1000000);
  // 702316;
  let coute = 0;
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

        const {
          data: { stocks },
        } = await axios.post(
          `${PYTHON_API}/findBuySignalBT?date=${date}`,
          { boughtStocks: [] }
        );

        // newBought.push(data);
        console.log(stocks);
        coute = +1;
        // console.log(bough);
        let priceOfBuying = 0;
        let priceOfSelling = 0;
        // if (data.foundBought.length > 0) {
        //   for (
        //     let index = 0;
        //     index < data.foundBought.length;
        //     index++
        //   ) {
        //     const { boughtPrice, shares } =
        //       data.foundBought[index];

        //     priceOfBuying = priceOfBuying + boughtPrice * shares;

        //     // console.log({ boughtPrice, shares, priceOfBuying });
        //   }
        // }
        // if (data.foundSold.length > 0) {
        //   for (
        //     let index = 0;
        //     index < data.foundSold.length;
        //     index++
        //   ) {
        //     const { soldPrice, shares } = data.foundSold[index];

        //     priceOfSelling = priceOfBuying + soldPrice * shares;
        //   }
        // }
        // console.log({ priceOfBuying, priceOfSelling });
        // setCurrentCash(
        //   (p) => p - priceOfBuying + priceOfSelling
        // );
        // console.log(data);
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
    }
    // while (loop <= end) {
  };

  return (
    <div>
      <h1>{bough.length}</h1>
      <h1>{coute}</h1>
      <h1>{loop + ""}</h1>
      <h1>{currentCash}</h1>
      <button onClick={getTestedData}>
        click here to get data
      </button>{" "}
    </div>
  );
};
