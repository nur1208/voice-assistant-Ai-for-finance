import React, { useState } from "react";
import useStyles from "./../styles";

import Cards from "../components/Cards/Cards";

export const HomePage = ({ activeArticle, newsArticles }) => {
  const trySayings = ["Open article number [4]", "Go back"];
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const infoCards = [
    {
      color: "#00838f",
      title: "News section",
      text: "Give me the latest news",
    },
    {
      color: "#1565c0",
      title: "Stocks info section",
      // info: "Business, Entertainment, General, Health, Science, Sports, Technology",
      text: "what is the current price for Apple stock",
    },
    {
      color: "#4527a0",
      title: "Trading Section",
      // info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
      text: "can you trade for me",
    },
    //   {
    //     color: "#283593",
    //     title: "News by Sources",
    //     info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    //     text: "Give me the news from CNN",
    //   },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.logoContainer}>
        <h1>Home Page</h1>
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
