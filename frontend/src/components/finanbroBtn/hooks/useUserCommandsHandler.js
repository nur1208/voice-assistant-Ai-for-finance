import { sleep } from "../../../utils/sleep";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { MODAL_TYPE_OPTIONS } from "../../Modal/BasicModal";
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

export const useUserCommandsHandler = (
  response,
  handleOpenModal
) => {
  const { updateModal } = useReduxActions();
  const { invalidMessage } = useSelector(
    (state) => state.modal_store
  );

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

  const signUp = async () => {
    await getUserInputHandler(
      SIGN_UP_FIELDS.NAME.label,
      SIGN_UP_FIELDS.NAME.stateName,
      SIGN_UP_FIELDS.NAME.message
    );
  };

  useSignUpFields(response, getUserInputHandler);

  const login = async () => {
    await getUserInputHandler(
      LOGIN_FIELDS.EMAIL.label,
      LOGIN_FIELDS.EMAIL.stateName,
      LOGIN_FIELDS.EMAIL.message
    );
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
  // listening to invalid message
  useEffect(() => {
    if (invalidMessage) {
      response(invalidMessage);
      updateModal({ invalidMessage: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidMessage]);

  return { signUp, login, updateUserInfo };
};
