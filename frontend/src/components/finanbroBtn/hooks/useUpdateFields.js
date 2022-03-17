import { useSelector } from "react-redux";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { useHandleUserInput } from "./useHandleUserInput";

export const UPDATE_USER_INFO_FIELDS = {
  NAME: {
    label: "Name",
    stateName: "nameUpdate",
    message:
      "if you want to update your name type your new name, then click enter",
  },
  GENDER: {
    label: "Gender",
    stateName: "genderUpdate",
    message:
      "same for your gender but instead of typing, select your gender",
    selectOptions: ["Female", "Male"],
  },
  PASSWORD: {
    label: "Current Password",
    stateName: "passwordUpdate",
    message: "enter your current password",
  },
  NEW_PASSWORD: {
    label: "New Password",
    stateName: "passwordNewUpdate",
    message: "enter your new password",
  },
  CONFIRM_PASSWORD: {
    label: "Confirm Password",
    stateName: "passwordConfirmUpdate",
    message: "enter confirm password",
  },
};

export const useUpdateFields = (
  response,
  getUserInputHandler
) => {
  const { updateUserInfo, updatePassword } = useReduxActions();

  const {
    modal_store: { userInputs },
    user_store: { userData },
  } = useSelector((state) => state);
  useHandleUserInput(
    UPDATE_USER_INFO_FIELDS.NAME.stateName,
    {},
    async () => {
      //   response(`I got it`);
      await getUserInputHandler(
        UPDATE_USER_INFO_FIELDS.GENDER.label,
        UPDATE_USER_INFO_FIELDS.GENDER.stateName,
        UPDATE_USER_INFO_FIELDS.GENDER.message,
        UPDATE_USER_INFO_FIELDS.GENDER.selectOptions
      );
    }
  );

  useHandleUserInput(
    UPDATE_USER_INFO_FIELDS.GENDER.stateName,
    {},
    async () => {
      updateUserInfo(
        userData.id,
        {
          name: userInputs.nameUpdate,
          gender: userInputs.genderUpdate,
        },
        response
      );
    }
  );

  useHandleUserInput(
    UPDATE_USER_INFO_FIELDS.PASSWORD.stateName,
    {},
    async () => {
      //   response(`I got it`);
      await getUserInputHandler(
        UPDATE_USER_INFO_FIELDS.NEW_PASSWORD.label,
        UPDATE_USER_INFO_FIELDS.NEW_PASSWORD.stateName,
        UPDATE_USER_INFO_FIELDS.NEW_PASSWORD.message
      );
    }
  );

  useHandleUserInput(
    UPDATE_USER_INFO_FIELDS.NEW_PASSWORD.stateName,
    {},
    async () => {
      //   response(`I got it`);
      await getUserInputHandler(
        UPDATE_USER_INFO_FIELDS.CONFIRM_PASSWORD.label,
        UPDATE_USER_INFO_FIELDS.CONFIRM_PASSWORD.stateName,
        UPDATE_USER_INFO_FIELDS.CONFIRM_PASSWORD.message
      );
    }
  );
  useHandleUserInput(
    UPDATE_USER_INFO_FIELDS.CONFIRM_PASSWORD.stateName,
    {},
    async () => {
      updatePassword(
        {
          password: userInputs.passwordUpdate,
          newPassword: userInputs.passwordNewUpdate,
        },
        response
      );
    }
  );
};
