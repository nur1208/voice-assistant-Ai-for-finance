import React from "react";
import { iconSizeOptions } from "../SimulatorUtils";

export const HorizontalLineIcon = ({ size }) => {
  return (
    <span
      data-v-08f29e58=""
      aria-hidden="true"
      class="v-icon notranslate text--disabled theme--light"
    >
      <svg
        // xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        class="v-icon__svg"
        style={iconSizeOptions(size)}
      >
        <path d="M19,13H5V11H19V13Z"></path>
      </svg>
    </span>
  );
};
