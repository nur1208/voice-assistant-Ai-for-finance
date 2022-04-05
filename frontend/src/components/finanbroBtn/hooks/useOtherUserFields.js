import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { sleep } from "../../../utils/sleep";
import { MODAL_TYPE_OPTIONS } from "../../Modal/BasicModal/BasicModalUtils";
import { useHandleUserInput } from "./useHandleUserInput";

export const OTHER_USER_FIELDS = {
  EXECUTABLE_CHROME_PATH: {
    label: "Chrome Executable Path",
    stateName: "executableChromePath",
    message:
      "paste your chrome executable path to let me controller your browser",
  },
};

export const useOtherUserFields = (
  response,
  getUserInputHandler
) => {
  const { setUserInput, updateUserInfo, closeModal } =
    useReduxActions();

  const {
    modal_store: { userInputs },
    user_store: { userData },
  } = useSelector((state) => state);

  useHandleUserInput(
    OTHER_USER_FIELDS.EXECUTABLE_CHROME_PATH.stateName,
    {},
    async () => {
      response("try the command again after updating your info");
      updateUserInfo(
        userData.id,
        {
          executableChromePath: userInputs.executableChromePath,
        },
        response
      );

      setUserInput({
        executableChromePath: "",
      });

      closeModal();
    }
  );
};
