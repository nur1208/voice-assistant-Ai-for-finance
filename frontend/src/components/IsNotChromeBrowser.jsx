import React from "react";
import { NoBrowserSupportWrapper } from "./NoBrowserSupport/NoBrowserSupportSC";
export const IsNotChromeBrowser = () => {
  return (
    <NoBrowserSupportWrapper>
      {" "}
      <span>Sorry</span>{" "}
      <span className="red">
        {" "}
        , finansis only work in chrome browser{" "}
      </span>{" "}
      , please use chrome.{" "}
    </NoBrowserSupportWrapper>
  );
};
