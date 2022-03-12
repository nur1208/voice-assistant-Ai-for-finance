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
};

export const useUpdateFields = (
  response,
  getUserInputHandler
) => {
  const { updateUserInfo } = useReduxActions();

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
};
