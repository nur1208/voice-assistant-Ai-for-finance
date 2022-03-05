import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const initBeforeUnLoad = (showExitPrompt) => {
  window.onbeforeunload = (event) => {
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    }
  };
};

// Hook
export const useExitPrompt = (bool) => {
  const [showExitPrompt, setShowExitPrompt] = useState(bool);

  const {isBTRunning} = useSelector((state) => state.back_testing)
  
  const initBeforeUnLoadCondition =
    showExitPrompt || isBTRunning;
  window.onload = function () {
    initBeforeUnLoad(initBeforeUnLoadCondition);
  };

  useEffect(() => {
    initBeforeUnLoad(initBeforeUnLoadCondition);
  }, [initBeforeUnLoadCondition]);

  return [showExitPrompt, setShowExitPrompt];
};
