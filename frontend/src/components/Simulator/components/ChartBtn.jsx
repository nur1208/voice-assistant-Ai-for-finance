import React from "react";

export const ChartBtn = ({ title, isActive }) => {
  return (
    <button
      className={`text-button text-primary v-btn ${
        isActive ? "v-item--active v-btn--active" : ""
      }  white-border v-btn--text theme--light v-size--default`}
      style={{
        minWidth: "20%",
        borderColor: " #fff !important",
      }}
    >
      <span className="v-btn__content">{title}</span>
    </button>
  );
};
