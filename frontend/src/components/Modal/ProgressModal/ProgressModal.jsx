import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { Wrapper } from "../InputModal/InputModalSC";
import { ProgressModalItem } from "./ProgressModalItem";
import { useSelector } from "react-redux";
// import { Wrapper } from "./InputModalSC";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 170,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ProgressModal = () => {
  const classes = useStyles();
  // const refTF = useRef(null);

  const { progressData } = useSelector(
    (state) => state.trading_store
  );

  return (
    <Box sx={style}>
      <Wrapper
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid direction="row" container>
          {Object.keys(progressData).map((key) => (
            <ProgressModalItem
              title={key}
              status={progressData[key]}
            />
          ))}
        </Grid>
      </Wrapper>
    </Box>
  );
};
