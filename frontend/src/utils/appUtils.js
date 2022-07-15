import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import axios from "axios";
// import { useAudio } from "../hooks/useAudio";
import { useInfoCommandsHandler } from "../components/finanbroBtn/hooks/useInfoCommandsHandler";
import {
  getNews,
  useNewsCommandsHandler,
} from "../components/finanbroBtn/commandsHandler";
import {
  secondCommandOptions,
  useResponse,
} from "../components/finanbroBtn/hooks/useResponse";
import { useHistory, useLocation } from "react-router-dom";
import { useCommonCommandsHandler } from "../components/finanbroBtn/hooks/useCommonCommandsHandler";
import { BACKEND_API_URL, QUESTIONS_ROUTE } from "./serverUtils";
import { useTradingCommendsHandler } from "../components/finanbroBtn/hooks/useTradingCommendsHandler";
import { useBackTest } from "../components/Simulator/utils/useBackTest";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sleep } from "./sleep";
import { useReduxActions } from "../hooks/useReduxActions";
import { useUserCommandsHandler } from "../components/finanbroBtn/hooks/useUserCommandsHandler";
import { useSelector } from "react-redux";
import QuestionEndPoints from "../services/Questions";
// export const useSecondCommand = (commands) => {
//   const { transcript } = useSpeechRecognition();
// };

