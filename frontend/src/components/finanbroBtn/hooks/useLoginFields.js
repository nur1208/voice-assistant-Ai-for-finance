import { useSelector } from "react-redux";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { useHandleUserInput } from "./useHandleUserInput";

export const LOGIN_FIELDS = {
  EMAIL: {
    label: "Email",
    stateName: "emailLogin",
    message: "enter your email",
  },
  PASSWORD: {
    label: "Password",
    stateName: "passwordLogin",
    message: "enter your password",
  },
};

export const useLoginFields = (
  response,
  getUserInputHandler
) => {
  const { login } = useReduxActions();

  const { userInputs } = useSelector(
    (state) => state.modal_store
  );

  useHandleUserInput(
    LOGIN_FIELDS.EMAIL.stateName,
    {},
    async () => {
      response(`I got it`);
      await getUserInputHandler(
        LOGIN_FIELDS.PASSWORD.label,
        LOGIN_FIELDS.PASSWORD.stateName,
        LOGIN_FIELDS.PASSWORD.message
      );
    }
  );

  useHandleUserInput(
    LOGIN_FIELDS.PASSWORD.stateName,
    {},
    async () => {
      login(
        {
          email: userInputs.emailLogin,
          password: userInputs.passwordLogin,
        },
        response
      );
    }
  );
};
