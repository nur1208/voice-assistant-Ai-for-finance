import styled from "styled-components";

export const MainWrapper = styled.section`
  * {
    padding: 0;
    margin: 0;
  }
  text-align: left;

  text-align: left;

  padding-right: 20px;

  padding-left: 20px;

  max-width: 1260px;

  margin-right: auto;

  margin-left: auto;

  box-sizing: border-box;

  background-color: #fff;

  display: block;

  .fin-tab-items {
    width: 100%;

    white-space: nowrap;
    margin-bottom: 15px;
    line-height: 1.7;
    list-style-type: none;
    height: 44px;
    background-color: #f5f8fa;
    border-bottom-style: solid;
    border-bottom-color: #e0e4e9;
    zoom: 1;

    :after {
      clear: both;
    }
    :before,
    :after {
      content: " ";
      display: table;
    }
  }

  .fin-scr-res-table {
    position: relative;

    min-height: 265px;
  }

  .head-table {
    width: 100%;

    .title {
      font-size: 20px;
      line-height: 23px;
      font-weight: 700;
      display: inline;
      zoom: 1;
      display: inline-block;

      span.result {
        font-size: 18px;
        margin-left: 15px;
        font-weight: 500;
      }
    }

    .actions {
      margin-left: 30px;

      zoom: 1;
      display: inline-block;
      .addToP {
        position: relative;

        zoom: 1;
        display: inline-block;

        button {
          font-size: 13px;
          vertical-align: text-bottom;
          padding-bottom: 0;
          padding-top: 0;
          opacity: 0.5;
          filter: alpha(opacity=50);
          font-weight: 500;
          color: #5b636a !important;
          cursor: default;

          font-family: inherit;
          box-sizing: border-box;
          font: 16px "Helvetica Neue", Helvetica, Arial, sans-serif;
          line-height: normal;
          background-color: transparent;
          border-color: transparent;
          cursor: pointer;
          text-transform: none;
          overflow: visible;
          font: inherit;
          margin: 0;
          svg {
            fill: #787d82;
            stroke: #787d82;
            stroke-width: 0;
            vertical-align: bottom;
            width: 23px;
            vertical-align: middle !important;
            margin-right: 3px;
            height: 16px;
            cursor: pointer;
            cursor: auto !important;

            :not(:root) {
              overflow: hidden;
            }
          }
          span {
            vertical-align: middle;

            line-height: 14px;
            height: 16px;
            zoom: 1;
            display: inline-block;
          }
        }
      }
    }

    .waring {
      margin-left: 0;
      line-height: 26px;
      font-size: 12px;
      font-weight: 400;
      color: #5b636a;
      svg {
        fill: #ff7b12;
        stroke: #ff7b12;
        stroke-width: 0;
        vertical-align: bottom;
        stroke: #ff7b12;
        fill: #ff7b12 !important;
        width: 16px;
        vertical-align: middle !important;
        margin-bottom: 3px;
        margin-right: 5px;

        height: 16px;
        cursor: pointer;
        cursor: auto !important;
        :not(:root) {
          overflow: hidden;
        }
      }
      span {
        font-size: 16px;
      }
    }
  }

  .body-table {
    position: relative;

    .table-wrapper {
      width: 100%;

      overflow-y: hidden;

      overflow-x: auto;
      table {
        width: 100%;
        margin: 0;
        border-collapse: collapse;
        border-spacing: 0;
        thead {
          tr {
            color: #5b636a;

            border-bottom-color: #e0e4e9;
            border-right-width: 0;
            border-left-width: 0;
            border-top-width: 0;
            border-bottom-width: 1px;
            border-style: solid;

            th.symbol {
              z-index: 1;

              vertical-align: middle;
              text-align: left;
              text-align: left !important;
              position: -webkit-sticky;
              position: sticky;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-left: 6px;
              padding-right: 10px;
              left: 0;
              min-width: 90px;
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;

              label {
                vertical-align: text-bottom;
                text-align: center;
                position: relative;
                padding-right: 5px;

                input {
                  visibility: hidden;
                  position: absolute;
                  cursor: pointer;
                  vertical-align: middle;
                  box-sizing: border-box;
                  padding: 0;

                  background-color: #fff;
                  border: 1px solid #ccc;
                  box-sizing: border-box;
                  font: 16px "Helvetica Neue", Helvetica, Arial,
                    sans-serif;
                  display: inline-block;
                  vertical-align: middle;

                  overflow: visible;

                  font: inherit;
                  margin: 0;
                }

                svg {
                  fill: #000;
                  stroke: #000;
                  stroke-width: 0;
                  vertical-align: bottom;
                  stroke: #aeb6be !important;
                  fill: #aeb6be !important;
                  width: 16px;
                  vertical-align: middle !important;
                  height: 16px;
                  cursor: pointer;

                  :not(:root) {
                    overflow: hidden;
                  }
                }
              }
              .bar {
                width: 3px;
                position: absolute;
                pointer-events: none;
                padding-right: 5px;
                left: 100%;
                top: 0;
                height: 100%;
                background: linear-gradient(
                  90deg,
                  rgba(171, 181, 186, 0.3),
                  transparent
                );
              }
            }

            th.name {
              vertical-align: middle;
              text-align: left;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-right: 10px;
              padding-left: 10px;
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;
              /* padding: 0; */
            }
            th.price {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              /* padding-left: 20px; */
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;
            }
            th.change {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              /* padding-left: 20px; */
              padding-left: 20px;
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;
              /* padding: 0; */
            }
            th.ChangeP {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-left: 20px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              /* color: #232a31; */
              background-color: #fff;
              /* padding: 0; */
            }
            th.volume {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-left: 20px;
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;
              /* padding: 0; */
            }
            th.avg {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              /* padding-left: 10px; */
              padding-left: 10px;
              font-size: 14px;
              font-weight: 400 !important;
              background-color: #fff;
              /* padding: 0; */
            }
            th.marketCap {
              width: 120px;
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-left: 20px;
              padding-right: 10px;
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;
              /* padding: 0; */
            }

            th.pe {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-left: 20px;
              font-size: 14px;
              font-weight: 400 !important;
              cursor: pointer;
              background-color: #fff;
              /* padding: 0; */
            }

            th.wR {
              vertical-align: middle;
              text-align: right;
              padding-bottom: 5px !important;
              padding-top: 5px !important;
              padding-right: 6px;
              padding-left: 20px;
              font-size: 14px;
              font-weight: 400 !important;
              background-color: #fff;
              /* padding: 0; */
            }
          }
        }
      }
      tbody {
        tr.even {
          height: 32px;
          background-color: #fff;
          border-bottom-color: #e0e4e9;
          border-right-width: 0;
          border-left-width: 0;
          border-top-width: 0;
          border-bottom-width: 1px;
          border-style: solid;
        }

        tr.odd {
          height: 32px;
          background-color: #f0f3f5;
          border-bottom-color: #e0e4e9;
          border-right-width: 0;
          border-left-width: 0;
          border-top-width: 0;
          border-bottom-width: 1px;
          border-style: solid;
          td.symbol {
            background-color: #f0f3f5 !important;
          }
        }

        td.symbol {
          font-size: 13px;
          z-index: 1;
          vertical-align: middle;
          text-align: left;
          text-align: left !important;
          position: -webkit-sticky;
          position: sticky;
          padding-left: 6px;
          padding-right: 10px;
          left: 0;
          min-width: 90px;
          font-size: 13px;
          background-color: #fff;
          /* padding: 0; */
          label {
            vertical-align: text-bottom;
            text-align: center;
            position: relative;
            padding-right: 5px;

            input {
              visibility: hidden;
              position: absolute;
              cursor: pointer;
              vertical-align: middle;
              box-sizing: border-box;
              padding: 0;

              background-color: #fff;
              border: 1px solid #ccc;
              box-sizing: border-box;
              font: 16px "Helvetica Neue", Helvetica, Arial,
                sans-serif;
              display: inline-block;
              vertical-align: middle;

              overflow: visible;

              font: inherit;
              margin: 0;
            }

            svg {
              fill: #000;
              stroke: #000;
              stroke-width: 0;
              vertical-align: bottom;
              stroke: #aeb6be !important;
              fill: #aeb6be !important;
              width: 16px;
              vertical-align: middle !important;
              height: 16px;
              cursor: pointer;

              :not(:root) {
                overflow: hidden;
              }
            }
          }
          a {
            font-weight: 600;
            color: #0f69ff;
            text-decoration: none;
          }
          .bar {
            width: 3px;
            position: absolute;
            pointer-events: none;
            padding-right: 5px;
            left: 100%;
            top: 0;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(171, 181, 186, 0.3),
              transparent
            );

            display: block;
            font-size: 13px;
            text-align: left !important;
          }
        }

        td.name {
          font-size: 13px;
          vertical-align: middle;
          text-align: left;
          padding-right: 10px;
          padding-left: 10px;
          font-size: 13px;
          /* padding: 0; */
        }
        td.price {
          font-size: 13px;
          vertical-align: middle;
          text-align: right;
          padding-left: 20px;

          font-weight: 600;
          padding: 0;
        }

        td.change {
          font-size: 13px;
          vertical-align: middle;
          text-align: right;
          padding-left: 20px;
          font-weight: 600;
          padding: 0;
        }

        td.changeP {
          font-size: 13px;
          vertical-align: middle;
          text-align: right;
          padding-left: 20px;
          font-weight: 600;
          padding: 0;
        }

        td.volume {
          font-size: 13px;
          vertical-align: middle;
          text-align: right;
          padding-left: 20px;
          /* font-size: 13px; */
          padding: 0;
        }

        td.marketCop {
          font-size: 13px;
          width: 120px;
          vertical-align: middle;
          text-align: right;

          padding-left: 20px;
          padding-right: 10px;
          /* padding: 0; */
        }
      }
    }
  }
`;

export const PriceChangeSC = styled.span`
  color: #00873c;
`;

export const IbBox = styled.li`
  height: 44px;
  font-weight: 500;
  vertical-align: top;
  *display: inline;
  zoom: 1;
  display: inline-block;
  :hover {
    background-color: #e0f0ff !important;
  }

  a {
    text-decoration: none;

    text-align: center;
    padding-right: 20px !important;

    padding-right: 12px;

    padding-left: 12px;
    line-height: 44px;
    display: block;
    color: #5b636a;
    color: #0f69ff;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #e0e4e9;
    font-weight: 700 !important;
    color: #232a31 !important;
    ${({ isActive }) =>
      isActive ? `border-bottom-color: #0f69ff !important;` : ""}
  }
`;
