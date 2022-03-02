import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { sleep } from "../../../utils/sleep";
import { useBackTest } from "../../Simulator/utils/useBackTest";
import { useSaveTestedData } from "../../Simulator/utils/useSaveTestedData";

export const secondCommandOptions = {
  rewritingTestedData: "rewritingTestedData",
};

export const useResponse = () => {
  const { speak, voices, speaking, cancel } =
    useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);

  const response = (optionsResponse) => {
    let randomOption;
    if (optionsResponse.length - 1 < randomIndex)
      randomOption = optionsResponse[0];
    else randomOption = optionsResponse[randomIndex];
    console.log("here");
    console.log({ voices });
    if (typeof optionsResponse !== "object")
      speak({ text: optionsResponse, voice: voices[7] });
    else {
      speak({ text: randomOption, voice: voices[7] });
      setRandomIndex(
        Math.floor(Math.random() * optionsResponse.length)
      );
      // setRandomIndex(10);
    }
  };

  const responseAfterTimeout = (title, option = {}) =>
    new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        response(title);
        option.indexArticle &&
          option.setActiveArticle(option.indexArticle);
        // setActiveArticle(index);
        // console.log({ index });
        if (option.isLast) {
          option.setIsReadingHeadLines(false);
        }
        resolve();
      }, option.timeout || 1000);

      // console.log({ callbackC: option?.callback });
      // const timeoutId = setTimeout(
      //   option?.callback
      //     ? option.callback(resolve, option?.params)
      //     : () => {
      //         response(title);
      //         resolve();
      //       },
      //   option.timeout || 1000
      // );
      // for stop reading command save timeoutIds
      option?.ids?.push(timeoutId);
      // return timeoutId;
    });

  const [secondCommandFor, setSecondCommandFor] = useState("");

  const { getTestedData } = useBackTest();

  const { updateIsResetBTData, resetBTState } =
    useReduxActions();

  const [isResetBTData, setIsResetBTData] = useLocalStorage(
    "isResetBTData",
    false
  );
  const respondedWithYesSC = async ({
    handleReadingHeadLines,
    handleScrollDetailPage,
    handleFindingAnswer,
    findingAnswerFor,
    setCurrentQuestion,
    resetAllStates,
  }) => {
    console.log(secondCommandFor);
    switch (secondCommandFor) {
      case "readThHeadLines":
        handleReadingHeadLines();

        break;

      case "scrollDetailsA":
        response("scrolling the page every 5 seconds");

        await handleScrollDetailPage();

        break;

      case "findingAnswer":
        response("give me a minute to find an answer");

        await handleFindingAnswer(
          findingAnswerFor,
          setCurrentQuestion
        );

        break;

      case secondCommandOptions.rewritingTestedData:
        response(
          "resetting back testing data then starting back testing"
        );
        resetBTState();
        // updateIsResetBTData(true);
        setIsResetBTData(true);
        // response(
        //   "after the page reload tell me start back testing"
        // );

        await sleep(1000);
        window.location.reload();
        // resetAllStates();
        // response("starting back testing again");

        // await getTestedData();
        // response("back testing is done");

        break;

      default:
        response("I didn't get that. you can try again... bro");
        break;
    }
    setSecondCommandFor("");
  };

  const respondedWithNoSC = () => {
    switch (secondCommandFor) {
      case "readThHeadLines":
        response("WOW, thank you");
        break;
      case "scrollDetailsA":
        response("thank you, I was feeling lazy to scroll");
        break;

      case "findingAnswer":
        response("okay, I won't find answers");
        break;

      case secondCommandOptions.rewritingTestedData:
        response("okay, I won't rewrite your back testing data");
        break;

      default:
        response("I didn't get that. you can try again... bro");
        break;
    }
    setSecondCommandFor("");
    // resetTranscript();
  };

  return {
    response,
    responseAfterTimeout,
    speaking,
    cancel,
    respondedWithYesSC,
    respondedWithNoSC,
    setSecondCommandFor,
  };
};
