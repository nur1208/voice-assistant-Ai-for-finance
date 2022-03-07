import React from "react";
import Cards from "../components/Cards/Cards";
// import BasicModal from "../components/Modal";
import useStyles from "./../styles";

export const TradingPage = () => {
  const classes = useStyles();
  const infoCards = [
    {
      color: "#00838f",
      title: "Trade Stocks",
      text: "Trade Stocks for me",
    },
    {
      color: "#1565c0",
      title: "Back Testing The Strategy",
      // info: "Business, Entertainment, General, Health, Science, Sports, Technology",
      text: "Start Back Testing",
    },
    {
      color: "#4527a0",
      title: "Buy Stocks",
      // info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
      text: "Buy Stocks",
    },
    {
      color: "#283593",
      title: "Sell stocks",
      // info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
      text: "Sell Stocks",
    },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.logoContainer}>
        <h1>Trading Page</h1>
        <img
          src="./images/logo.png"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>

      <Cards CardsData={infoCards} />
      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
};
