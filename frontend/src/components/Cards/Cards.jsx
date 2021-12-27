import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";

import useStyles from "./../NewsCards/styles";

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

const Cards = () => {
  const classes = useStyles();

  return (
    // <Grow in>
    <>
      <Grid
        className={classes.container}
        container
        // alignItems="stretch"
        spacing={3}
        // justifyContent="space-between"
      >
        {infoCards.map((infoCard) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className={classes.infoCard}
          >
            <div
              className={classes.card}
              style={{ backgroundColor: infoCard.color }}
            >
              <Typography variant="h6" component="h5">
                {infoCard.title}
              </Typography>
              {infoCard.info ? (
                <Typography variant="p">
                  <strong>{infoCard.title.split(" ")[2]}</strong>:{" "}
                  <br />
                  {infoCard.info}
                </Typography>
              ) : null}
              <Typography variant="p">
                Try saying: <br /> <i>{infoCard.text}</i>
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Cards;
