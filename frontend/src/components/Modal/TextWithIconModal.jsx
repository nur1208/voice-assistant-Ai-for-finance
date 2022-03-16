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
import { useSelector } from "react-redux";
import { Wrapper } from "./InputModal/InputModalSC";
import { PRIMARY_BASE } from "../Simulator/SimulatorSC";
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
const iconStyle = { width: "35px", height: "35px" };

export const TextWithIconModal = () => {
  const classes = useStyles();
  // const refTF = useRef(null);

  const { text } = useSelector((state) => state.modal_store);

  console.log({ text, length: text.length * 10 });
  return (
    <Box
      sx={{
        ...style,
        width: text.length >= 5 ? text.length * 8 : 50,
      }}
    >
      {/* <Wrapper
        className={classes.root}
        noValidate
        autoComplete="off"
      > */}
      <Grid
        direction="column"
        container
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography>{text}</Typography>{" "}
        </Grid>
        <Grid item>
          <CircularProgress
            style={{
              ...iconStyle,
              color: PRIMARY_BASE,
            }}
          />
        </Grid>
      </Grid>
      {/* </Wrapper> */}
    </Box>
  );
};
