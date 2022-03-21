import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import MenuItem from '@material-ui/core/MenuItem';
import { Box, Input, MenuItem, Select } from "@material-ui/core";
import { Wrapper } from "./InputModalSC";
import { WaitForUserInputContext } from "../../../App";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { useSaveTestedData } from "../../Simulator/utils/useSaveTestedData";
import { BTfields } from "../../finanbroBtn/hooks/useTradingCommendsHandler";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { SIGN_UP_FIELDS } from "../../finanbroBtn/hooks/useSignUpFields";
import { isValidEmail } from "../../../utils/isValidEmail";
import { LOGIN_FIELDS } from "../../finanbroBtn/hooks/useLoginFields";
import { UPDATE_USER_INFO_FIELDS } from "../../finanbroBtn/hooks/useUpdateFields";
import { FORGET_PASS_FIELDS } from "../../finanbroBtn/hooks/useForgetPassFields";

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
  // label: { stateName, view },
  label: labelProps,
}) {
  const classes = useStyles();
  // const refTF = useRef(null);
  const [userInput, setUserInput] = useState("");

  const {
    updateBTState,
    updateModal,
    setUserInput: setUserInputRedux,
  } = useReduxActions();
  const { setIsWaitingUserDone } = useContext(
    WaitForUserInputContext
  );

  const [currentLocalStorage, { updateLocalStorage }] =
    useSaveTestedData();

  const [accountRisk, setAccountRisk] = useLocalStorage(
    "accountRisk",
    1
  );

  const {
    modal_store: {
      isReduxState,
      label,
      stateName,
      selectOptions,
      userInputs,
      extraHelperText,
      confirmPasswordCounter,
    },
    user_store: { userData },
  } = useSelector((state) => state);

  // set default value for update fields
  useEffect(() => {
    if (stateName === UPDATE_USER_INFO_FIELDS.NAME.stateName) {
      setUserInput(userData.name);
    } else if (
      stateName === UPDATE_USER_INFO_FIELDS.GENDER.stateName
    ) {
      setUserInput(userData.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateName]);

  const isValidInput = () => {
    if (!userInput.length) {
      // console.log(`${label} is required field`);
      updateModal({
        invalidMessage: `${label} is required field, please ${
          selectOptions ? "select" : "enter"
        } it`,
      });

      return false;
    }

    if (
      (stateName === SIGN_UP_FIELDS.NAME.stateName ||
        stateName === UPDATE_USER_INFO_FIELDS.NAME.stateName ||
        stateName ===
          UPDATE_USER_INFO_FIELDS.PASSWORD.stateName ||
        stateName ===
          UPDATE_USER_INFO_FIELDS.NEW_PASSWORD.stateName ||
        stateName === SIGN_UP_FIELDS.PASSWORD.stateName ||
        stateName === FORGET_PASS_FIELDS.PASSWORD.stateName ||
        stateName === LOGIN_FIELDS.PASSWORD.stateName) &&
      userInput.length > 15
    ) {
      updateModal({
        invalidMessage: `${label} must be less than 15 letters, please enter a shorter ${label}`,
      });

      return false;
    }
    // checkForEmail
    if (
      (stateName === SIGN_UP_FIELDS.EMAIL.stateName ||
        stateName === FORGET_PASS_FIELDS.EMAIL.stateName ||
        stateName === LOGIN_FIELDS.EMAIL.stateName) &&
      !isValidEmail(userInput)
    ) {
      updateModal({
        invalidMessage: `${label} is invalid, please enter a valid ${label}`,
      });

      return false;
    }

    if (
      (stateName === SIGN_UP_FIELDS.PASSWORD.stateName ||
        stateName === FORGET_PASS_FIELDS.PASSWORD.stateName ||
        stateName ===
          UPDATE_USER_INFO_FIELDS.PASSWORD.stateName ||
        stateName ===
          UPDATE_USER_INFO_FIELDS.NEW_PASSWORD.stateName ||
        stateName === LOGIN_FIELDS.PASSWORD.stateName) &&
      userInput.length < 8
    ) {
      updateModal({
        invalidMessage: `${label} must be more than 7 letters, please enter a longer ${label}`,
      });

      return false;
    }
    // userInputs
    if (
      (stateName === SIGN_UP_FIELDS.PASSWORD_CONFIRM.stateName &&
        userInputs.password !== userInput) ||
      (stateName ===
        FORGET_PASS_FIELDS.CONFIRM_PASSWORD.stateName &&
        userInputs.passwordReset !== userInput) ||
      (stateName ===
        UPDATE_USER_INFO_FIELDS.CONFIRM_PASSWORD.stateName &&
        userInputs.passwordNewUpdate !== userInput)
    ) {
      updateModal({
        invalidMessage: `${label} must be equal to password, please enter a correct ${label}`,
        confirmPasswordCounter: confirmPasswordCounter + 1,
      });

      return false;
    }

    const genderOptions = ["male", "female"];
    if (
      (stateName === SIGN_UP_FIELDS.GENDER.stateName ||
        stateName ===
          UPDATE_USER_INFO_FIELDS.GENDER.stateName) &&
      !genderOptions.includes(userInput.toLocaleLowerCase())
    ) {
      updateModal({
        invalidMessage: `${label} must be male or female, please select a correct ${label}`,
      });

      setUserInput("");
      return false;
    }
    return true;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && selectOptions) {
      e.preventDefault();
      setUserInput("");
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key

    if (selectOptions) e.preventDefault();

    if (e.key === "Enter") {
      if (!isValidInput()) return;

      console.log({ userInput });
      handleClose();
      if (isReduxState) {
        updateModal({ finishInputtingFor: stateName });
        const newUserInput = {};
        newUserInput[stateName] = userInput;
        setUserInputRedux(newUserInput);
      } else {
        setIsWaitingUserDone(labelProps.stateName);
        const newState = {};
        if (labelProps.stateName.includes("Date"))
          newState[labelProps.stateName] = new Date(userInput);
        else {
          newState[labelProps.stateName] = Number(userInput);
          if (
            labelProps.stateName ===
            BTfields.ACCOUNT_RISK.label.stateName
          )
            setAccountRisk(Number(userInput));
        }
        // updateLocalStorage({ ...currentLocalStorage, newState });
        updateBTState(newState);
      }
    }
    // eslint-disable-next-line no-unused-expressions
  };

  return (
    <Box sx={style}>
      <Wrapper
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          helperText={`${
            extraHelperText ? extraHelperText : ""
          }click enter to submit`}
          autoFocus={true}
          style={{ width: 350 }}
          id="filled-basic"
          onKeyPress={handleKeypress}
          onKeyDown={handleKeyDown}
          label={label || labelProps.view}
          variant="filled"
          // inputRef={refTF}
          // disabled={userInput && selectOptions}
          select={!userInput && selectOptions}
          value={userInput}
          type={
            stateName?.includes("password")
              ? "password"
              : stateName?.includes("email")
              ? "email"
              : "text"
          }
          onChange={(e) => setUserInput(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {selectOptions &&
            selectOptions.map((option, index) => (
              <MenuItem value={option} key={`id-${index}`}>
                {option}
              </MenuItem>
            ))}
        </TextField>

        {/* <Select
          // labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          autoFocus={true}
          onKeyPress={handleKeypress}
          label={label || labelProps.view}
          style={{ width: 250 }}
          // id="filled-basic"
          placeholder="select your gender"
          helperText="click enter to submit"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
        </Select> */}
      </Wrapper>
    </Box>
  );
}
