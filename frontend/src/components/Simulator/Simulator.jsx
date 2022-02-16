import React from "react";
import { Alert } from "./components/Alert";
import { GameInfo } from "./components/GameInfo";
import { PerformanceChart } from "./components/PerformanceChart";
import { PortfolioHoldings } from "./components/PortfolioHoldings";
import { PortfolioSummary } from "./components/PortfolioSummary";

import { MainWrapper } from "./SimulatorSC";
export const Simulator = () => {
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
            <PortfolioSummary />
            <GameInfo />
          </div>
          <PerformanceChart />
        </div>
        <PortfolioHoldings />
      </div>
    </MainWrapper>
  );
};
