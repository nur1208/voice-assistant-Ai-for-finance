import React from "react";
import CurrencyFormat from "react-currency-format";

export const DateInputFormat = () => {
  return (
    <CurrencyFormat
      format="####-##-##"
      placeholder="YYYY-MM-DD"
      mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
    />
  );
};
