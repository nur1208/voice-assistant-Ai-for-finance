import React from "react";
import { TextOverLine } from "./TextOverLine";

export const PortfolioSummary = () => {
  return (
    <>
      <div className="text-overline white--text">Overview</div>
      <div className="portfolio-summary mb-2 v-card v-sheet theme--light rounded-0">
        <div className="v-card__text text--text">
          <div className="row">
            <div className="pb-0 col">
              <TextOverLine title="Account Value" />
              <div className="text-h4">$98,742.78</div>
            </div>
          </div>
          <div className="row">
            <div className="pb-0 col">
              <TextOverLine title="Today's Change" />
              <div className="today-change text-h5 success--text">
                <span>+</span>
                $0.00
              </div>
              <div className="today-change-percent text-subtitle-1 ml-2 success--text">
                (0.00%)
              </div>
            </div>
            <div className="col">
              <TextOverLine title="Annual Return" />
              <div className="annual-return text-h5 error--text">
                -34.28%
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextOverLine title="Buying Power" />
              <div className="buying-power text-h5">
                $72,577.08
              </div>
            </div>
            <div className="col">
              <TextOverLine title="Cash" />
              <div className="cash text-h5">$46,411.39</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
