import React from "react";
import { iconSizeOptions } from "../SimulatorUtils";

export const ArrowDownIcon = ({ size }) => {
  return (
    <span className="v-icon notranslate theme--light error--text">
      <svg
        // xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        class="v-icon__svg"
        style={iconSizeOptions(size)}
      >
        <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"></path>
      </svg>
    </span>
  );
};
