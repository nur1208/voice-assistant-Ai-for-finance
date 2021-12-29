import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";

import useStyles from "./../NewsCards/styles";

const Cards = ({ infoCards }) => {
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
