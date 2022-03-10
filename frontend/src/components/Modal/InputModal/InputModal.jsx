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
import { useReduxActions } from "../../../hooks/useReduxActions";
import { useSaveTestedData } from "../../Simulator/utils/useSaveTestedData";
import { BTfields } from "../../finanbroBtn/hooks/useTradingCommendsHandler";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

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

export default function InputModal({
  handleClose,
  label: { stateName, view },
}) {
  const classes = useStyles();
  // const refTF = useRef(null);
  const [userInput, setUserInput] = useState("");
  // useEffect(() => {
  //   refTF.current.focus();
  // }, []);

  const { updateBTState } = useReduxActions();
  const { setIsWaitingUserDone } = useContext(
    WaitForUserInputContext
  );

  const [currentLocalStorage, { updateLocalStorage }] =
    useSaveTestedData();

  const [accountRisk, setAccountRisk] = useLocalStorage(
    "accountRisk",
    1
  );

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key

    if (e.key === "Enter") {
      console.log({ userInput });
      handleClose();
      setIsWaitingUserDone(stateName);
      const newState = {};
      if (stateName.includes("Date"))
        newState[stateName] = new Date(userInput);
      else {
        newState[stateName] = Number(userInput);
        if (stateName === BTfields.ACCOUNT_RISK.label.stateName)
          setAccountRisk(Number(userInput));
      }
      // updateLocalStorage({ ...currentLocalStorage, newState });
      updateBTState(newState);
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
          label={view}
          variant="filled"
          // inputRef={refTF}
          onChange={(e) => setUserInput(e.target.value)}
        >
          soemting
        </TextField>
      </Wrapper>
    </Box>
  );
}
