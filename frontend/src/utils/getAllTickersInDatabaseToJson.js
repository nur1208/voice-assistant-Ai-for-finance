import axios from "axios";
// import fs from "fs";
import fs from "browserify-fs";

export const getAllTickersInDatabaseToJson = async () => {
  const {
    data: { doc },
  } = await axios.get("http://localhost:4050/api/v1/companies");

  const tickers = {};

  for (let index = 0; index < doc.length; index++) {
    const { symbol, name } = doc[index];
    tickers[symbol] = { name };
  }

  fs.writeFile(
    "tickerToNameV2.json",
    JSON.stringify(tickers),
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
};
// getAllTickersInDatabaseToJson();
