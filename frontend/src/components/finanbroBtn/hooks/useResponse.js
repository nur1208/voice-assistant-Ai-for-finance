import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAudio } from "../../../hooks/useAudio";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { updateModal } from "../../../state/action-creator";
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
  loginAgain: "loginAgain",
  signupAgain: "signupAgain",
  updatePassword: "updatePassword",
  login: "login",
  learningAboutCompany: "learningAboutCompany",
  enterPasswordAgain: "enterPasswordAgain",
};

export const useResponse = (SpeechRecognition) => {
  const [playing, toggle] = useAudio(
    "./audio/zapsplat_multimedia_button_click_007_53868.mp3"
  );

  const { speak, voices, speaking, cancel, speakAsync } =
    useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);
  const [currentVoiceIndex, setCurrentVoiceIndex] =
    useLocalStorage("currentVoiceIndex", 7);
  const FINANSIS_VOICE = "Google US English";

  // make sure that finansis voice is always "Google US English" if the voice exit
  const changeVoiceToFinansisVoice = () => {
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
    // let currentVoiceIndex = 7;

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

  const {
    resetBTState,
    updateSecondCommand,
    updateSpeaking,
    logout,
  } = useReduxActions();

  const responseAsync = async (optionsResponse) => {
    updateSpeaking(true);
    let randomOption;
    if (optionsResponse.length - 1 < randomIndex)
      randomOption = optionsResponse[0];
    else randomOption = optionsResponse[randomIndex];
    // let currentVoiceIndex = 7;

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
        if (option.isLast) {
          option.setIsReadingHeadLines(false);
        }
        resolve();
      }, option.timeout || 1000);

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

        await secondCommand?.other?.callback();

        break;

      case secondCommandOptions.loginAgain:
      case secondCommandOptions.signupAgain:
        setSecondCommandFor("");
        updateSecondCommand({});
        const { action, callback } = secondCommandFor.other;

        if (action === "login")
          response(
            `okay, I will log you out and let you log in again`
          );
        else if (action === "signup")
          response(
            `okay, I will log you out and let you create a new account`
          );

        await sleep(1000);
        logout();
        await sleep(1000);
        await callback(true);

        break;
      case secondCommandOptions.updatePassword:
        setSecondCommandFor("");
        updateSecondCommand({});

        response(`okay, I will let you update your password`);
        secondCommandFor?.other?.callback();
        break;

      case secondCommandOptions.login:
        setSecondCommandFor("");
        updateSecondCommand({});

        response(`okay`);
        secondCommandFor?.other?.callback();

        break;
      case secondCommandOptions.learningAboutCompany:
        setSecondCommandFor("");
        updateSecondCommand({});

        // response(`okay`);
        secondCommandFor?.other?.callback();

        break;

      case secondCommandOptions.enterPasswordAgain:
        setSecondCommandFor("");
        updateSecondCommand({});
        // updateModal({isEnterPasswordAgain:true})
        // handleClose();
        // response(`okay`);
        secondCommandFor?.other?.callback();

        break;

      // case secondCommandOptions.signupAgain:
      //   setSecondCommandFor("");
      //   updateSecondCommand({});
      //   response(
      //     `okay, I will log you out and let you create a new account`
      //   );

      //   await sleep(1000);
      //   logout();
      //   await sleep(1000);
      //   await secondCommandFor.other.callback(true);

      //   break;

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
      case secondCommandOptions.loginAgain:
      case secondCommandOptions.signupAgain:
        response(`okay, i won't log you out`);
        break;

      case secondCommandOptions.updatePassword:
        response(
          `what every you say, i won't update your password`
        );

        break;
      case secondCommandOptions.login:
        response(`okay, no login`);
        break;

      case secondCommandOptions.learningAboutCompany:
        response(`okay, I won't learn`);
        break;

      case secondCommandOptions.enterPasswordAgain:
        response(`okay, try again or click on exit key to exit`);
        break;

      default:
        response("I didn't get that. you can try again... bro");
        break;
    }
    setSecondCommandFor("");
    updateSecondCommand({});

    // resetTranscript();
  };

  // make sure not to let finansis recognize her own voice
  useEffect(() => {
    if (isStartRecognize) {
      if (isSpeaking) {
        SpeechRecognition.abortListening();
      } else {
        SpeechRecognition.startListening({ continuous: true });
        toggle();
      }
    } else {
      SpeechRecognition.stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeaking, isStartRecognize]);

  return {
    response,
    responseAfterTimeout,
    speaking: isSpeaking,
    cancel,
    respondedWithYesSC,
    respondedWithNoSC,
    setSecondCommandFor,
    responseAsync,
    secondCommandFor,
  };
};
