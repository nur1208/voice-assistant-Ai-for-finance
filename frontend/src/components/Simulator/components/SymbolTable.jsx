import React from "react";
import {
  calculateReturn,
  renderDay,
  renderPriceChangeIcon,
  renderPriceChangeStyle,
} from "../SimulatorUtils";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { ArrowUpIcon } from "./ArrowUpIcon";
import { HorizontalLineIcon } from "./HorizontalLineIcon";

export const SymbolTable = ({
  tableHeadDate,
  tableBodyDate,
}) => {
  return (
    <table>
      <colgroup>
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
      </colgroup>
      <thead className="v-data-table-header">
        <tr>
          {tableHeadDate.map(({ className, value }, index) => (
            <th
              key={`id-${index}`}
              role="columnheader"
              scope="col"
              className={className}
            >
              <span>{value}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBodyDate.map(
          (
            {
              symbol,
              boughtDate,
              currentPrice,
              todayChange,
              boughtPrice,
              shares,
              totalValue,
              totalGainLoss,
              stopLossPrice,
              soldPrice,
              soldDate,
              isReachedStopLoss,
              previousPrice,
              numDaysOfHolding,
            },
            index
          ) => (
            <tr key={`id-${index}`}>
              <td className="text-left symbol-cell">
                <div className="symbol-row-toggle text-no-wrap d-flex">
                  <div className="symbol">{symbol}</div>
                </div>
              </td>
              <td className="text-left symbol-description py-1">
                {boughtDate}
              </td>
              <td className="text-right semi-bold">
                <div>
                  $
                  {Number(
                    currentPrice || soldPrice || 0.0
                  ).toFixed(2)}
                </div>
              </td>
              <td className="text-right">
                <div
                  className={`gain-loss semi-bold d-inline-flex align-center ${renderPriceChangeStyle(
                    calculateReturn(previousPrice, currentPrice)
                      .percentage
                  )}`}
                >
                  {soldDate !== undefined ? (
                    <>
                      <div>
                        {soldDate}
                        <br data-v-08f29e58="" />(
                        {`${numDaysOfHolding} ${renderDay(
                          numDaysOfHolding
                        )}`}
                        )
                      </div>
                      <HorizontalLineIcon />
                    </>
                  ) : currentPrice !== undefined &&
                    previousPrice !== undefined ? (
                    <>
                      <div>
                        $
                        {
                          calculateReturn(
                            previousPrice,
                            currentPrice
                          ).money
                        }
                        <br />(
                        {
                          calculateReturn(
                            previousPrice,
                            currentPrice
                          ).percentage
                        }
                        %)
                      </div>
                      {renderPriceChangeIcon(
                        calculateReturn(
                          previousPrice,
                          currentPrice
                        ).percentage,
                        "medium"
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        ${0.0}
                        <br />({0.0}
                        %)
                      </div>
                      {/* <ArrowUpIcon /> */}
                    </>
                  )}
                </div>
              </td>
              <td className="text-right semi-bold">
                <div>${boughtPrice}</div>
              </td>
              <td className="text-right semi-bold">
                <div>{shares}</div>
              </td>
              <td className="text-right semi-bold">
                <div>
                  ${Number(boughtPrice * shares).toFixed(2)}
                </div>
              </td>
              <td className="text-right">
                <div
                  className={`gain-loss semi-bold d-inline-flex align-center ${renderPriceChangeStyle(
                    soldPrice !== undefined
                      ? calculateReturn(boughtPrice, soldPrice)
                          .percentage
                      : calculateReturn(
                          boughtPrice,
                          currentPrice
                        ).percentage
                  )}`}
                >
                  {soldPrice !== undefined ? (
                    <>
                      <div>
                        $
                        {Number(
                          calculateReturn(boughtPrice, soldPrice)
                            .money * shares
                        ).toFixed(2)}
                        <br />
                        {
                          calculateReturn(boughtPrice, soldPrice)
                            .percentage
                        }
                        %
                      </div>
                      {renderPriceChangeIcon(
                        calculateReturn(boughtPrice, soldPrice)
                          .percentage,
                        "medium"
                      )}
                    </>
                  ) : currentPrice === undefined ? (
                    <div>
                      $ 0.00
                      <br />
                      0.00%
                    </div>
                  ) : (
                    <>
                      <div>
                        $
                        {Number(
                          calculateReturn(
                            boughtPrice,
                            currentPrice
                          ).money * shares
                        ).toFixed(2)}
                        <br />
                        {
                          calculateReturn(
                            boughtPrice,
                            currentPrice
                          ).percentage
                        }
                        %
                      </div>
                      {renderPriceChangeIcon(
                        calculateReturn(
                          boughtPrice,
                          currentPrice
                        ).percentage,
                        "medium"
                      )}
                    </>
                  )}
                </div>
              </td>
              <td
                className={`text-right semi-bold ${
                  isReachedStopLoss === undefined
                    ? ""
                    : isReachedStopLoss
                    ? "error--text"
                    : "success--text"
                }`}
              >
                <div>${stopLossPrice}</div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
