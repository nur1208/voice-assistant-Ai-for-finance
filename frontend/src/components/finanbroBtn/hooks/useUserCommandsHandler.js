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
import { YAHOO_FINANCE_OPENING_OPTIONS } from "./useInfoCommandsHandler";
import { useOtherUserFields } from "./useOtherUserFields";

export const useUserCommandsHandler = (
  response,
  handleOpenModal,
  setSecondCommandFor,
  openYahooFinance,
  setFoundMultiple,
  handleCloseModal
) => {
  const {
    updateModal,
    logout: logoutRedux,
    updateSecondCommand,
    updateUserInfo: updateUserInfoRedux,
    setMessagePopupData,
  } = useReduxActions();

  const {
    modal_store: { invalidMessage, confirmPasswordCounter },
    user_store: { userData, error },
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

  const setSecondCommand = (callback, action, type) => {
    updateSecondCommand({
      type,
      other: { callback, action },
    });
    setSecondCommandFor({
      type,
      other: { callback, action },
    });
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
      setSecondCommand(
        signUp,
        "signup",
        secondCommandOptions.signupAgain
      );
    }
  };

  useSignUpFields(response, getUserInputHandler);

  const doWantLogin = () => {
    response("you not logged in");
    response("do you want to login");

    setSecondCommand(login, "login", secondCommandOptions.login);
  };

  const logout = async () => {
    if (userData) {
      response(`good bye, ${userData.name}`);
      response("logged out successfully");
      logoutRedux();
    } else {
      doWantLogin();
    }
  };

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
      setSecondCommand(
        login,
        "login",
        secondCommandOptions.loginAgain
      );
    }
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

  const sendResetForgotPassToken = async () => {
    if (!userData) {
      await getUserInputHandler(
        FORGET_PASS_FIELDS.EMAIL.label,
        FORGET_PASS_FIELDS.EMAIL.stateName,
        FORGET_PASS_FIELDS.EMAIL.message
      );
    } else {
      response("you are logged in");
      response("do you want to update your password");
      setSecondCommand(
        updatePassword,
        "updatePassword",
        secondCommandOptions.updatePassword
      );
    }
  };

  useForgetPass(response, getUserInputHandler);

  useLoginFields(response, getUserInputHandler);

  const updateUserInfo = async () => {
    await getUserInputHandler(
      UPDATE_USER_INFO_FIELDS.NAME.label,
      UPDATE_USER_INFO_FIELDS.NAME.stateName,
      UPDATE_USER_INFO_FIELDS.NAME.message
    );
  };

  useUpdateFields(response, getUserInputHandler);

  const addToWatchList = (target) => {
    if (userData) {
      openYahooFinance(
        YAHOO_FINANCE_OPENING_OPTIONS.ADD_TO_WATCH_LIST,
        target
      );
    } else {
      doWantLogin();
    }
  };

  const showWatchList = () => {
    if (userData) {
      response("here is your watch list");
      handleOpenModal("Watch List:", userData.watchList);
      updateModal({ isModalOpen: true });
    } else {
      doWantLogin();
    }
  };

  function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === what) {
        count++;
      }
    }
    return count;
  }

  const deleteFromWatchList = (target) => {
    if (userData) {
      const isStockInWatchList = userData.watchList.map(
        ({ symbol, name }) =>
          target === symbol || name.includes(target)
      );

      const numFoundStocks = countInArray(
        isStockInWatchList,
        true
      );

      if (numFoundStocks === 1) {
        response(`removing ${target} from your watch list`);
        const foundCompany =
          userData.watchList[isStockInWatchList.indexOf(true)];
        updateUserInfoRedux(
          userData.id,
          { removeWatchList: [foundCompany._id] },
          response
        );
      } else if (numFoundStocks > 1) {
        setFoundMultiple(
          userData.watchList.filter(
            (_, index) => isStockInWatchList[index]
          ),
          YAHOO_FINANCE_OPENING_OPTIONS.DELETE_FROM_WATCH_LIST,
          false
        );
      } else {
        response(`${target} is not in your watch list`);
      }
    } else {
      doWantLogin();
    }
  };

  useOtherUserFields(response, getUserInputHandler);
  // listening to invalid message

  const handleEnterPasswordAgain = async () => {
    handleCloseModal();
    await getUserInputHandler(
      SIGN_UP_FIELDS.PASSWORD.label,
      SIGN_UP_FIELDS.PASSWORD.stateName,
      SIGN_UP_FIELDS.PASSWORD.message
    );
  };

  useEffect(() => {
    if (invalidMessage) {
      setMessagePopupData({
        open: true,
        severity: "error",
        message: invalidMessage,
      });
      response(invalidMessage);

      if (confirmPasswordCounter >= 2) {
        response("do you want to enter your password again");
        setSecondCommand(
          handleEnterPasswordAgain,
          "",
          secondCommandOptions.enterPasswordAgain
        );
      }

      updateModal({ invalidMessage: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidMessage]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setMessagePopupData({
          open: true,
          severity: "error",
          message: error,
        });
      }, 1000 * 3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    signUp,
    login,
    updateUserInfo,
    sendResetForgotPassToken,
    logout,
    updatePassword,
    addToWatchList,
    showWatchList,
    deleteFromWatchList,
  };
};
