import { sleep } from "../../../utils/sleep";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { MODAL_TYPE_OPTIONS } from "../../Modal/BasicModal";
import { useHandleUserInput } from "./useHandleUserInput";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export const USER_FIELDS = {
  NAME: {
    label: "Name",
    stateName: "name",
    message: "enter your name",
  },
  EMAIL: {
    label: "Email",
    stateName: "email",
    message: "enter your email",
  },
  PASSWORD: {
    label: "Password",
    stateName: "password",
    message: "enter your password, don't worry I wont see it",
  },
  PASSWORD_CONFIRM: {
    label: "Confirm Password",
    stateName: "passwordConfirm",
    message: "enter Confirm password",
  },
  GENDER: {
    label: "Gender",
    stateName: "gender",
    message: "select your gender",
    selectOptions: ["Female", "Male"],
  },
};
export const useUserCommandsHandler = (
  response,
  handleOpenModal
) => {
  const { updateModal, signUp } = useReduxActions();
  const { userInputs } = useSelector(
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

  const signUpHandler = async () => {
    await getUserInputHandler(
      USER_FIELDS.NAME.label,
      USER_FIELDS.NAME.stateName,
      USER_FIELDS.NAME.message
    );
  };

  useHandleUserInput(
    USER_FIELDS.NAME.stateName,
    {},
    async () => {
      response(`okay, I got it`);
      await getUserInputHandler(
        USER_FIELDS.EMAIL.label,
        USER_FIELDS.EMAIL.stateName,
        `${userInputs?.name}, ${USER_FIELDS.EMAIL.message}`
      );
    }
  );

  useHandleUserInput(
    USER_FIELDS.EMAIL.stateName,
    {},
    async () => {
      response(`I got your email`);
      await getUserInputHandler(
        USER_FIELDS.PASSWORD.label,
        USER_FIELDS.PASSWORD.stateName,
        USER_FIELDS.PASSWORD.message
      );
    }
  );

  useHandleUserInput(
    USER_FIELDS.PASSWORD.stateName,
    {},
    async () => {
      response(`Your password start with`);
      await sleep(1000);
      response("nah, I'm just miss with you");
      await getUserInputHandler(
        USER_FIELDS.PASSWORD_CONFIRM.label,
        USER_FIELDS.PASSWORD_CONFIRM.stateName,
        USER_FIELDS.PASSWORD_CONFIRM.message
      );
    }
  );

  useHandleUserInput(
    USER_FIELDS.PASSWORD_CONFIRM.stateName,
    {},
    async () => {
      response(`okay one more time`);
      await sleep(500);

      await getUserInputHandler(
        USER_FIELDS.GENDER.label,
        USER_FIELDS.GENDER.stateName,
        USER_FIELDS.GENDER.message,
        USER_FIELDS.GENDER.selectOptions
      );
    }
  );

  useHandleUserInput(
    USER_FIELDS.GENDER.stateName,
    {},
    async () => {
      // response("I'll sign up for you")
      signUp({ ...userInputs }, response);
    }
  );

  return { signUp: signUpHandler };
};
