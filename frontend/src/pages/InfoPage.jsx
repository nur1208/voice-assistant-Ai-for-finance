import React from "react";
import Cards from "../components/Cards/Cards";
import BasicModal from "../components/Modal";
import useStyles from "./../styles";

export const InfoPage = () => {
  const classes = useStyles();
  const infoCards = [
    {
      color: "#00838f",
      title: "The Most Stocks",
      text: "Give The most active stocks",
    },
    {
      color: "#1565c0",
      title: "Stock info",
      // info: "Business, Entertainment, General, Health, Science, Sports, Technology",
      text: "Give me apple statistics",
    },
    {
      color: "#4527a0",
      title: "What Is?",
      // info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
      text: "what is Price to earing ration?",
    },
    {
      color: "#283593",
      title: "Chars",
      // info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
      text: "Show me apple and Tesla charts",
    },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.logoContainer}>
        <h1>Info Page</h1>
        <img
          src="./images/logo.png"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>

      <Cards infoCards={infoCards} />
      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
};
