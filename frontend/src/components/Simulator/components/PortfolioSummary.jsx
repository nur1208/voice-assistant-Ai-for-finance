import React from "react";
import {
  calculateReturn,
  renderPriceChangeReturn,
  renderPriceChangeStyle,
} from "../SimulatorUtils";
import { TextOverLine } from "./TextOverLine";

export const PortfolioSummary = ({
  holdingStocksLength,
  currentCash,
  currentStockPrice,
  userChange,
  accountValue,
  countDays,
}) => {
  // const renderPriceChangeReturn = (
  //   type,

  //   accountValue
  // ) => {
  //   const perPrice = accountValue[accountValue.length - 2];
  //   const currentPrice = accountValue[accountValue.length - 1];
  //   console.log({
  //     accountLength: accountValue.length,
  //     accountValue,
  //   });
  //   const returnData =
  //     accountValue.length > 1
  //       ? calculateReturn(
  //           perPrice.catch + perPrice.stockValue,
  //           currentPrice.catch + currentPrice.stockValue
  //         )
  //       : { money: 0, percentage: 0 };

  //   return <spam>{Number(returnData[type]).toFixed(2)}</spam>;
  // };

  return (
    <>
      <div className="text-overline white--text">Overview</div>
      <div className="portfolio-summary mb-2 v-card v-sheet theme--light rounded-0">
        <div className="v-card__text text--text">
          <div className="row">
            <div className="pb-0 col">
              <TextOverLine title="Account Value" />
              <div className="text-h4">
                $
                {Number(currentCash + currentStockPrice).toFixed(
                  2
                )}
              </div>
            </div>
            {/* <div className="col">
              <TextOverLine title="Annual Return" />
              <div className="annual-return text-h5 error--text">
                -34.28%
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="pb-0 col">
              <TextOverLine title="Your Change" />
              <div
                className={`today-change text-h5 ${renderPriceChangeStyle(
                  renderPriceChangeReturn(
                    "percentage",
                    accountValue
                  )
                )}`}
              >
                $
                <span>
                  {renderPriceChangeReturn(
                    "money",
                    accountValue
                  ) > 0
                    ? "+"
                    : ""}
                </span>
                {/* {userChange?.money.toFixed(2)} */}
                {renderPriceChangeReturn("money", accountValue)}
              </div>
              <div className="today-change-percent text-subtitle-1 ml-2 success--text">
                (
                {renderPriceChangeReturn(
                  "percentage",
                  accountValue
                )}
                %)
                {/* ({userChange?.percentage.toFixed(2)}%) */}
              </div>
            </div>
            <div className="col">
              <TextOverLine title="S&P 500's Change" />
              <div className="annual-return text-h5 error--text">
                -34.28%
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextOverLine title="Holding Stock" />
              <div className="buying-power text-h5">
                {holdingStocksLength}
              </div>
            </div>
            <div className="col">
              <TextOverLine title="Cash" />
              <div className="cash text-h5">
                ${currentCash.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
