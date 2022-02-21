import React from "react";
import { Icon1 } from "../Icon1";

export const TextOverLine = ({ title }) => {
  return (
    <div className="text-overline">
      {title}
      <button className="v-icon notranslate ml-1 v-icon--link theme--light primary--text small pLeft">
        {/* <Icon1 /> */}
      </button>
    </div>
  );
};
