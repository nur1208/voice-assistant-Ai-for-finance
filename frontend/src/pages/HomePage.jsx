import React, { useState } from "react";
import useStyles from "./../styles";
import { Modal, Typography } from "@material-ui/core";
import NewsCards from "../components/NewsCards/NewsCards";
import Cards from "../components/Cards/Cards";

export const HomePage = ({ activeArticle, newsArticles }) => {
  const trySayings = ["Open article number [4]", "Go back"];
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

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

      <Cards />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
