import React from "react";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { ClockIcon } from "./ClockIcon";
import { SymbolTable } from "./SymbolTable";
import { XIcon } from "./XIcon";

export const PortfolioHoldings = () => {
  return (
    <>
      <div className="text-overline white--text">Holdings</div>
      <div className="container portfolio-holdings white">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8 pa-0 text-md-right order-md-2 col order-1">
            <div className="pa-md-3 text--text white--text">
              <div>
                <XIcon />
                <span class="pl-1">
                  Market is closed. Opens in 3hr, 35min
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 pa-0 order-md-1 col order-2">
            <header
              className="v-sheet theme--light v-toolbar v-toolbar--dense v-toolbar--flat"
              style={{ height: "48px" }}
            >
              <div
                className="v-toolbar__content"
                style={{ height: "48px" }}
              >
                <div className="v-tabs v-tabs--grow theme--light">
                  <div className="v-item-group theme--light v-slide-group v-tabs-bar primary--text">
                    <div className="v-slide-group__prev v-slide-group__prev--disabled"></div>
                    <div className="v-slide-group__wrapper">
                      <div className="v-slide-group__content v-tabs-bar__content">
                        <div
                          className="v-tabs-slider-wrapper"
                          style={{
                            height: "2px",
                            left: "0px",
                            width: "161px",
                          }}
                        >
                          <div className="v-tabs-slider"></div>
                        </div>
                        <div className="v-tab v-tab--active holding-tab">
                          Stocks & ETFs
                        </div>
                        <div
                          data-v-b500334e=""
                          tabindex="0"
                          aria-selected="false"
                          role="tab"
                          className="v-tab holding-tab"
                          data-cy="holding-tab"
                        >
                          Options
                        </div>
                        <div
                          data-v-b500334e=""
                          tabindex="0"
                          aria-selected="false"
                          role="tab"
                          class="v-tab holding-tab"
                          data-cy="holding-tab"
                        >
                          Shorts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
          <div className="col-12 pa-0 col order-3">
            <hr className="v-divider theme--light" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pa-0 col">
            <div className="holdings-table">
              <div className="holdings-table-header">
                <div className="container d-flex white">
                  <div className="mr-8">
                    <div className="overline"> Total Value </div>
                    <div className="semi-bold"> $57,056.44 </div>
                  </div>
                  <div className="mr-8">
                    <div className="overline text-no-wrap">
                      Today's Change
                    </div>
                    <div className="gain-loss semi-bold d-inline-flex align-center">
                      <div className="text-no-wrap">
                        $0.00 (0.00%)
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="overline no-wrap">
                      Total Gain/Loss
                    </div>
                    <div className="gain-loss semi-bold d-inline-flex align-center error--text">
                      <div className="text-no-wrap">
                        -$1,860.09 (-3.16%)
                        <ArrowDownIcon size="small" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="v-divider theme--light" />
              </div>
              <div className="horizontal-scroll-shadow">
                <div className="v-data-table theme--light">
                  <div className="v-data-table__wrapper">
                    <SymbolTable />
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-6">
                <a
                  style={{ height: "3rem", width: "300px" }}
                  href="#here"
                  className="semi-bold v-btn v-btn--has-bg v-btn--router v-btn--tile theme--light elevation-0 v-size--default primary"
                >
                  <div
                    className="v-btn__content"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ClockIcon
                      style={{ paddingRight: "20px" }}
                    />
                    Trade History
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div
            className="col-12 pa-0 col"
            style={{ marginTop: "25px" }}
          >
            <div class="col-12 pa-0 col order-3">
              <hr class="v-divider theme--light" />
            </div>
            <div className="horizontal-scroll-shadow">
              <div className="v-data-table theme--light  blue_bgc">
                <div className="v-data-table__wrapper">
                  <SymbolTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
