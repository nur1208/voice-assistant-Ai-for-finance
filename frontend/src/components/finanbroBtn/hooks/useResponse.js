import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export const useResponse = () => {
  const { speak, voices, speaking, cancel } = useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);

  const response = (optionsResponse) => {
    let randomOption;
    if (optionsResponse.length - 1 < randomIndex)
      randomOption = optionsResponse[0];
    else randomOption = optionsResponse[randomIndex];

    // console.log(randomOption);
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

  const respondedWithYesSC = async ({
    handleReadingHeadLines,
    handleScrollDetailPage,
    handleFindingAnswer,
    findingAnswerFor,
    setCurrentQuestion,
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
