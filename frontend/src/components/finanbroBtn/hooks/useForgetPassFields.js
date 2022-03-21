import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { sleep } from "../../../utils/sleep";
import { MODAL_TYPE_OPTIONS } from "../../Modal/BasicModal/BasicModalUtils";
import { useHandleUserInput } from "./useHandleUserInput";

export const FORGET_PASS_FIELDS = {
  EMAIL: {
    label: "EMAIL",
    stateName: "emailForgetPass",
    message: "enter your email to send you, a reset token",
  },
  PASSWORD: {
    label: "New Password",
    stateName: "passwordReset",
    message: "enter your new password",
  },
  CONFIRM_PASSWORD: {
    label: "Confirm Password",
    stateName: "passwordConfirmReset",
    message: "OKAY, enter your confirm password",
  },
};

export const useForgetPass = (response, getUserInputHandler) => {
  const {
    setUserInput,
    forgetPass,
    updateModal,
    resetPassword,
  } = useReduxActions();

  const { userInputs } = useSelector(
    (state) => state.modal_store
  );

  const history = useHistory();
  useHandleUserInput(
    FORGET_PASS_FIELDS.EMAIL.stateName,
    {},
    async () => {
      forgetPass(userInputs.emailForgetPass, response);
      setUserInput({ emailForgetPass: "" });
    }
  );

  useHandleUserInput(
    FORGET_PASS_FIELDS.PASSWORD.stateName,
    {},
    async () => {
      // response("OKAY, enter confirm password");
      getUserInputHandler(
        FORGET_PASS_FIELDS.CONFIRM_PASSWORD.label,
        FORGET_PASS_FIELDS.CONFIRM_PASSWORD.stateName,
        FORGET_PASS_FIELDS.CONFIRM_PASSWORD.message
      );
    }
  );

  useHandleUserInput(
    FORGET_PASS_FIELDS.CONFIRM_PASSWORD.stateName,
    {},
    async () => {
      response("give me a second to validate your token");
      updateModal({
        type: MODAL_TYPE_OPTIONS.TEXT_WITH_ICON,
        isReduxState: true,
        open: true,
        text: "give me a second to validate your token",
        // text: "token",
        // extraHelperText: "type your new password, then ",
      });

      resetPassword(
        {
          password: userInputs.passwordReset,
          token: userInputs.token,
        },
        response
      );

      setUserInput({
        passwordReset: "",
        passwordConfirmReset: "",
      });

      history.push("/");
    }
  );
};
