import React from "react";
import { ArrowDownIcon } from "./ArrowDownIcon";
import { TextOverLine } from "./TextOverLine";

export const GameInfo = () => {
  return (
    <>
      <div className="text-overline white--text">Game Info</div>
      <div className="v-card v-sheet theme--light elevation-0 rounded-0 game-info pb-5">
        <div className="v-card__text text--text text-body-1 text--text text-body-1">
          <div className="overline">Current Date</div>
          <div className="d-flex align-end mb-2">
            <div className="text-h4">2010-10-1 Monday</div>
            {/* <span>
              <ArrowDownIcon />
            </span> */}
            {/* <span className="ml-2">of 213,358 Players</span> */}
          </div>
          <div className="row">
            <div className="col">
              <TextOverLine title="Wins" />
              <div className="buying-power text-h5 success--text">
                10
              </div>
            </div>
            <div className="col">
              <TextOverLine title="Losses" />
              <div className="cash text-h5 error--text">5</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
