import {
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  Check,
  Brightness1,
  ErrorOutline,
} from "@material-ui/icons";
import {
  ERROR_BASE,
  PRIMARY_BASE,
  SUCCESS_BASE,
} from "../../Simulator/SimulatorSC";
const iconStyle = { width: "20px", height: "20px" };
const renderIcon = (status) => {
  switch (status) {
    case "success":
      return (
        <Check style={{ ...iconStyle, color: SUCCESS_BASE }} />
      );

    case "fall":
      return (
        <ErrorOutline
          style={{ ...iconStyle, color: ERROR_BASE }}
        />
      );
    case "loading":
      return (
        <CircularProgress
          style={{ ...iconStyle, color: PRIMARY_BASE }}
        />
      );
    default:
      return (
        <Brightness1
          style={{ ...iconStyle, color: PRIMARY_BASE }}
        />
      );
  }
};

export const ProgressModalItem = ({ title, status }) => {
  return (
    <Grid item container spacing={6}>
      <Grid item xs={6}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={6}>
        {renderIcon(status)}
      </Grid>
      {/* <CircularProgress
        style={{ ...iconStyle, color: PRIMARY_BASE }}
      /> */}
      {/* <Check style={{ ...iconStyle, color: SUCCESS_BASE }} /> */}
      {/* <Brightness1
        style={{ ...iconStyle, color: PRIMARY_BASE }}
      /> */}
      {/* <ErrorOutline
        style={{ ...iconStyle, color: ERROR_BASE }}
      /> */}
    </Grid>
  );
};
