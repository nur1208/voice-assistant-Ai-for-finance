export const tableHeadDateHolding = [
  { className: "text-left semi-bold", value: "Symbol" },
  { className: "text-left semi-bold", value: "Bought date" },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Current Price",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Today's Change",
  },
  {
    className: "text-right text-no-wrap semi-bold",
    value: "Purchase Price",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "QTY",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Total Value",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Total Gain/Loss",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Stop Loss Price",
  },
];

export const tableHeadDateSold = [
  { className: "text-left semi-bold", value: "Symbol" },
  { className: "text-left semi-bold", value: "Bought date" },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Sold Price",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Sold date",
  },
  {
    className: "text-right text-no-wrap semi-bold",
    value: "Purchase Price",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "QTY",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Total Value",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Total Gain/Loss",
  },
  {
    className: "text-right text-no-wrap semi-bold sortable",
    value: "Stop Loss Price",
  },
];

export const tableBodyDateHold = new Array(10)
  .fill(0)
  .map(() => ({
    symbol: "AMAT",
    boughtDate: "2020-1-1",
    currentPrice: "100",
    todayChange: { percentage: "+3", money: "100" },
    boughtPrice: "120",
    shares: "30",
    totalValue: "10000",
    totalGainLoss: { percentage: "+13%", money: "1100" },
    stopLose: 80,
  }));

export const tableBodyDateSold = new Array(10)
  .fill(0)
  .map(() => ({
    symbol: "AMAT",
    boughtDate: "2020-1-1",
    soldPrice: "120",
    soldDate: { date: "2020-1-5", holdingDays: 4 },
    boughtPrice: "120",
    shares: "30",
    totalValue: "10000",
    totalGainLoss: { percentage: "+13%", money: "1100" },
    stopLose: 80,
    isReachedStopLoss: false,
  }));
