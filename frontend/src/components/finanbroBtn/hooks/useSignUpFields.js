import { useSelector } from "react-redux";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { useHandleUserInput } from "./useHandleUserInput";

export const SIGN_UP_FIELDS = {
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

export const useSignUpFields = (
  response,
  getUserInputHandler
) => {
  const { signUp } = useReduxActions();

  const { userInputs } = useSelector(
    (state) => state.modal_store
  );
  useHandleUserInput(
    SIGN_UP_FIELDS.NAME.stateName,
    {},
    async () => {
      response(`okay, I got it`);
      await getUserInputHandler(
        SIGN_UP_FIELDS.EMAIL.label,
        SIGN_UP_FIELDS.EMAIL.stateName,
        `${userInputs?.name}, ${SIGN_UP_FIELDS.EMAIL.message}`
      );
    }
  );

  useHandleUserInput(
    SIGN_UP_FIELDS.EMAIL.stateName,
    {},
    async () => {
      response(`I got your email`);
      await getUserInputHandler(
        SIGN_UP_FIELDS.PASSWORD.label,
        SIGN_UP_FIELDS.PASSWORD.stateName,
        SIGN_UP_FIELDS.PASSWORD.message
      );
    }
  );

  useHandleUserInput(
    SIGN_UP_FIELDS.PASSWORD.stateName,
    {},
    async () => {
      // response(`Your password start with`);
      // await sleep(500);
      // response("nah, I'm just missing with you");
      await getUserInputHandler(
        SIGN_UP_FIELDS.PASSWORD_CONFIRM.label,
        SIGN_UP_FIELDS.PASSWORD_CONFIRM.stateName,
        SIGN_UP_FIELDS.PASSWORD_CONFIRM.message
      );
    }
  );

  useHandleUserInput(
    SIGN_UP_FIELDS.PASSWORD_CONFIRM.stateName,
    {},
    async () => {
      response(`okay one more time`);

      await getUserInputHandler(
        SIGN_UP_FIELDS.GENDER.label,
        SIGN_UP_FIELDS.GENDER.stateName,
        SIGN_UP_FIELDS.GENDER.message,
        SIGN_UP_FIELDS.GENDER.selectOptions
      );
    }
  );

  useHandleUserInput(
    SIGN_UP_FIELDS.GENDER.stateName,
    {},
    async () => {
      // response("I'll sign up for you")
      signUp({ ...userInputs }, response);
    }
  );
};
