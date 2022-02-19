import React from "react";
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
              stopLose,
              soldPrice,
              soldDate,
              isReachedStopLoss,
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
                <div>${currentPrice || soldPrice}</div>
              </td>
              <td className="text-right">
                <div
                  className={`gain-loss semi-bold d-inline-flex align-center ${
                    todayChange ? "success--text" : ""
                  }`}
                >
                  {!todayChange ? (
                    <>
                      <div>
                        {soldDate.date}
                        <br data-v-08f29e58="" />(
                        {`${soldDate.holdingDays} ${
                          soldDate.holdingDays <= 1
                            ? "day"
                            : "days"
                        }`}
                        )
                      </div>
                      <HorizontalLineIcon />
                    </>
                  ) : (
                    <>
                      <div>
                        ${todayChange.money}
                        <br />({todayChange.percentage}%)
                      </div>
                      <ArrowUpIcon />
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
                <div>${totalValue}</div>
              </td>
              <td className="text-right">
                <div className="gain-loss semi-bold d-inline-flex align-center success--text">
                  <div>
                    ${totalGainLoss.money}
                    <br />({totalGainLoss.percentage}%)
                  </div>
                  <ArrowUpIcon />
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
                <div>${stopLose}</div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
