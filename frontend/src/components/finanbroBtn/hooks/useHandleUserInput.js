import { useEffect } from "react";

export const useHandleUserInput = (
  stateName,
  { isWaitingUserDone, setIsWaitingUserDone },
  callBackLogic
) => {
  useEffect(() => {
    if (isWaitingUserDone === stateName) {
      (async () => {
        await callBackLogic();

        setIsWaitingUserDone("");
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaitingUserDone]);
};
