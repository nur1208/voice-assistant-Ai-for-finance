import React from "react";
import { NoBrowserSupportWrapper } from "./NoBrowserSupport/NoBrowserSupportSC";

export const Offline = () => {
  return (
    <NoBrowserSupportWrapper>
      <span>Sorry</span>
      <span className="red">
        , finansis dons't work without internet connection
      </span>
      , Check your internet connection.
    </NoBrowserSupportWrapper>
  );
};
