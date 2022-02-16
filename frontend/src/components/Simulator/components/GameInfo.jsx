import React from "react";
import { ArrowDownIcon } from "./ArrowDownIcon";

export const GameInfo = () => {
  return (
    <>
      <div className="text-overline white--text">Game Info</div>
      <div className="v-card v-sheet theme--light elevation-0 rounded-0 game-info pb-5">
        <div className="v-card__text text--text text-body-1 text--text text-body-1">
          <div className="overline">Current Rank</div>
          <div className="d-flex align-end mb-2">
            <div className="text-h4">88,763 </div>
            <span>
              <ArrowDownIcon />
            </span>
            <span className="ml-2">of 213,358 Players</span>
          </div>
          <div>
            <span className="overline">Top Player</span>
            <div data-v-67bfb397="">
              <span data-v-67bfb397="" class="top-player mr-2">
                huangcharles
              </span>{" "}
              <span data-v-67bfb397="" class="top-player-value">
                $1,280,730,768,687,300.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
