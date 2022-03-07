import React from "react";
import { NoBrowserSupportWrapper } from "./NoBrowserSupport/NoBrowserSupportSC";

export const NotWorkingInChina = () => {
  return (
    <NoBrowserSupportWrapper>
      <span>Sorry</span>
      <span className="red">
        , finansis dons't work in china
      </span>
      , please use VPN.
    </NoBrowserSupportWrapper>
  );
};
