import React from "react";
import { TextOverLine } from "./TextOverLine";

export const PortfolioSummary = ({
  holdingStocksLength,
  currentCash,
  currentStockPrice,
  userChange,
}) => {
  return (
    <>
      <div className="text-overline white--text">Overview</div>
      <div className="portfolio-summary mb-2 v-card v-sheet theme--light rounded-0">
        <div className="v-card__text text--text">
          <div className="row">
            <div className="pb-0 col">
              <TextOverLine title="Account Value" />
              <div className="text-h4">
                ${currentCash + currentStockPrice}
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
              <div className="today-change text-h5 success--text">
                <span>+</span>
                {userChange?.money.toFixed(2)}
              </div>
              <div className="today-change-percent text-subtitle-1 ml-2 success--text">
                ({userChange?.percentage.toFixed(2)}%)
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
              <div className="cash text-h5">${currentCash}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
