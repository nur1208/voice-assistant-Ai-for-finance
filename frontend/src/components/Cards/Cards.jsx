import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";

import useStyles from "./../NewsCards/styles";

const Cards = ({ CardsData }) => {
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
        {CardsData &&
          CardsData.map((data) => (
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
                style={{ backgroundColor: data.color }}
              >
                <Typography variant="h6" component="h5">
                  {data.title}
                </Typography>
                {data.info ? (
                  <Typography variant="p">
                    <strong>{data.title.split(" ")[2]}</strong>
                    : <br />
                    {data.info}
                  </Typography>
                ) : null}
                <Typography variant="p">
                  Try saying: <br /> <i>{data.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
export default Cards;
