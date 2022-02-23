import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { customDateFormat } from "../SimulatorUtils";

const start = new Date("04/25/2020");
let startDate = new Date(start);
export const statesDefault = {
  holdingStocks: [],
  soldStocks: [],
  currentDate: startDate,
  currentCash: 1000000,
  currentStockPrice: 0,
  wins: 0,
  loess: 0,
  accountValue: [
    {
      catch: 1000000,
      stockValue: 0,
      data: customDateFormat(start),
    },
  ],
  countDays: 0,
  endDate: new Date("04/28/2020"),
};

export const useSaveTestedData = () => {
  const [holdingStocks, setHoldingStocks] = useLocalStorage(
    "holdingStocks",
    statesDefault.holdingStocks
  );
  const [soldStocks, setSoldStocks] = useLocalStorage(
    "soldStocks",
    statesDefault.soldStocks
  );
  //   const start = new Date("02/01/2021");
  const start = new Date("04/20/2020");
  let startDate = new Date(start);
  const [currentDate, setCurrentDate] = useLocalStorage(
    "currentDate",
    statesDefault.currentDate
  );
  const [currentCash, setCurrentCash] = useLocalStorage(
    "currentCash",
    statesDefault.currentCash
  );
  const [currentStockPrice, setCurrentStockPrice] =
    useLocalStorage(
      "currentStockPrice",
      statesDefault.currentStockPrice
    );
  const [wins, setWins] = useLocalStorage(
    "wins",
    statesDefault.wins
  );
  const [loess, setLoess] = useLocalStorage(
    "loess",
    statesDefault.loess
  );

  const [accountValue, setAccountValue] = useLocalStorage(
    "accountValue",
    statesDefault.accountValue
  );

  const [countDays, setCountDays] = useLocalStorage(
    "countDays",
    statesDefault.countDays
  );

  const [endDate, setEndDate] = useLocalStorage(
    "endDate",
    statesDefault.endDate
  );

  const updateLocalStorage = (data) => {
    setHoldingStocks(data["holdingStocks"]);
    setSoldStocks(data["soldStocks"]);
    setCurrentDate(data["currentDate"]);
    setCurrentStockPrice(data["currentStockPrice"]);
    setCurrentCash(data["currentCash"]);
    setWins(data["wins"]);
    setLoess(data["loess"]);
    setAccountValue(data["accountValue"]);
    setCountDays(data["countDays"]);
    setEndDate(data["endDate"]);
  };

  const resetLocalStorage = () => {
    localStorage.clear();
    // window.location.reload();
  };

  return [
    {
      holdingStocks,
      soldStocks,
      currentDate,
      currentStockPrice,
      currentCash,
      wins,
      loess,
      accountValue,
      countDays,
      endDate,
    },
    { updateLocalStorage, resetLOcalStorage: resetLocalStorage },
  ];
};
