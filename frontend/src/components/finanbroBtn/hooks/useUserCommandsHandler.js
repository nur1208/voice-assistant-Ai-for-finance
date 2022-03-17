import { sleep } from "../../../utils/sleep";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { MODAL_TYPE_OPTIONS } from "../../Modal/BasicModal/BasicModalUtils";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  SIGN_UP_FIELDS,
  useSignUpFields,
} from "./useSignUpFields";
import { LOGIN_FIELDS, useLoginFields } from "./useLoginFields";
import {
  UPDATE_USER_INFO_FIELDS,
  useUpdateFields,
} from "./useUpdateFields";
import {
  FORGET_PASS_FIELDS,
  useForgetPass,
} from "./useForgetPassFields";
import { secondCommandOptions } from "./useResponse";
export const useUserCommandsHandler = (
  response,
  handleOpenModal,
  setSecondCommandFor
) => {
  const {
    updateModal,
    logout: logoutRedux,
    updateSecondCommand,
  } = useReduxActions();
  const {
    modal_store: { invalidMessage },
    user_store: { userData },
  } = useSelector((state) => state);

  const getUserInputHandler = async (
    label,
    stateName,
    message,
    selectOptions
  ) => {
    response(message);
    await sleep(1000);
    updateModal({
      type: MODAL_TYPE_OPTIONS.INPUT,
      isReduxState: true,
      label,
      stateName,
      selectOptions,
    });
    handleOpenModal();
  };

  const signUp = async (isIgnore) => {
    if (isIgnore || !userData) {
      await getUserInputHandler(
        SIGN_UP_FIELDS.NAME.label,
        SIGN_UP_FIELDS.NAME.stateName,
        SIGN_UP_FIELDS.NAME.message
      );
    } else {
      response("you are logged in");
      response("do you want to logout and create a new account");
      handleAlreadyLoggedIn(
        signUp,
        "signup",
        secondCommandOptions.signupAgain
      );
    }
  };

  useSignUpFields(response, getUserInputHandler);

  const login = async (isIgnore) => {
    if (isIgnore || !userData) {
      await getUserInputHandler(
        LOGIN_FIELDS.EMAIL.label,
        LOGIN_FIELDS.EMAIL.stateName,
        LOGIN_FIELDS.EMAIL.message
      );
    } else {
      response("you are logged in");
      response(
        "do you want to logout and login with different account"
      );
      handleAlreadyLoggedIn(
        login,
        "login",
        secondCommandOptions.loginAgain
      );
    }
  };

  const handleAlreadyLoggedIn = (callback, action, type) => {
    updateSecondCommand({
      type,
      other: { callback, action },
    });
    setSecondCommandFor({
      type,
      other: { callback, action },
    });
  };

  useLoginFields(response, getUserInputHandler);

  const updateUserInfo = async () => {
    await getUserInputHandler(
      UPDATE_USER_INFO_FIELDS.NAME.label,
      UPDATE_USER_INFO_FIELDS.NAME.stateName,
      UPDATE_USER_INFO_FIELDS.NAME.message
    );
  };

  useUpdateFields(response, getUserInputHandler);

  const sendResetForgotPassToken = async () => {
    await getUserInputHandler(
      FORGET_PASS_FIELDS.EMAIL.label,
      FORGET_PASS_FIELDS.EMAIL.stateName,
      FORGET_PASS_FIELDS.EMAIL.message
    );
  };

  useForgetPass(response, getUserInputHandler);

  const logout = async () => {
    response(`good bye, ${userData.name}`);
    response("logged out successfully");
    logoutRedux();
  };

  const updatePassword = async () => {
    if (userData) {
      await getUserInputHandler(
        UPDATE_USER_INFO_FIELDS.PASSWORD.label,
        UPDATE_USER_INFO_FIELDS.PASSWORD.stateName,
        UPDATE_USER_INFO_FIELDS.PASSWORD.message
      );
    } else {
      response(
        "oops, you not logged in to update your password"
      );
    }
  };

  // listening to invalid message
  useEffect(() => {
    if (invalidMessage) {
      response(invalidMessage);
      updateModal({ invalidMessage: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidMessage]);

  return {
    signUp,
    login,
    updateUserInfo,
    sendResetForgotPassToken,
    logout,
    updatePassword,
  };
};
