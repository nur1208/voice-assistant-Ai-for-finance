import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import { Wrapper } from "./InputModalSC";
import { WaitForUserInputContext } from "../../../App";

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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InputModal({ handleClose }) {
  const classes = useStyles();
  // const refTF = useRef(null);
  const [userInput, setUserInput] = useState("");
  // useEffect(() => {
  //   refTF.current.focus();
  // }, []);

  const { setIsWaitingUserDone } = useContext(
    WaitForUserInputContext
  );

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key

    if (e.key === "Enter") {
      console.log({ userInput });
      handleClose();
      setIsWaitingUserDone(true);
    }
  };

  return (
    <Box sx={style}>
      <Wrapper
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          helperText="click enter to submit"
          autoFocus={true}
          style={{ width: 350 }}
          id="filled-basic"
          onKeyPress={handleKeypress}
          label="Filled"
          variant="filled"
          // inputRef={refTF}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </Wrapper>
    </Box>
  );
}
