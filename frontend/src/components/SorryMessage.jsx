import React from "react";
import { NoBrowserSupportWrapper } from "./NoBrowserSupport/NoBrowserSupportSC";

export const SorryMessage = ({ mainMessage, subMessage }) => {
  return (
    <NoBrowserSupportWrapper>
      {" "}
      <span>Sorry</span>{" "}
      <span className="red"> , {mainMessage} </span> ,{" "}
      {subMessage}{" "}
    </NoBrowserSupportWrapper>
  );
};
