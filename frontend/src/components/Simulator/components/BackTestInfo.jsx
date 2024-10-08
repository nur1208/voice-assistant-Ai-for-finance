import React from "react";
import { useSelector } from "react-redux";
import {
  customDateFormat,
  days,
  renderDay,
} from "../SimulatorUtils";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { TextOverLine } from "./TextOverLine";

export const BackTestInfo = () => {
  const { currentDate, wins, losses, soldStocks, countDays } =
    useSelector(({ back_testing }) => back_testing);

  return (
    <>
      <div className="text-overline white--text">
        Back Test Info
      </div>
      <div className="v-card v-sheet theme--light elevation-0 rounded-0 game-info pb-5">
        <div className="v-card__text text--text text-body-1 text--text text-body-1">
          <div className="overline">Current Date</div>
          <div className="d-flex align-end mb-2">
            <div className="text-h4">
              {`${customDateFormat(new Date(currentDate))} ${
                days[new Date(currentDate).getDay()]
              }`}{" "}
              <span className="out_of">
                {countDays} {renderDay(countDays)}
              </span>
            </div>

            {/* <span className="ml-2">of 213,358 Players</span> */}
          </div>
          <div className="row">
            <div className="col">
              <TextOverLine title="Wins" />
              <div className="buying-power text-h5 success--text">
                {wins}{" "}
                <span className="out_of">
                  out of {soldStocks.length}
                </span>
              </div>
            </div>
            <div className="col">
              <TextOverLine title="Losses" />
              <div className="cash text-h5 error--text">
                {losses}{" "}
                <span className="out_of">
                  out of {soldStocks.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
