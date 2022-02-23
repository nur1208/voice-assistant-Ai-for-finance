import React from "react";
import { ArrowDownIcon } from "../ArrowDownIcon";
import { ClockIcon } from "../ClockIcon";
import { SymbolTable } from "../SymbolTable";
import { XIcon } from "../XIcon";
import {
  symbolTablePropsHolding,
  symbolTablePropsSold,
  tableBodyDateHold,
  tableBodyDateSold,
  tableHeadDateHolding,
  tableHeadDateSold,
} from "./PortfolioHoldingsUtils";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import {
  renderPriceChangeIcon,
  renderPriceChangeReturn,
  renderPriceChangeStyle,
} from "../../SimulatorUtils";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useSaveTestedData } from "../../utils/useSaveTestedData";
export const PortfolioHoldings = ({
  getTestedData,
  currentStockPrice,
  accountValue,
  holdingStocks,
  soldStocks,
  isEndDate,
  resetAllStates,
  forceSelling,
}) => {
  const [_, { resetLOcalStorage }] = useSaveTestedData();
  const symbolTablePropsHolding = {
    tableHeadDate: tableHeadDateHolding,
    tableBodyDate: holdingStocks,
  };

  const symbolTablePropsSold = {
    tableHeadDate: tableHeadDateSold,
    tableBodyDate: soldStocks,
  };

  return (
    <>
      <div className="text-overline white--text">Holdings</div>
      <div className="container portfolio-holdings white">
        <div className="row">
          <div className="col-12 text-center mt-6">
            {isEndDate && (
              <>
                <button
                  style={{
                    height: "3rem",
                    width: "300px",
                    // cursor: "auto",
                    marginRight: "30px",
                  }}
                  onClick={forceSelling}
                  // href="#here"
                  className="semi-bold v-btn v-btn--has-bg v-btn--router v-btn--tile theme--light elevation-0 v-size--default primary"
                >
                  <div
                    className="v-btn__content"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PlayCircleFilledWhiteIcon
                      style={{ paddingRight: "20px" }}
                      className="v-icon notranslate v-icon--left theme--light"
                    />
                    {/* <ClockIcon style={{ paddingRight: "20px" }} /> */}
                    force selling
                  </div>
                </button>
                <button
                  style={{
                    height: "3rem",
                    width: "300px",
                    // cursor: "auto",
                    marginRight: "30px",
                  }}
                  onClick={() => {
                    resetLOcalStorage();
                    resetAllStates();
                  }}
                  // href="#here"
                  className="semi-bold v-btn v-btn--has-bg v-btn--router v-btn--tile theme--light elevation-0 v-size--default primary"
                >
                  <div
                    className="v-btn__content"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RotateLeftIcon
                      style={{ paddingRight: "20px" }}
                      className="v-icon notranslate v-icon--left theme--light"
                    />
                    {/* <ClockIcon style={{ paddingRight: "20px" }} /> */}
                    reset
                  </div>
                </button>
              </>
            )}{" "}
            <button
              style={{
                height: "3rem",
                width: "300px",
                // cursor: "auto",
              }}
              onClick={getTestedData}
              // href="#here"
              className="semi-bold v-btn v-btn--has-bg v-btn--router v-btn--tile theme--light elevation-0 v-size--default primary"
            >
              <div
                className="v-btn__content"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PlayCircleFilledWhiteIcon
                  style={{ paddingRight: "20px" }}
                  className="v-icon notranslate v-icon--left theme--light"
                />
                {/* <ClockIcon style={{ paddingRight: "20px" }} /> */}
                Start Back Testing
              </div>
            </button>
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
                    <div className="semi-bold">
                      {" "}
                      ${currentStockPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="mr-8">
                    <div className="overline text-no-wrap">
                      Today's Change
                    </div>
                    <div
                      className={`gain-loss semi-bold d-inline-flex align-center ${renderPriceChangeStyle(
                        renderPriceChangeReturn(
                          "percentage",
                          accountValue
                        )
                      )}`}
                    >
                      <div className="text-no-wrap">
                        $
                        {renderPriceChangeReturn(
                          "money",
                          accountValue
                        )}{" "}
                        (
                        {renderPriceChangeReturn(
                          "percentage",
                          accountValue
                        )}
                        %)
                        {renderPriceChangeIcon(
                          renderPriceChangeReturn(
                            "percentage",
                            accountValue
                          ),
                          "small"
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="overline no-wrap">
                      Total Gain/Loss
                    </div>
                    <div
                      className={`gain-loss semi-bold d-inline-flex align-center ${renderPriceChangeStyle(
                        renderPriceChangeReturn(
                          "percentage",
                          accountValue,
                          true
                        )
                      )}`}
                    >
                      <div className="text-no-wrap">
                        $
                        {renderPriceChangeReturn(
                          "money",
                          accountValue,
                          true
                        )}{" "}
                        (
                        {renderPriceChangeReturn(
                          "percentage",
                          accountValue,
                          true
                        )}
                        %)
                        {renderPriceChangeIcon(
                          renderPriceChangeReturn(
                            "percentage",
                            accountValue,
                            true
                          ),
                          "small"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="v-divider theme--light" />
              </div>
              <div className="horizontal-scroll-shadow">
                <div className="v-data-table theme--light">
                  <div className="v-data-table__wrapper">
                    <SymbolTable {...symbolTablePropsHolding} />
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-6">
                <button
                  disabled
                  style={{
                    height: "3rem",
                    width: "300px",
                    cursor: "auto",
                  }}
                  // href="#here"
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
                    Sold Stocks
                  </div>
                </button>
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
                  <SymbolTable {...symbolTablePropsSold} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
