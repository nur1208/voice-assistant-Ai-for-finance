import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { customDateFormat } from "../SimulatorUtils";

export const useSaveTestedData = () => {
  const [holdingStocks, setHoldingStocks] = useLocalStorage(
    "holdingStocks",
    []
  );
  const [soldStocks, setSoldStocks] = useLocalStorage(
    "soldStocks",
    []
  );
  //   const start = new Date("02/01/2021");
  const start = new Date("02/18/2020");
  let startDate = new Date(start);
  const [currentDate, setCurrentDate] = useLocalStorage(
    "currentDate",
    startDate
  );
  const [currentCash, setCurrentCash] = useLocalStorage(
    "currentCash",
    1000000
  );
  const [currentStockPrice, setCurrentStockPrice] =
    useLocalStorage("currentStockPrice", 0);
  const [wins, setWins] = useLocalStorage("wins", 0);
  const [loess, setLoess] = useLocalStorage("loess", 0);

  const [accountValue, setAccountValue] = useLocalStorage(
    "accountValue",
    [
      {
        catch: 1000000,
        stockValue: 0,
        data: customDateFormat(start),
      },
    ]
  );

  const [countDays, setCountDays] = useLocalStorage(
    "countDays",
    0
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
    },
    updateLocalStorage,
  ];
};
