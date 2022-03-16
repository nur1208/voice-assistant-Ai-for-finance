import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FORGET_PASS_FIELDS } from "../components/finanbroBtn/hooks/useForgetPassFields";
import { MODAL_TYPE_OPTIONS } from "../components/Modal/BasicModal/BasicModalUtils";
import { useReduxActions } from "../hooks/useReduxActions";

export const ResetPassword = () => {
  const { updateModal, setUserInput } = useReduxActions();

  const { token } = useParams();

  useEffect(() => {
    updateModal({
      type: MODAL_TYPE_OPTIONS.INPUT,
      isReduxState: true,
      label: FORGET_PASS_FIELDS.PASSWORD.label,
      stateName: FORGET_PASS_FIELDS.PASSWORD.stateName,
      open: true,
      // text: "give me a second to validity your token",
      // text: "token",

      extraHelperText: "type your new password, then ",
    });

    setUserInput({ token });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};
