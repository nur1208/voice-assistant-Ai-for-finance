import React from "react";
import { MainWrapper, PriceChangeSC } from "./TheMostTableSC";
import { renderIbBox } from "./theMostTableUtls";

export const TheMostTable = () => {
  return (
    <MainWrapper>
      <ul className="fin-tab-items">{renderIbBox()}</ul>
      <div className="fin-scr-res-table">
        <div className="head-table">
          <div className="title">
            <span>Matching Stocks</span>
            <span className="result">
              <span>1-25 of 209 results</span>
            </span>
          </div>
          <div className="actions">
            <div className="addToP">
              <button>
                <svg
                  class="H(16px) W(23px) Va(m)! Mend(3px) Cur(a)! Cur(p)"
                  width="23"
                  // style="fill:#787d82;stroke:#787d82;stroke-width:0;vertical-align:bottom;"
                  height="16"
                  viewBox="0 0 24 24"
                  data-icon="star"
                  data-reactid="23"
                >
                  <path
                    d="M8.485 7.83l-6.515.21c-.887.028-1.3 1.117-.66 1.732l4.99 4.78-1.414 6.124c-.2 1.14.767 1.49 1.262 1.254l5.87-3.22 5.788 3.22c.48.228 1.464-.097 1.26-1.254l-1.33-6.124 4.962-4.78c.642-.615.228-1.704-.658-1.732l-6.486-.21-2.618-6.22c-.347-.815-1.496-.813-1.84.003L8.486 7.83zm7.06 6.05l1.11 5.11-4.63-2.576L7.33 18.99l1.177-5.103-4.088-3.91 5.41-.18 2.19-5.216 2.19 5.216 5.395.18-4.06 3.903z"
                    data-reactid="24"
                  ></path>
                </svg>
                <span>
                  <span>Add to Portfolio</span>
                </span>
              </button>
            </div>
          </div>
          <div className="waring">
            <svg
              width="16"
              // style="fill:#ff7b12;stroke:#ff7b12;stroke-width:0;vertical-align:bottom;"
              height="16"
              viewBox="0 0 48 48"
              data-icon="attention"
              data-reactid="37"
            >
              <path
                d="M24.993 46.424c-12.13 0-22-9.87-22-22s9.87-22 22-22 22 9.87 22 22-9.87 22-22 22zm0-40c-9.925 0-18 8.075-18 18 0 9.926 8.075 18 18 18s18-8.074 18-18c0-9.924-8.075-18-18-18zM24.993 27.424c-1.104 0-2-.895-2-2v-10c0-1.104.896-2 2-2s2 .896 2 2v10c0 1.105-.895 2-2 2zM22.993 33.424a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"
                data-reactid="38"
              ></path>
            </svg>
            <span>
              Results were generated a few mins ago. Pricing data is
              updated frequently. Currency in USD
            </span>
          </div>
        </div>
        <div className="body-table">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="symbol">
                    <label>
                      <input type="checkbox" />
                      <svg
                        class="Va(m)! H(16px) W(16px) Stk($plusGray)! Fill($plusGray)!  Cur(p)"
                        width="16"
                        // style="fill:#000;stroke:#000;stroke-width:0;vertical-align:bottom;"
                        height="16"
                        viewBox="0 0 24 24"
                        data-icon="checkbox-unchecked"
                        data-reactid="48"
                      >
                        <path
                          d="M3 3h18v18H3V3zm19-2H2c-.553 0-1 .448-1 1v20c0 .552.447 1 1 1h20c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1z"
                          data-reactid="49"
                        ></path>
                      </svg>
                    </label>
                    Symbol
                    <div className="bar"></div>
                  </th>
                  <th className="name">Name</th>
                  <th className="price">Price (Intraday)</th>
                  <th className="change">Change</th>
                  <th className="ChangeP">% Change</th>
                  <th className="volume">Volume</th>
                  <th className="avg">Avg Vol (3 month)</th>
                  <th className="marketCap">Market Cap</th>
                  <th className="pe">PE Ratio (TTM)</th>
                  {/* <th className="wR">52 Week Range</th> */}
                </tr>
              </thead>
              <tbody>
                {Array(10)
                  .fill(true)
                  .map(() => (
                    <>
                      <tr className="even">
                        <td className="symbol">
                          <label>
                            <input type="checkbox" />
                            <svg
                              class="Va(m)! H(16px) W(16px) Stk($plusGray)! Fill($plusGray)!  Cur(p)"
                              width="16"
                              // style="fill:#000;stroke:#000;stroke-width:0;vertical-align:bottom;"
                              height="16"
                              viewBox="0 0 24 24"
                              data-icon="checkbox-unchecked"
                              data-reactid="48"
                            >
                              <path
                                d="M3 3h18v18H3V3zm19-2H2c-.553 0-1 .448-1 1v20c0 .552.447 1 1 1h20c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1z"
                                data-reactid="49"
                              ></path>
                            </svg>
                          </label>
                          <a
                            href="/quote/EVGRF?p=EVGRF"
                            title="China Evergrande New Energy Vehicle Group Limited"
                            class="Fw(600) C($linkColor)"
                          >
                            EVGRF
                          </a>
                          <div className="bar"></div>
                        </td>
                        <td className="name">
                          China Evergrande New Energy Vehicle Group
                          Limited
                        </td>
                        <td className="price">
                          <span>0.4300</span>
                        </td>
                        <td className="change">
                          <PriceChangeSC>+0.0800</PriceChangeSC>
                        </td>
                        <td className="change">
                          <PriceChangeSC>+0.0800</PriceChangeSC>
                        </td>
                        <td className="volume">
                          <span>44,309</span>
                        </td>
                        <td className="volume">
                          <span>44,309</span>
                        </td>
                        <td className="marketCop">
                          <span>44,309</span>
                        </td>
                        <td className="volume">
                          <span>44,309</span>
                        </td>
                      </tr>
                      <tr className="odd">
                        <td className="symbol">
                          <label>
                            <input type="checkbox" />
                            <svg
                              class="Va(m)! H(16px) W(16px) Stk($plusGray)! Fill($plusGray)!  Cur(p)"
                              width="16"
                              // style="fill:#000;stroke:#000;stroke-width:0;vertical-align:bottom;"
                              height="16"
                              viewBox="0 0 24 24"
                              data-icon="checkbox-unchecked"
                              data-reactid="48"
                            >
                              <path
                                d="M3 3h18v18H3V3zm19-2H2c-.553 0-1 .448-1 1v20c0 .552.447 1 1 1h20c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1z"
                                data-reactid="49"
                              ></path>
                            </svg>
                          </label>
                          <a
                            href="/quote/EVGRF?p=EVGRF"
                            title="China Evergrande New Energy Vehicle Group Limited"
                            class="Fw(600) C($linkColor)"
                          >
                            EVGRF
                          </a>
                          <div className="bar"></div>
                        </td>
                        <td className="name">
                          China Evergrande New Energy Vehicle Group
                          Limited
                        </td>
                        <td className="price">
                          <span>0.4300</span>
                        </td>
                        <td className="change">
                          <PriceChangeSC>+0.0800</PriceChangeSC>
                        </td>
                        <td className="change">
                          <PriceChangeSC>+0.0800</PriceChangeSC>
                        </td>
                        <td className="volume">
                          <span>44,309</span>
                        </td>
                        <td className="volume">
                          <span>44,309</span>
                        </td>
                        <td className="marketCop">
                          <span>44,309</span>
                        </td>
                        <td className="volume">
                          <span>44,309</span>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};
