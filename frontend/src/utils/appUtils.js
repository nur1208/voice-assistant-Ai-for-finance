import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect } from "react";
import axios from "axios";
import { useAudio } from "../hooks/useAudio";
import { useInfoCommandsHandler } from "../components/finanbroBtn/hooks/useInfoCommandsHandler";
import {
  getNews,
  useNewsCommandsHandler,
} from "../components/finanbroBtn/commandsHandler";
import { useResponse } from "../components/finanbroBtn/hooks/useResponse";
import { useHistory, useLocation } from "react-router-dom";
import { useCommonCommandsHandler } from "../components/finanbroBtn/hooks/useCommonCommandsHandler";
import { BACKEND_API_URL, QUESTIONS_ROUTE } from "./serverUtils";
import { useTradingCommendsHandler } from "../components/finanbroBtn/hooks/useTradingCommendsHandler";
// export const useSecondCommand = (commands) => {
//   const { transcript } = useSpeechRecognition();
// };

export const useFinansis = () => {
  const [playing, toggle] = useAudio(
    "./audio/zapsplat_multimedia_button_click_007_53868.mp3"
  );
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleOpenModal = (title, content) => {
    setOpenModal(true);
    setModalTitle(title);
    setModalContent(content);
  };
  const handleCloseModal = () => setOpenModal(false);

  const {
    response,
    speaking,
    responseAfterTimeout,
    cancel,
    respondedWithYesSC,
    respondedWithNoSC,
    setSecondCommandFor,
  } = useResponse();

  const {
    getNews,
    handleReadingHeadLines,
    // respondedWithYesSC,
    // respondedWithNoSC,
    openArticleHandler,
    handleStopReading,
    activeArticle,
    newsArticles,
    isReadingHeadLines,
    handleClosePopupWindow,
    readHeadLinesFrom,
    setPageNumber,
    setNewsArticles,
    openArticleWithoutControllerItHandler,
    handleClosePopupWindowWithoutController,
    handleScrollDetailPage,
  } = useNewsCommandsHandler(
    response,
    responseAfterTimeout,
    cancel,
    setSecondCommandFor
  );

  const {
    openYahooFinance,
    closeChart,
    foundMultipleStocks,
    openTheMost,
    closeTheMost,
    zoomChart,
    openMultipleCharts,
    changeChartTo,
  } = useInfoCommandsHandler(response, handleOpenModal, handleCloseModal);

  const history = useHistory();
  const { pathname } = useLocation();

  const [questions, setQuestions] = useState([]);

  const {
    goBackHandler,
    handleStopListening,
    handleGoToPage,
    handleTodaysDate,
    handleFindingAnswer,
    openAnswerDetail,
    closeAnswerDetail,
  } = useCommonCommandsHandler(
    setPageNumber,
    setNewsArticles,
    response,
    responseAfterTimeout,
    newsArticles,
    SpeechRecognition,
    handleOpenModal,
    handleCloseModal,
    questions,
    setQuestions
  );

  const { buyStocks, sellStocks, stopLess } = useTradingCommendsHandler(response);

  const [findingAnswerFor, setFindingAnswerFor] = useState("");

  const commands = [
    // {
    //   command: ["你叫什么名字"],
    //   callback: () =>
    //     speak({
    //       text: "我叫finansis",
    //       voice: voices[4],
    //     }),
    // },
    {
      command: ["what can you do", "how can you help me"],
     callback: () => response("I provide finance information for you"),
      commandFor: "every section",
    },
    {
      command: ["what is your name", "what's your name"],
      callback: () => response(["my name is finansis", "I'm finansis... bro"]),
      commandFor: "every section",
    },
    {
      command: ["Give me the news from *"],
      // callback: async (source) => await giveMeSource(source),
      // callback: async (source) => await giveMeSource(source),
      callback: async (source) => await getNews("giveMeSource", source),
      commandFor: "news",
    },
    // {
    //   command: ["what's the last closing price for *"],
    //   callback: (ticker) =>
    //     speak({
    //       text: `the close last price for ${ticker} is 160$`,
    //     }),
    // },

    {
      command: ["(of course) yes", "(of course) yeah"],
      callback: async () =>
        await respondedWithYesSC({
          handleReadingHeadLines,
          handleScrollDetailPage,
          handleFindingAnswer,
          findingAnswerFor,
          setCurrentQuestion,
        }),
      commandFor: "news",
    },
    {
      command: ["no", "nope"],
      callback: () => respondedWithNoSC(),
      commandFor: "news",
    },
    {
      command: "go back",
      callback: () => goBackHandler(),
      commandFor: "every section",
    },
    {
      command: "open article (number) *",
      callback: (articleNum) => openArticleHandler(articleNum),
      commandFor: "news",
    },
    {
      command: "what's up with *",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async (query) => await getNews("whatsUpWith", query),
      commandFor: "news",
    },
    {
      command: "Give me the latest news",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async () => await getNews("latestNews"),
      commandFor: "news",
    },
    {
      command: "read the news",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async () => await handleReadingHeadLines(),
      commandFor: "news",
    },
    {
      command: "stop reading",
      callback: async () => await handleStopReading(),
      commandFor: "news",
    },
    {
      command: "give me more news",
      callback: async () => await getNews("giveMeMore"),
      commandFor: "news",
    },
    {
      command: "stop listening",
      callback: () => handleStopListening(),
      commandFor: "every section",
    },
    {
      command: "go to * (page)",
      callback: (page) => handleGoToPage(page),
      commandFor: "every section",
    },
    {
      command: ["close pop-up window", "close the window", "close the article"],
      callback: async () => await handleClosePopupWindow(),
      commandFor: "news",
    },
    {
      command: "start reading (news) from article *",

      callback: async (num) => await readHeadLinesFrom(num),
      commandFor: "news",
    },

    {
      command: [
        "close (the) chart",
        "close charts",
        "close statistics",
        "close (the) statistic",
      ],
      callback: async (target) => await closeChart(target),
      commandFor: "info",
    },
    {
      command: "open * chart",
      callback: async (target) => await openYahooFinance("chart", target),
      commandFor: "info",
    },
    {
      command: "stock (number) *",
      callback: async (num) => await foundMultipleStocks(num),
      commandFor: "info",
    },
    {
      command: "can you hear me",
      callback: (num) =>
        response([
          "yes",
          "yes, I can",
          "I can hear you",
          "yep",
          "yeah I can hear you",
        ]),
      commandFor: "every section",
    },
    {
      command: "open article (number) * without controlling it",
      callback: async (num) => await openArticleWithoutControllerItHandler(num),
      commandFor: "news",
    },
    {
      command: [
        "what's the date today",
        "what is the date today",
        "what's today date",
        "what's today's date",
      ],
      callback: (num) => handleTodaysDate(num),
      commandFor: "every section",
    },
    {
      command: "give me * statistics",
      callback: async (target) => await openYahooFinance("statistics", target),
      commandFor: "info",
    },
    {
      command: "give me The most * stocks",
      callback: async (type) => await openTheMost(type),
      commandFor: "info",
    },
    {
      command: "close The most window",
      callback: async (type) => await closeTheMost(type),
      commandFor: "info",
    },
    {
      command: "give me trending stocks",
      callback: async () => await openTheMost("trending"),
      commandFor: "info",
    },
    {
      command: "give me top stories from google finance",
      callback: async () => await getNews("topStories"),
      commandFor: "news",
    },
    {
      command: "open * chart with your control",
      callback: async (target) => await openYahooFinance("chart", target, true),
      commandFor: "info",
    },
    {
      command: "zoom *",
      callback: async (type) => await zoomChart(type),
      commandFor: "info",
    },
    {
      command: [
        "what is the current price for * (share)",
        "what's the current price for * (share)",
      ],
      callback: async (symbol) =>
        await openYahooFinance("currentPrice", symbol),
      commandFor: "info",
    },
    {
      command: "show me * charts",
      callback: async (companies) => await openMultipleCharts(companies),
      commandFor: "info",
    },
    {
      command: "change the chart to *",
      callback: async (companies) => await changeChartTo(companies),
      commandFor: "info",
    },
    {
      command: "open details page for the answer",
      callback: () => openAnswerDetail(currentQuestion),
      commandFor: "every section",
    },
    {
      command: "close details answer (window)",
      callback: () => closeAnswerDetail(),
      commandFor: "every section",
    },
    {
      command: "buy stocks",
      callback: () => buyStocks(),
      commandFor: "info",
    },
    {
      command: "sell stocks",
      callback: () => sellStocks(),
      commandFor: "info",
    },
    {
      command: ["set stop-loss for stocks", "buy stop loss for stocks"],
      callback: () => stopLess(),
      commandFor: "info",
    },
  ];

  // get questions from the database
  useEffect(() => {
    (async () => {
      const {
        data: { docs },
      } = await axios.get(`${BACKEND_API_URL}/${QUESTIONS_ROUTE}`);

      setQuestions(docs);
    })();
  }, []);

  const [onlyCommands, setOnlyCommands] = useState([]);
  const [onlyCommandFor, setOnlyCommandFor] = useState([]);
  const [commandsWithQuestionWord, setCommandsWithQuestionWord] = useState([]);
  useEffect(() => {
    const newOnlyCommands = [];
    const newOnlyCommandFor = [];
    const newCommandWithQW = [];
    for (const index in commands) {
      const element = commands[index];
      // console.log(element);
      const { command, commandFor } = element;
      if (typeof command === "string") {
        // if (command.includes("what") || command.includes("how")) {
        if (command.match(/^what/) || command.match(/^how/)) {
          newCommandWithQW.push(command.toLocaleLowerCase());
        }
        newOnlyCommands.push(command.toLocaleLowerCase());
        newOnlyCommandFor.push(commandFor);
      } else {
        for (let index = 0; index < command.length; index++) {
          const stringC = command[index];
          // if (stringC.includes("what") || stringC.includes("how")) {
          // stringC.match(new RegExp("what's")) ||
          if (stringC.match(/^what/) || stringC.match(/^how/)) {
            newCommandWithQW.push(stringC.toLocaleLowerCase());
          }
          newOnlyCommands.push(stringC.toLocaleLowerCase());
          newOnlyCommandFor.push(commandFor);
        }
      }
    }
    setOnlyCommands(newOnlyCommands);
    setOnlyCommandFor(newOnlyCommandFor);
    setCommandsWithQuestionWord(newCommandWithQW);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // give me list of most active stocks
  // the most active stock of yesterday is list of stocks
  const { transcript, listening, resetTranscript, finalTranscript } =
    useSpeechRecognition({
      commands,
    });
  const [isCommandExist, setIsCommandExist] = useState(true);
  const [isCommandQuestion, setIsCommandQuestion] = useState(false);

  const [isStopListing, setIsStopListing] = useState(false);
  // code for handling unknown commands
  const responseFoUnknownCommand = [
    "I didn't get that. you can try again... bro",
    "sorry i don't understand that. try again",
    "i don't understand that. try again",
    "i didn't get it. please try again",
    "i didn't get it. try again",
  ];
  useEffect(() => {
    // check if finalTranscript is one of the questions

    let foundQuestion = null;
    if (finalTranscript) {
      for (let index = 0; index < questions.length; index++) {
        let { question } = questions[index];
        let questionNoOptionsWord;
        if (question.includes("the"))
          questionNoOptionsWord = question.replace(" the", "");

        // remove '?' symbol from  question
        if (question.includes("?")) {
          questionNoOptionsWord = questionNoOptionsWord.replace("?", "");
          question = question.replace("?", "");
        }

        console.log({
          questionNoOptionsWord,
          question,
          finalTranscript,
        });

        if (
          finalTranscript.toLocaleLowerCase() === question ||
          finalTranscript.toLocaleLowerCase() === questionNoOptionsWord
        )
          foundQuestion = questions[index];
      }

      if (foundQuestion) {
        // console.log("do something 🧐🧐");
        handleOpenModal(foundQuestion.question, foundQuestion.answer);
        response(foundQuestion.answer);
        setCurrentQuestion(foundQuestion);
        const timeout = foundQuestion.answer.length > 80 ? 1000 * 10 : 1000 * 7;

        setTimeout(() => {
          handleCloseModal();
        }, timeout);
        setIsCommandQuestion(true);
      }

      // const checkForQW = finalTranscript.includes("what") || finalTranscript.includes("how")

      // if(checkForQW && commandsWithQuestionWord.includes(finalTranscript))
    }

    let isCommandExistLocal = false;
    // the command not question and finalTranscript not empty string
    if (!foundQuestion && finalTranscript) {
      // console.log(
      //   onlyCommands.includes(finalTranscript.toLocaleLowerCase())
      // );
      let foundCommand = "";
      for (let index = 0; index < onlyCommands.length; index++) {
        let element = onlyCommands[index];
        let transcript = finalTranscript;

        if (element.includes("(") && element.includes(")")) {
          const optionalWord = element
            .match(/\((.*?)\)/)[0]
            .replace("(", "")
            .replace(")", "");
          transcript = transcript.replace(" " + optionalWord, "").trim();

          // if the optional word is the first word then there is no white space behind it

          if (element.indexOf("(") === 0)
            element = element.replace(/\((.*?)\)/, "").trim();
          // else there is white space so we need to remove it
          else element = element.replace(/ \((.*?)\)/, "").trim();
        }

        console.log({ transcript, element });
        if (element.includes("*")) {
          const indexDynamic = element.split(" ").indexOf("*");
          const lastWordBeforeDynamic = element.split(" ")[indexDynamic - 1];

          let fistWordAfterDynamic = "";
          // let fistIndexAfterDynamic = -1
          if (element.split(" ").length > indexDynamic + 1)
            fistWordAfterDynamic = element.split(" ")[indexDynamic + 1];
          // if (element.replace(/\((.*?)\)/, ""))

          // const isSameAfterDynamicWord = fistWordAfterDynamic &&
          if (
            transcript
              .split(" ")
              .slice(0, indexDynamic)
              .join(" ")
              .toLocaleLowerCase() ===
            element.split(" ").slice(0, indexDynamic).join(" ")
          ) {
            if (fistWordAfterDynamic) {
              const checkWithoutDynamicWord =
                element.split(" ").slice(0, indexDynamic).join(" ") +
                  " " +
                  element
                    .split(" ")
                    .slice(indexDynamic + 1)
                    .join(" ") ===
                transcript.split(" ").slice(0, indexDynamic).join(" ") +
                  " " +
                  transcript
                    .split(" ")
                    .slice(transcript.split(" ").indexOf(fistWordAfterDynamic))
                    .join(" ");
              const checkDWInCommandNotSameIndexDWInTranscript =
                transcript.split(" ").indexOf(fistWordAfterDynamic) !==
                indexDynamic;

              const checkDWIsExistInTranscript =
                transcript.split(" ").indexOf(fistWordAfterDynamic) !== -1;
              const finalCondition =
                checkWithoutDynamicWord &&
                checkDWIsExistInTranscript &&
                checkDWInCommandNotSameIndexDWInTranscript;

              // console.log({
              //   checkDWInCommandNotSameIndexDWInTranscript,
              //   checkWithoutDynamicWord,
              //   checkDWIsExistInTranscript,
              //   finalCondition,
              // });

              if (finalCondition) {
                isCommandExistLocal = true;
                foundCommand = onlyCommands[index];
              }
            } else {
              // console.log("here 1");
              // fix the error here
              isCommandExistLocal = true;
              foundCommand = onlyCommands[index];
            }
          }
        } else {
          if (element === transcript.toLocaleLowerCase()) {
            isCommandExistLocal = true;
            foundCommand = onlyCommands[index];
          }
        }
      }

      if (isCommandExistLocal) {
        const currentCommandFor =
          onlyCommandFor[onlyCommands.indexOf(foundCommand)];

        const currentPath = pathname.split("/")[1];

        // making  commands works from any page not just from the command that for
        if (
          currentCommandFor !== "every section" &&
          currentPath !== currentCommandFor
        ) {
          history.push(`/${currentCommandFor}`);
        }

        // console.log(onlyCommands.indexOf(transcript));

        // if(checkForQW && commandsWithQuestionWord.includes(finalTranscript))
      }
      console.log({ isCommandExist: isCommandExistLocal });

      setIsCommandExist(isCommandExistLocal);
      if (!isCommandExistLocal) {
        const checkForQW =
          finalTranscript.match(/^what/) || finalTranscript.match(/^how/);
        if (checkForQW) {
          response(`do you want me to learn about ${finalTranscript}`);
          setSecondCommandFor("findingAnswer");
          // console.log("do something 🧐🧐");
          setFindingAnswerFor(finalTranscript);
        } else response(responseFoUnknownCommand);
      }

      const autoResetTranscriptNotWorking = [
        "of course yes",
        "of course yeah",
        "yes",
        "yeah",
        "stop reading",
        "stop listening",
        "read the news",
      ];
      if (autoResetTranscriptNotWorking.includes(transcript)) resetTranscript();
    }
    foundQuestion = null;
  }, [finalTranscript]);

  // reset transcript
  useEffect(() => {
    if (speaking && (!isReadingHeadLines || !isCommandExist)) {
      if (!isStopListing) {
        resetTranscript();

        setTimeout(() => {
          toggle();
        }, 1000 * 5);
      }
      setIsStopListing(false);
      setIsCommandExist(true);
    }
  }, [resetTranscript, speaking]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  const NewsPageProps = { activeArticle, newsArticles };
  const FinanbroBtnProps = {
    // onClick: () =>
    //   SpeechRecognition.startListening({
    //     language: "zh-CN",
    //   }),
    onClick: () => {
      if (!listening) SpeechRecognition.startListening({ continuous: true });
      else SpeechRecognition.stopListening();
    },
    isListening: listening,
    isSpeaking: speaking,
    transcript,
  };

  const modalProps = {
    open: openModal,
    handleClose: handleCloseModal,
    title: modalTitle,
    content: modalContent,
  };

  return {
    isBrowserSupportsSpeechRecognition:
      SpeechRecognition.browserSupportsSpeechRecognition(),
    NewsPageProps,
    FinanbroBtnProps,
    modalProps,
  };
};
