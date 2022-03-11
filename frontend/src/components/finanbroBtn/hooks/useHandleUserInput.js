import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useReduxActions } from "../../../hooks/useReduxActions";

export const useHandleUserInput = (
  stateNameLocal,
  { isWaitingUserDone, setIsWaitingUserDone },
  callBackLogic
) => {
  const { finishInputtingFor } = useSelector(
    (state) => state.modal_store
  );
  const { updateModal } = useReduxActions();

  useEffect(() => {
    if (
      isWaitingUserDone === stateNameLocal
      // finishInputtingFor === stateNameLocal
    ) {
      (async () => {
        await callBackLogic();

        setIsWaitingUserDone && setIsWaitingUserDone("");
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaitingUserDone]);

  useEffect(() => {
    if (finishInputtingFor === stateNameLocal) {
      (async () => {
        await callBackLogic();

        updateModal({ finishInputtingFor: "" });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishInputtingFor]);
};
