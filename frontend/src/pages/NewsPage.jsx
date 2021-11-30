import React, { useState } from "react";
import useStyles from "./../styles";
import { Modal, Typography } from "@material-ui/core";
import NewsCards from "../components/NewsCards/NewsCards";

export const NewsPage = ({ activeArticle, newsArticles }) => {
  const trySayings = ["Open article number [4]", "Go back"];
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            {trySayings.map((title) => (
              <div className={classes.card}>
                <Typography variant="h5" component="h2">
                  Try saying: <br />
                  <br />
                  {title}
                </Typography>
              </div>
            ))}
          </div>
        ) : null}
        <img
          src="./images/logo.png"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>

      <NewsCards
        articles={newsArticles}
        activeArticle={activeArticle}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