const COMMAND_LENGTH_NOT_COMMAND = 66;
export const useFinansis = ({
  isWaitingUserDone,
  setIsWaitingUserDone,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalIsInput, setModalIsInput] = useState(false);
  const [modalIsLabel, setModalIsLabel] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [foundBuySignalStocks, setFoundBuySignalStocks] =
    useState([]);
  const [soldStocks, setSoldStocks] = useState([
    {
      dateOfBuying: "2020-02-18",
      dateOfSelling: "2020-03-18",
      boughtPrice: 93.61,
      currentPrice: 80.3,
      previousPrice: 72.67,
      shares: 712,
      stopLossPrice: 65.53,
      symbol: "ABBV",
    },
  ]);
  // const [first, setfirst] = useState(second)
  const {
    closeModal,
    updateIsStartRecognize,
    updateSecondCommand,
    updateIsServerDown,
    updateIsLoading,
    updateCommandsNum,
  } = useReduxActions();

  const {
    user_store: { userData },
    response_store: { isLoading, isServerDown },
  } = useSelector((state) => state);

  const handleOpenModal = (title, content, isInput, label) => {
    setOpenModal(true);
    setModalTitle(title);
    setModalContent(content);
    setModalIsInput(isInput);
    setModalIsLabel(label);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    closeModal();
  };

  const [isForceSellAgain, setIsForceSellAgain] =
    useState(false);

  const {
    response,
    speaking,
    responseAfterTimeout,
    cancel,
    respondedWithYesSC,
    respondedWithNoSC,
    setSecondCommandFor,
    responseAsync,
    secondCommandFor,
  } = useResponse(SpeechRecognition);

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
    handleScrollDetailPage,
    // setIsStopReading,
    isStopReading,
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
    showSoldStockChart,
    setFoundMultiple,
  } = useInfoCommandsHandler(
    response,
    handleOpenModal,
    handleCloseModal,
    soldStocks,
    setSecondCommandFor
  );

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
    handleCloseAnyPopup,
    goForward,
    howCanHelp,
    showCommands,
    commandsAnswer,
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
    setQuestions,
    handleClosePopupWindow,
    closeChart,
    closeTheMost
  );

  const {
    buyStocks,
    sellStocks,
    stopLess,
    startBackTesting,
    forceSellingHandler,
    resetBTDataHandler,
    sellWithProfitOrNot,
    tradeStocks,
    findBuySignal,
    openProgressModal,
  } = useTradingCommendsHandler(
    response,
    setSecondCommandFor,
    SpeechRecognition,
    handleOpenModal,
    isWaitingUserDone,
    setIsWaitingUserDone,
    isForceSellAgain,
    setIsForceSellAgain,
    setFoundBuySignalStocks,
    setSoldStocks,
    handleCloseModal
  );

  const {
    signUp,
    login,
    updateUserInfo,
    sendResetForgotPassToken,
    logout,
    updatePassword,
    addToWatchList,
    showWatchList,
    deleteFromWatchList,
    whatsMy,
    showMeMyInfo,
    checkIsVPN,
  } = useUserCommandsHandler(
    response,
    handleOpenModal,
    setSecondCommandFor,
    openYahooFinance,
    setFoundMultiple,
    handleCloseModal
  );

  const [findingAnswerFor, setFindingAnswerFor] = useState("");

  // const { startBackTesting } = useBackTest();
  const commands = [
    {
      command: ["sign up", "register"],
      commandFor: "every section",
      callback: async () => await signUp(),
    },
    {
      command: ["login", "log in"],
      commandFor: "every section",
      callback: async () => await login(),
    },
    {
      command: "forgot (my) password",
      commandFor: "every section",
      callback: async () => await sendResetForgotPassToken(),
    },
    {
      command: [
        "update my info",
        "change my info",
        "update my information",
        "change my information",
      ],
      commandFor: "every section",
      callback: async () => await updateUserInfo(),
    },
    {
      command: ["logout", "log out"],
      commandFor: "every section",
      callback: async () => await logout(),
    },
    {
      command: ["update (my) password", "change (my) password"],
      commandFor: "every section",
      callback: async () => await updatePassword(),
    },
    {
      command: [
        "add * stock to (my) watch list",
        "add * stock to (my) watchlist",
      ],
      commandFor: "every section",
      callback: async (target) => await addToWatchList(target),
    },
    {
      command: [
        "delete * stock from (my) watchlist",
        "delete * stock from (my) watch list",
        "remove * stock from (my) watchlist",
        "remove * stock from (my) watch list",
      ],
      commandFor: "every section",
      callback: async (target) => deleteFromWatchList(target),
    },

    {
      command: [
        "show me (my) watch list",
        "show me (my) watchlist",
        "open (my) watch list",
        "open (my) watchlist",
      ],
      commandFor: "every section",
      callback: async () => showWatchList(),
    },

    // // deleteFromWatchList
    // {
    //   command: "test",
    //   commandFor: "every section",
    //   callback: async () => {
    //     await responseAsync(
    //       "Firstly, wrap the index.js or the root app component of your application with the CookiesProvider component from the react-cookie package."
    //     );
    //     await responseAsync(
    //       "Cookies: Javascript object with all of the user’s cookies."
    //     );
    //     await responseAsync("someting short");
    //     await responseAsync("Function to remove the cookies.");
    //   },
    // },

    // {
    //   command: ["你叫什么名字"],
    //   callback: () =>
    //     speak({
    //       text: "我叫finansis",
    //       voice: voices[4],
    //     }),
    // },
    {
      command: ["* section", "show me * section (commands)"],
      callback: (section) => showCommands(section),
      commandFor: "every section",
    },
    {
      command: ["show me my info", "show me my infomation"],
      callback: () => showMeMyInfo(),
      commandFor: "every section",
    },
    {
      command: ["what is my *", "what's my *"],
      callback: (type) => whatsMy(type),
      commandFor: "every section",
    },
    {
      command: "how many commands do you understand",
      callback: (section) => commandsAnswer(section),
      commandFor: "every section",
    },
    {
      command: [
        "help (me)",
        "what can you do",
        "how can you help me",
      ],
      callback: () => howCanHelp(),
      commandFor: "every section",
    },
    {
      command: ["what is your name", "what's your name"],
      callback: () =>
        response(["my name is finansis", "I'm finansis... bro"]),
      commandFor: "every section",
    },
    {
      command: ["Give me the news from *"],
      // callback: async (source) => await giveMeSource(source),
      // callback: async (source) => await giveMeSource(source),
      callback: async (source) =>
        await getNews("giveMeSource", source),
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
          setIsForceSellAgain,
        }),
      commandFor: "every section",
    },
    {
      command: ["no", "nope", "nah"],
      callback: () => respondedWithNoSC(),
      commandFor: "every section",
    },
    {
      command: "go back",
      callback: () => goBackHandler(),
      commandFor: "every section",
    },
    {
      command: [
        "with controlling it open article (number) *",
        "with control open article (number) *",
        "control open article (number) *",
        "with your control open article (number) *",
      ],
      callback: async (articleNum) =>
        await openArticleHandler(articleNum),
      commandFor: "news",
    },
    {
      command: "what's up with *",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async (query) =>
        await getNews("whatsUpWith", query),
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
      command: ["stop listening", "see you"],
      callback: () => handleStopListening(),
      commandFor: "every section",
    },
    {
      command: "go to * (page)",
      callback: (page) => handleGoToPage(page),
      commandFor: "every section",
    },
    // {
    //   command: [
    //     "close pop-up window",
    //     "close the window",
    //     "close the article",
    //   ],
    //   callback: async () => await handleClosePopupWindow(),
    //   commandFor: "news",
    // },

    {
      command: [
        "close pop-up window",
        "close the window",
        "close the article",
        "close (the) chart",
        "close charts",
        "close statistics",
        "close news (window)",
        "close (the) statistic",
        "close my watchList",
        "close the watchList",
      ],
      callback: async () => await handleCloseAnyPopup(),
      commandFor: "every section",
    },
    {
      command: "start reading (news) from article *",

      callback: async (num) => await readHeadLinesFrom(num),
      commandFor: "news",
    },

    // {
    //   command: [
    // "close (the) chart",
    // "close charts",
    // "close statistics",
    // "close news (window)",
    // "close (the) statistic",
    //   ],
    //   callback: async (target) => await closeChart(target),
    //   commandFor: "info",
    // },
    {
      command: [
        "open * (symbol) chart",
        "open * (symbol) tart",
        "open * (symbol) charge",
        "show me * (symbol) tart",
        "show me * (symbol) chart",
        "show me * (symbol) charge",
      ],
      callback: async (target) =>
        await openYahooFinance("chart", target),
      commandFor: "info",
    },
    {
      command: [
        "number *",
        "stock (number) *",
        "Talk (number) *",
        "Start (number) *",
      ],
      callback: async (num) => await foundMultipleStocks(num),
      commandFor: "info",
    },
    // it is a joke
    {
      command: "do you have a boyfriend",
      callback: async (num) => {
        response("off course, I do");
        response(
          "he is too handsome, too muscular, his name is"
        );
        await sleep(1000 * 3);
        response("Chris Hemsworth");
      },
      commandFor: "every section",
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
      command: "open article (number) *",

      callback: async (num) =>
        await openArticleWithoutControllerItHandler(num),
      commandFor: "news",
    },
    {
      command: [
        "what's the date today",
        "what is the date today",
        "what's today date",
        "what is today date",
        "what's today's date",
      ],
      callback: (num) => handleTodaysDate(num),
      commandFor: "every section",
    },
    {
      command: [
        "give me * statistics",
        "open * statistics",
        "show me * statistics",
      ],
      callback: async (target) =>
        await openYahooFinance("statistics", target),
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
      command: [
        "give me top stories from google finance",
        "give me top stories",
      ],
      callback: async () => await getNews("topStories"),
      commandFor: "news",
    },
    {
      command: [
        "open * (symbol) chart with your control",
        "open * (symbol) char with your control",
        "open * (symbol) tart with your control",
        "open * (symbol) chat with your control",
        "open * (symbol) chart with you control",
        "open * (symbol) char with you control",
        "open * (symbol) tart with you control",
        "open * (symbol) chat with you control",
        "open * chart controlled (by you)",
        "open * char controlled (by you)",
        "open * chat controlled (by you)",
        "open * tart controlled (by you)",
      ],
      callback: async (target) => {
        if (checkIsVPN())
          await openYahooFinance("chart", target, true);
      },

      commandFor: "info",
    },
    {
      command: "zoom *",
      callback: async (type) => await zoomChart(type),
      commandFor: "info",
    },
    {
      command: [
        "what is the current price for * (symbol)",
        "what's the current price for * (symbol)",
      ],
      callback: async (symbol) =>
        await openYahooFinance("currentPrice", symbol),
      commandFor: "info",
    },
    {
      command: [
        "show me * charts",
        "show me * tart",
        "open * charts",
        "open * tart",
      ],
      callback: async (companies) =>
        await openMultipleCharts(companies),
      commandFor: "info",
    },
    {
      command: "change the chart to *",
      callback: async (companies) =>
        await changeChartTo(companies),
      commandFor: "info",
    },
    {
      command: [
        "open details page for the answer",
        "open details (page) answer",
        "open detail (page) answer",
      ],
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
      callback: () => {
        if (checkIsVPN()) buyStocks();
      },
      commandFor: "trading",
    },
    {
      command: ["tell stocks", "sell stocks", "so stocks"],
      callback: () => {
        if (checkIsVPN()) sellStocks();
      },
      commandFor: "trading",
    },
    {
      command: [
        "set stop-loss for stocks",
        "set stop-loss",
        "buy stop loss for stocks",
        "buy stop loss",
        "set stop loss for stocks",
        "set stop loss",
      ],
      callback: () => {
        if (checkIsVPN()) stopLess();
      },
      commandFor: "trading",
    },
    {
      command: [
        "start back testing",
        "start Park testing",
        "start pack testing",
        "start practicing",
      ],
      callback: () => {
        if (checkIsVPN()) startBackTesting();
      },
      commandFor: "backTesting",
    },
    // it is a joke

    {
      command: ["thank you", "thanks"],
      callback: async () => {
        response("hate you");
        await sleep(3000);
        response("no sorry, I meant I love you");
      },
      commandFor: "every section",
    },
    {
      command: ["say hi", "say hey", "say hello"],
      callback: async () => {
        response("hi there");
        await sleep(1000);
        response("my name is Finansis");
      },
      commandFor: "every section",
    },
    {
      command: [
        "force",
        "force sell (again)",
        "for sale (again)",
      ],
      callback: async () => {
        if (checkIsVPN()) await forceSellingHandler();
      },
      commandFor: "backTesting",
    },
    {
      command: [
        "reset back testing (data)",
        "reset pack testing (data)",
        "reset back-testing (data)",
        "preset pack testing",
        "preset back testing",
      ],
      callback: async () => {
        if (checkIsVPN()) await resetBTDataHandler();
      },
      commandFor: "backTesting",
    },
    {
      command: [
        "sell with profit or without",
        "tell with profit or without",
        "so with profit or without",
        "cell with profit or without",
        "just so",
        "just sell",
        "just tell",
        "just cell",
        // "reset pack testing (data)",
        // "reset back-testing (data)",
      ],
      callback: async () => {
        if (checkIsVPN()) await sellWithProfitOrNot();
      },
      commandFor: "backTesting",
    },
    {
      command: ["trade stocks for me", "trade stocks"],
      callback: async () => {
        if (checkIsVPN()) await tradeStocks();
      },
      commandFor: "trading",
    },
    {
      command: ["give me * stock news"],
      callback: async (symbol) =>
        await openYahooFinance("news", symbol),
      commandFor: "news",
    },
    {
      command: [
        "find buy signals",
        "find buy signal",
        "find by signals",
        "find by signal",
      ],
      callback: async () => {
        if (checkIsVPN()) await findBuySignal();
      },
      commandFor: "trading",
    },
    {
      command: [
        "show me (a) chart for found buy signals (stocks)",
        "show me (a) chart for found buy signal (stocks)",
        "show me (a) chart for found by signals (stocks)",
        "show me (a) chart for found by signal (stocks)",
      ],
      callback: async () => {
        if (checkIsVPN())
          await openMultipleCharts(
            foundBuySignalStocks.join(" and ")
          );
      },
      commandFor: "trading",
    },
    {
      command: [
        "show me chart for salt tax",
        "sold stocks",
        "sold stocks chart",
        "sold tax chart",
        "salt tax chart",
        "salt stocks chart",
        "fold tax chart",
      ],
      callback: async () => {
        if (checkIsVPN()) await showSoldStockChart();
      },
      commandFor: "trading",
    },
    {
      command: "go forward",
      callback: async () => await goForward(),
      commandFor: "every section",
    },

    {
      command: [
        "show me trading progress",
        "open trading progress",
        "open trade in progress",
        "show me trade in progress",
      ],
      callback: async () => {
        if (checkIsVPN()) await openProgressModal();
      },
      commandFor: "every section",
    },
    // sellWithProfitOrNot
  ];

  // get questions from the database
  useEffect(() => {
    (async () => {
      try {
        console.log({ commandsNum: commands.length });
        updateCommandsNum(commands.length);
        // const {
        //   data: { docs },
        // } = await axios.get(
        //   `${BACKEND_API_URL}/${QUESTIONS_ROUTE}`
        // );

        const {
          data: { docs },
        } = await QuestionEndPoints.get();

        setQuestions(docs);
      } catch (error) {
        console.log(error.code);
        updateIsServerDown(true);
        setQuestions([]);
      }
      updateIsLoading(false);
    })();
  }, []);

  const [onlyCommands, setOnlyCommands] = useState([]);
  const [onlyCommandFor, setOnlyCommandFor] = useState([]);
  const [commandsWithQuestionWord, setCommandsWithQuestionWord] =
    useState([]);
  useEffect(() => {
    const newOnlyCommands = [];
    const newOnlyCommandFor = [];
    const newCommandWithQW = [];
    for (const index in commands) {
      const element = commands[index];
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
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition({
    commands,
  });
  const [isCommandExist, setIsCommandExist] = useState(true);
  const [isCommandQuestion, setIsCommandQuestion] =
    useState(false);

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

    //   // const checkForQW = finalTranscript.includes("what") || finalTranscript.includes("how")

    //   // if(checkForQW && commandsWithQuestionWord.includes(finalTranscript))
    // }

    let isCommandExistLocal = false;
    // the command not question and finalTranscript not empty string
    // if (!foundQuestion && finalTranscript) {
    if (finalTranscript) {
      let foundCommand = "";
      for (let index = 0; index < onlyCommands.length; index++) {
        let element = onlyCommands[index];
        let transcript = finalTranscript;

        if (element.includes("(") && element.includes(")")) {
          const optionalWord = element
            .match(/\((.*?)\)/)[0]
            .replace("(", "")
            .replace(")", "");
          transcript = transcript
            .replace(" " + optionalWord, "")
            .trim();

          // if the optional word is the first word then there is no white space behind it

          if (element.indexOf("(") === 0)
            element = element.replace(/\((.*?)\)/, "").trim();
          // else there is white space so we need to remove it
          else
            element = element.replace(/ \((.*?)\)/, "").trim();
        }

        console.log({ transcript, element });
        if (element.includes("*")) {
          const indexDynamic = element.split(" ").indexOf("*");
          const lastWordBeforeDynamic =
            element.split(" ")[indexDynamic - 1];

          let fistWordAfterDynamic = "";
          // let fistIndexAfterDynamic = -1
          if (element.split(" ").length > indexDynamic + 1)
            fistWordAfterDynamic =
              element.split(" ")[indexDynamic + 1];
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
                element
                  .split(" ")
                  .slice(0, indexDynamic)
                  .join(" ") +
                  " " +
                  element
                    .split(" ")
                    .slice(indexDynamic + 1)
                    .join(" ") ===
                transcript
                  .split(" ")
                  .slice(0, indexDynamic)
                  .join(" ") +
                  " " +
                  transcript
                    .split(" ")
                    .slice(
                      transcript
                        .split(" ")
                        .indexOf(fistWordAfterDynamic)
                    )
                    .join(" ");
              const checkDWInCommandNotSameIndexDWInTranscript =
                transcript
                  .split(" ")
                  .indexOf(fistWordAfterDynamic) !==
                indexDynamic;

              const checkDWIsExistInTranscript =
                transcript
                  .split(" ")
                  .indexOf(fistWordAfterDynamic) !== -1;
              const finalCondition =
                checkWithoutDynamicWord &&
                checkDWIsExistInTranscript &&
                checkDWInCommandNotSameIndexDWInTranscript;

              if (finalCondition) {
                isCommandExistLocal = true;
                foundCommand = onlyCommands[index];
              }
            } else {
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

        // if(checkForQW && commandsWithQuestionWord.includes(finalTranscript))
      }
      // debugger;
      // ignore command longer than COMMAND_LENGTH_NOT_COMMAND
      if (transcript.length > COMMAND_LENGTH_NOT_COMMAND) {
        resetTranscript();

        return;
      }
      setIsCommandExist(isCommandExistLocal);

      if (!isCommandExistLocal) {
        // Look for questions
        if (finalTranscript && questions.length !== undefined) {
          for (
            let index = 0;
            index < questions.length;
            index++
          ) {
            let { question } = questions[index];
            let questionNoOptionsWord;
            if (question.includes("the"))
              questionNoOptionsWord = question.replace(
                " the",
                ""
              );

            // remove '?' symbol from  question
            if (question.includes("?")) {
              questionNoOptionsWord =
                questionNoOptionsWord.replace("?", "");
              question = question.replace("?", "");
            }

            if (
              finalTranscript.toLocaleLowerCase() === question ||
              finalTranscript.toLocaleLowerCase() ===
                questionNoOptionsWord
            )
              foundQuestion = questions[index];
          }

          if (foundQuestion) {
            handleOpenModal(
              foundQuestion.question,
              foundQuestion.answer
            );
            response(foundQuestion.answer);
            setCurrentQuestion(foundQuestion);
            const timeout =
              foundQuestion.answer.length > 80
                ? 1000 * 10
                : 1000 * 7;

            setTimeout(() => {
              handleCloseModal();
            }, timeout);
            setIsCommandQuestion(true);
          } else {
            const checkForQW =
              finalTranscript.match(/^what/) ||
              finalTranscript.match(/^how/);
            if (checkForQW) {
              response(
                `do you want me to learn about ${finalTranscript}`
              );
              setSecondCommandFor("findingAnswer");
              updateSecondCommand(null);
              setFindingAnswerFor(finalTranscript);
            } else response(responseFoUnknownCommand);
          }

          // const checkForQW = finalTranscript.includes("what") || finalTranscript.includes("how")

          // if(checkForQW && commandsWithQuestionWord.includes(finalTranscript))
        }
      }

      const autoResetTranscriptNotWorking = [
        "of course yes",
        "of course yeah",
        "yes",
        "yeah",
        "stop reading",
        "stop listening",
        "read the news",
        "see you",
      ];
      if (autoResetTranscriptNotWorking.includes(transcript))
        resetTranscript();
    }
    foundQuestion = null;
  }, [finalTranscript]);

  // reset transcript
  useEffect(() => {
    if (speaking && (!isReadingHeadLines || !isCommandExist)) {
      if (!isStopListing) {
        resetTranscript();

        // setTimeout(() => {
        //   toggle();
        // }, 1000 * 5);
      }
      setIsStopListing(false);
      setIsCommandExist(true);
    }
  }, [resetTranscript, speaking]);

  const NewsPageProps = { activeArticle, newsArticles };
  const FinanbroBtnProps = {
    // onClick: () =>
    //   SpeechRecognition.startListening({
    //     language: "zh-CN",
    //   }),

    handleStopReading,
    onClick: () => {
      if (isLoading)
        return response(
          "the app is loading please wait a second"
        );
      if (isServerDown)
        return response(
          "the server is down, I can't help you now, try later"
        );
      if (!listening) {
        SpeechRecognition.startListening({ continuous: true });
        updateIsStartRecognize(true);

        if (!secondCommandFor && !userData) {
          response("you not login, do you want to login");
          updateSecondCommand({
            type: secondCommandOptions.login,
            other: { action: "login" },
          });
          setSecondCommandFor({
            type: secondCommandOptions.login,
            other: { callback: login, action: "login" },
          });
        }
      } else {
        SpeechRecognition.stopListening();
        updateIsStartRecognize(false);
      }
    },
    isListening: listening,
    isSpeaking: speaking,
    transcript,
  };

  const handleKeyDown = (e) => {
    if (isLoading)
      return response("the app is loading please wait a second");
    if (isServerDown)
      return response(
        "the server is down, I can't help you now, try later"
      );

    if (e.key === "Control") {
      FinanbroBtnProps.onClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [isServerDown, isLoading]);
  const modalProps = {
    open: openModal,
    handleClose: handleCloseModal,
    title: modalTitle,
    content: modalContent,
    isInput: modalIsInput,
    label: modalIsLabel,
  };
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return {
    isBrowserSupportsSpeechRecognition:
      SpeechRecognition.browserSupportsSpeechRecognition(),
    NewsPageProps,
    FinanbroBtnProps,
    modalProps,
    isReadingHeadLines,
    isMicrophoneAvailable,
  };
};
