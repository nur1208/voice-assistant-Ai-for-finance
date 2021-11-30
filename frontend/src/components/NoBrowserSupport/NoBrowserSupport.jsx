import React from "react";
import { NoBrowserSupportWrapper } from "./NoBrowserSupportSC";

export const NoBrowserSupport = () => {
  return (
    <NoBrowserSupportWrapper>
      <span>Sorry</span>
      <span className="red">
        , finansis dons't work in this browser
      </span>
      , try it with Google Chrome
    </NoBrowserSupportWrapper>
  );
};
