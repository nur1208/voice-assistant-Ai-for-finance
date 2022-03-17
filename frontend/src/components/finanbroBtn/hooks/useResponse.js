import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useSpeechSynthesis } from "react-speech-kit";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { sleep } from "../../../utils/sleep";
import {
  lastBTDate,
  useBackTest,
} from "../../Simulator/utils/useBackTest";
import { useSaveTestedData } from "../../Simulator/utils/useSaveTestedData";
import useSpeechSynthesis from "./useSpeechSynthesis";

export const secondCommandOptions = {
  rewritingTestedData: "rewritingTestedData",
  forceSelling: "forceSelling",
  tryTradingAgain: "tryTradingAgain",
};

export const useResponse = (SpeechRecognition) => {
  const { speak, voices, speaking, cancel, speakAsync } =
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
    // console.log({
    //   voices,
    //   finansisVoice: voices[currentVoiceIndex].name,
    // });

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

    if (!voices[currentVoiceIndex]) {
      return;
    }

    if (voices[currentVoiceIndex].name === FINANSIS_VOICE) {
      handleResponse(currentVoiceIndex);
    } else {
      const voiceIndex = changeVoiceToFinansisVoice();
      handleResponse(voiceIndex);
    }
  };
  const { resetBTState, updateSecondCommand, updateSpeaking } =
    useReduxActions();

  const responseAsync = async (optionsResponse) => {
    updateSpeaking(true);
    let randomOption;
    if (optionsResponse.length - 1 < randomIndex)
      randomOption = optionsResponse[0];
    else randomOption = optionsResponse[randomIndex];
    console.log("here");
    // let currentVoiceIndex = 7;
    // console.log({
    //   voices,
    //   finansisVoice: voices[currentVoiceIndex].name,
    // });

    const handleResponse = async (voiceIndex) => {
      if (typeof optionsResponse !== "object")
        await speakAsync({
          text: optionsResponse,
          voice: voices[voiceIndex],
        });
      else {
        await speakAsync({
          text: randomOption,
          voice: voices[voiceIndex],
        });
        setRandomIndex(
          Math.floor(Math.random() * optionsResponse.length)
        );
        // setRandomIndex(10);
      }
    };

    if (!voices[currentVoiceIndex]) {
      return;
    }

    if (voices[currentVoiceIndex].name === FINANSIS_VOICE) {
      await handleResponse(currentVoiceIndex);
    } else {
      const voiceIndex = changeVoiceToFinansisVoice();
      await handleResponse(voiceIndex);
    }

    updateSpeaking(false);
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

  const [isResetBTData, setIsResetBTData] = useLocalStorage(
    "isResetBTData",
    false
  );

  const { holdingStocks, currentDate } = useSelector(
    (state) => state.back_testing
  );

  const { secondCommand, isSpeaking, isStartRecognize } =
    useSelector((state) => state.response_store);
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

    let localSecondFor = secondCommandFor;
    if (secondCommand?.type) localSecondFor = secondCommand.type;
    else if (typeof secondCommandFor === "object")
      localSecondFor = secondCommandFor.type;

    switch (localSecondFor) {
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

        if (currentDate > new Date(lastBTDate)) {
          response(
            "sorry I don't have more data to test, right now"
          );
          return;
        }
        response("starting force selling");

        await forceSelling();
        response("force selling is done");
        setIsForceSellAgain(true);
        break;

      case secondCommandOptions.tryTradingAgain:
        setSecondCommandFor("");
        updateSecondCommand({});
        response(
          `okay, I Will try ${secondCommand.other.TradingType} again`
        );

        await sleep(5000);

        await secondCommand.other.callback();

        break;

      default:
        response("I didn't get that. you can try again... bro");
        break;
    }
    setSecondCommandFor("");
  };

  const respondedWithNoSC = () => {
    let localSecondFor = secondCommandFor;
    if (secondCommand?.type) localSecondFor = secondCommand.type;
    else if (typeof secondCommandFor === "object")
      localSecondFor = secondCommandFor.type;

    switch (localSecondFor) {
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
      case secondCommandOptions.tryTradingAgain:
        response(
          `what every you say, I won't ${secondCommand.other.TradingType} again`
        );
        break;
      default:
        response("I didn't get that. you can try again... bro");
        break;
    }
    setSecondCommandFor("");
    // resetTranscript();
  };

  // make sure not to let finansis recognize her own voice
  useEffect(() => {
    if (isStartRecognize) {
      if (isSpeaking) {
        console.log({
          conditionLisping: "stop finansis recognizing",
        });
        SpeechRecognition.abortListening();
      } else {
        SpeechRecognition.startListening({ continuous: true });
        console.log({
          conditionLisping: "start finansis recognizing",
        });
      }
    } else {
      SpeechRecognition.stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeaking]);

  return {
    response,
    responseAfterTimeout,
    speaking,
    cancel,
    respondedWithYesSC,
    respondedWithNoSC,
    setSecondCommandFor,
    responseAsync,
  };
};
