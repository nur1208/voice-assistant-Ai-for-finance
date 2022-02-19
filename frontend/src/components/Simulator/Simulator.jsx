import React from "react";
import { Alert } from "./components/Alert";
import { GameInfo } from "./components/GameInfo";
import { PerformanceChart } from "./components/PerformanceChart";
import { PortfolioHoldings } from "./components/PortfolioHoldings/PortfolioHoldings";
import { PortfolioSummary } from "./components/PortfolioSummary";

import { MainWrapper } from "./SimulatorSC";
import { useBackTest } from "./utils/useBackTest";
export const Simulator = () => {
  const {
    holdingStocks,
    count,
    loop,
    currentCash,
    getTestedData,
    currentStockPrice,
    userChange,
  } = useBackTest();

  const PortfolioHoldingsProps = { getTestedData };

  const PortfolioSummaryProps = {
    holdingStocksLength: holdingStocks.length,
    currentCash,
    currentStockPrice,
    userChange,
  };

  return (
    <MainWrapper>
      <div className="sub-nav">
        <div className="sub-nav-above"></div>
        <div className="sub-nav-below"></div>
      </div>
      <div className="container portfolio-page">
        <Alert />
        <div className="d-md-flex mb-2">
          <div className="d-flex flex-column flex-shrink-0 mr-md-7">
            <PortfolioSummary {...PortfolioSummaryProps} />
            <GameInfo />
          </div>
          <PerformanceChart />
        </div>
        <PortfolioHoldings {...PortfolioHoldingsProps} />
      </div>
    </MainWrapper>
  );
};
