import React from "react";
import { ChartBtn } from "./ChartBtn";
import { ChartSVG } from "./ChartSVG";

export const PerformanceChart = () => {
  const chartsBtn = [
    { title: " 1W ", isActive: true },
    { title: " 1M " },
    { title: " 3M " },
    { title: " 6M " },
    { title: " 1Y " },
  ];

  return (
    <div className="flex-grow-1 d-md-flex flex-column">
      <div className="text-overline white--text">
        Performance
      </div>
      <div className="v-card v-sheet theme--light elevation-0 rounded-0 performance-chart flex-grow-1">
        <div class="v-card__text pb-0 text--text text-overline">
          Investopedia Stock Game
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 pb-0 col">
              <div
                className="v-item-group  v-btn-toggle v-btn-toggle--borderless v-btn-toggle--tile"
                style={{ width: "95%" }}
              >
                {chartsBtn.map((props) => (
                  <ChartBtn {...props} />
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col line-chart col-12 pl-0 pt-0">
              <div className="v-progress-linear v-progress-linear--visible theme--light">
                <div className="v-progress-linear__background primary"></div>
                <div className="v-progress-linear__buffer"></div>
                <div className="v-progress-linear__indeterminate">
                  <div className="v-progress-linear__indeterminate long primary"></div>
                  <div className="v-progress-linear__indeterminate short primary"></div>
                </div>
              </div>
              <div>
                <div className="apexcharts-canvas apexchartsxlpvj4hk apexcharts-theme-light">
                  <ChartSVG />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mt-1">
            <div className="col-12 pt-0 col">
              <div className="d-md-flex justify-space-between align-center">
                <div className="d-flex justify-end order-md-1 mb-4 mb-md-0">
                  <label
                    htmlFor=""
                    className="dollar-switch text--black px-2"
                  >
                    $
                  </label>
                  <div className="v-input percent-switch mt-0 mr-6 mr-md-4 mr-lg-6 v-input--hide-details theme--light v-input--selection-controls v-input--switch"></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
