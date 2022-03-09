import { useState } from "react";
import { useSelector } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { sleep } from "../../../utils/sleep";
import { useBackTest } from "../../Simulator/utils/useBackTest";
import { useSaveTestedData } from "../../Simulator/utils/useSaveTestedData";

export const secondCommandOptions = {
  rewritingTestedData: "rewritingTestedData",
  forceSelling: "forceSelling",
};

export const useResponse = () => {
  const { speak, voices, speaking, cancel } =
    useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);
  const [currentVoiceIndex, setCurrentVoiceIndex] =
    useLocalStorage("currentVoiceIndex", 7);
  const FINANSIS_VOICE = "Google US English";

  // make sure that finansis voice is always "Google US English" if the voice exit
  const changeVoiceToFinansisVoice = () => {
    console.log("in changeVoiceToFinansisVoice");

    let voiceIndex = currentVoiceIndex;
    for (let index = 0; index < voices.length; index++) {
      const voice = voices[index];
      if (FINANSIS_VOICE === voice.name) {
        setCurrentVoiceIndex(index);
        voiceIndex = index;
      }
    }

    return voiceIndex;
  };

  const response = (optionsResponse) => {
    let randomOption;
    if (optionsResponse.length - 1 < randomIndex)
      randomOption = optionsResponse[0];
    else randomOption = optionsResponse[randomIndex];
    console.log("here");
    // let currentVoiceIndex = 7;
    console.log({
      voices,
      finansisVoice: voices[currentVoiceIndex].name,
    });

    const handleResponse = (voiceIndex) => {
      if (typeof optionsResponse !== "object")
        speak({
          text: optionsResponse,
          voice: voices[voiceIndex],
        });
      else {
        speak({
          text: randomOption,
          voice: voices[voiceIndex],
        });
        setRandomIndex(
          Math.floor(Math.random() * optionsResponse.length)
        );
        // setRandomIndex(10);
      }
    };

    if (voices[currentVoiceIndex].name === FINANSIS_VOICE) {
      handleResponse(currentVoiceIndex);
    } else {
      const voiceIndex = changeVoiceToFinansisVoice();
      handleResponse(voiceIndex);
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

  const { forceSelling } = useBackTest();

  const { resetBTState } = useReduxActions();

  const [isResetBTData, setIsResetBTData] = useLocalStorage(
    "isResetBTData",
    false
  );

  const { holdingStocks } = useSelector(
    (state) => state.back_testing
  );

  const respondedWithYesSC = async ({
    handleReadingHeadLines,
    handleScrollDetailPage,
    handleFindingAnswer,
    findingAnswerFor,
    setCurrentQuestion,
    resetAllStates,
    setIsForceSellAgain,
  }) => {
    console.log(secondCommandFor);
    switch (secondCommandFor) {
      case "readThHeadLines":
        handleReadingHeadLines();

        break;

      case "scrollDetailsA":
        response("scrolling the page every 5 seconds");
        setSecondCommandFor("");

        await handleScrollDetailPage();

        break;

      case "findingAnswer":
        response("give me a minute to find an answer");

        setSecondCommandFor("");

        await handleFindingAnswer(
          findingAnswerFor,
          setCurrentQuestion
        );

        break;

      case secondCommandOptions.rewritingTestedData:
        // then starting back testing
        response("resetting back testing data ");
        await sleep(1000);

        response(
          "enter initial cash then click enter to submit after the reloading"
        );
        await sleep(5000);

        resetBTState();
        // updateIsResetBTData(true);
        setIsResetBTData(true);
        // response(
        //   "after the page reload tell me start back testing"
        // );

        window.location.reload();
        // resetAllStates();
        // response("starting back testing again");

        // await getTestedData();
        // response("back testing is done");

        break;
      case secondCommandOptions.forceSelling:
        setSecondCommandFor("");
        response("starting force selling");

        await forceSelling();
        response("force selling is done");
        setIsForceSellAgain(true);
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

      case secondCommandOptions.forceSelling:
        response("what every you say, I won't force sell");
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
