import React from "react";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { ArrowUpIcon } from "./ArrowUpIcon";
import { HorizontalLineIcon } from "./HorizontalLineIcon";

export const SymbolTable = () => {
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
          <th
            role="columnheader"
            scope="col"
            className="text-left semi-bold"
          >
            <span>Symbol</span>
          </th>
          <th
            role="columnheader"
            scope="col"
            className="text-left semi-bold"
          >
            <span>Description</span>
          </th>
          <th className="text-right text-no-wrap semi-bold sortable">
            <span>Current Price</span>
            {/* <ArrowDownIcon size="medium" /> */}
          </th>
          <th className="text-right text-no-wrap semi-bold sortable">
            <span>Today's Change</span>
          </th>
          <th className="text-right text-no-wrap semi-bold">
            <span>Purchase Price</span>
          </th>
          <th className="text-right text-no-wrap semi-bold sortable">
            <span>QTY</span>
          </th>
          <th className="text-right text-no-wrap semi-bold sortable">
            <span>Total Value</span>
          </th>
          <th className="text-right text-no-wrap semi-bold sortable">
            <span>Total Gain/Loss</span>
          </th>
          {/* <th className="text-left text-no-wrap">
              <span>Trade Actions</span>
            </th> */}
        </tr>
      </thead>
      <tbody>
        {new Array(10).fill(0).map((_, index) => (
          <tr key={index}>
            <td className="text-left symbol-cell">
              <div className="symbol-row-toggle text-no-wrap d-flex">
                <div className="symbol">AMAT</div>
              </div>
            </td>
            <td className="text-left symbol-description py-1">
              Applied Materials Inc.
            </td>
            <td className="text-right semi-bold">
              <div>$139.84</div>
            </td>
            <td className="text-right">
              <div className="gain-loss semi-bold d-inline-flex align-center">
                <div>
                  $0.00
                  <br data-v-08f29e58="" />
                  (0.00%)
                </div>
                <HorizontalLineIcon />
              </div>
            </td>
            <td className="text-right semi-bold">
              <div>$135.76</div>
            </td>
            <td className="text-right semi-bold">
              <div>36</div>
            </td>
            <td className="text-right semi-bold">
              <div>$5,034.24</div>
            </td>
            <td className="text-right">
              <div className="gain-loss semi-bold d-inline-flex align-center success--text">
                <div>
                  $146.88
                  <br />
                  (3.01%)
                </div>
                <ArrowUpIcon />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
