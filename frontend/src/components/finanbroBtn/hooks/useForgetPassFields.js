import { useSelector } from "react-redux";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { useHandleUserInput } from "./useHandleUserInput";

export const FORGET_PASS_FIELDS = {
  EMAIL: {
    label: "EMAIL",
    stateName: "emailForgetPass",
    message: "enter your email to send you, a reset token",
  },
};

export const useForgetPass = (response, getUserInputHandler) => {
  const { forgetPass } = useReduxActions();

  const { userInputs } = useSelector(
    (state) => state.modal_store
  );

  useHandleUserInput(
    FORGET_PASS_FIELDS.EMAIL.stateName,
    {},
    async () => {
      forgetPass(userInputs.emailForgetPass, response);
    }
  );
};
