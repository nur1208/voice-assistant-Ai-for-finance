import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { PAGES } from "../../../App";
import { useReduxActions } from "../../../hooks/useReduxActions";
import { AUTO_API_URL } from "../../../utils/serverUtils";
import { Typography } from "@mui/material";
export const useCommonCommandsHandler = (
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
) => {
  const history = useHistory();

  const [appHistoryIndex, setAppHistoryIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState([
    history.location.pathname,
  ]);
  const [forwardStack, setForwardStack] = useState([]);
  const [openedWindowNum, setOpenedWindowNum] = useState(0);
  const width = window.outerWidth - 20;
  const height = window.outerHeight - 20;
  const [popupWindow, setPopupWindow] = useState(null);

  const {
    modal_store: { isModalOpen },
    response_store: { comandsNum },
  } = useSelector((state) => state);

  const { updateIsStartRecognize, updateModal, closeModal } =
    useReduxActions();

  const openAnswerDetail = (questionObject) => {
    if (!questionObject) {
      response("there is no detail answer page to open");
      return;
    }

    response("opening details page for the answer");
    const newPopupWindow = window.open(
      questionObject.referenceUrl,
      `ORIGIN_DETAILS_ANSWER_WINDOW_${openedWindowNum + 1}`,
      `popup,width=${width},height=${height}`
    );

    if (popupWindow)
      setPopupWindow([...popupWindow, newPopupWindow]);
    else setPopupWindow([newPopupWindow]);

    setOpenedWindowNum(openedWindowNum + 1);
  };

  const closeAnswerDetail = () => {
    let isWindowClose = true;
    if (popupWindow) {
      if (popupWindow.length === 1)
        response(`closing the window`);
      else response(`closing all windows`);

      for (let index = 0; index < popupWindow.length; index++) {
        const window = popupWindow[index];
        window.close();
      }
      setPopupWindow(null);
      // popupWindow.close();
    } else {
      // response(`there is no chart open to close it`);
      isWindowClose = false;
    }

    return isWindowClose;
  };
  // limiting the user to only move throw the app for 'go back' command

  // useEffect(() => {
  //   return history.listen(() => {
  //     if (history.action === "PUSH") {
  //       setAppHistoryIndex(appHistoryIndex + 1);
  //       // historyStack.push(history.location.pathname);
  //       // setHistoryStack(historyStack);
  //       // setBackIndexHistory(backIndexHistory + 1);
  //     }

  //     if (history.action === "POP") {
  //       setAppHistoryIndex(appHistoryIndex - 1);
  //       // const poppedPage = historyStack.pop(
  //       //   history.location.pathname
  //       // );
  //       // setHistoryStack(historyStack);

  //       // forwardStack.push(poppedPage);
  //       // setForwardStack(forwardStack);
  //     }
  //   });
  // }, [appHistoryIndex]);

  const goBackHandler = () => {
    // handling going back from list articles page to main news page
    if (newsArticles.length) {
      response("back to the main news page");
      setNewsArticles([]);
      setPageNumber(1);
      return;
    }

    if (historyStack.length > 1) {
      history.goBack();
      response("going back");

      const poppedPage = historyStack.pop(
        history.location.pathname
      );
      setHistoryStack(historyStack);

      forwardStack.push(poppedPage);
      setForwardStack(forwardStack);

      // forwardStack.push(poppedPage);
      // setForwardStack(forwardStack);
    } else {
      response("there is nothing back");
      responseAfterTimeout("good morning", { timeout: 500 });
    }
  };

  const goForward = () => {
    if (forwardStack.length) {
      history.goForward();
      response("going forward");

      const poppedPage = forwardStack.pop(
        history.location.pathname
      );
      setForwardStack(forwardStack);

      historyStack.push(poppedPage);
      setHistoryStack(historyStack);
    } else {
      response("there is nothing forward");
      // responseAfterTimeout("good morning", { timeout: 500 });
    }
  };

  const handleStopListening = () => {
    updateIsStartRecognize(false);

    SpeechRecognition.stopListening();
    response("okay, I'll stop listening");
  };

  const { pathname } = useLocation();

  const handleGoToPage = (page) => {
    // let pageLocal

    // handling going to the current page
    if (
      (pathname === "/" &&
        page.toLocaleLowerCase() === "home") ||
      pathname.split("/")[1] === page.toLocaleLowerCase()
    ) {
      response(`you are in ${page} page`);
      return;
    }

    if (page === "home") history.push("/");
    else if (page === "back testing" || page === "pack testing")
      history.push("/backTesting");
    else {
      const paths = PAGES.map(({ path }) => path.split("/")[1]);
      if (paths.includes(page.toLocaleLowerCase())) {
        history.push(`/${page}`);

        // handle not exist page
      } else {
        response(`${page} page is not exist`);
        return;
      }
    }
    response(`here is ${page} page`);
    historyStack.push(page);
    setHistoryStack(historyStack);
    if (forwardStack.length) {
      setForwardStack([]);
    }
  };

  const handleTodaysDate = () => {
    const today = new Date(Date.now());
    // var options = { dateStyle: "full", timeStyle: "long" };
    var options = { dateStyle: "full" };
    // new Intl.DateTimeFormat("en-US", options);

    handleOpenModal(
      "today's date is:",
      new Intl.DateTimeFormat("en-US", options).format(today)
    );
    response(
      new Intl.DateTimeFormat("en-US", options).format(today)
    );

    setTimeout(() => {
      handleCloseModal();
    }, 1000 * 7);
  };

  const handleFindingAnswer = async (
    findingAnswerFor,
    setCurrentQuestion
  ) => {
    try {
      const {
        data: { questionObject },
      } = await axios.post(`${AUTO_API_URL}/findingAnswers`, {
        question: findingAnswerFor,
      });

      handleOpenModal(
        questionObject.question,
        questionObject.answer
      );
      response(questionObject.answer);

      const timeout =
        questionObject.answer.length > 80 ? 1000 * 10 : 1000 * 7;

      setTimeout(() => {
        handleCloseModal();
      }, timeout);

      setCurrentQuestion(questionObject);

      setQuestions([...questions, questionObject]);
    } catch (error) {
      console.log(error);

      console.log(error?.response?.status);

      if (error?.response?.status === 404)
        return response(error.response.data.message);
      response(
        "something went wrong from auto server, please try again later"
      );
    }
  };

  const handleCloseAnyPopup = async () => {
    let isWindowClose;
    isWindowClose = await handleClosePopupWindow();
    if (!isWindowClose) {
      isWindowClose = closeTheMost();
    }

    // debugger;
    if (isModalOpen && !isWindowClose) {
      response("closing popup window");
      handleCloseModal();
      updateModal({ isModalOpen: false });
      isWindowClose = true;
    }

    if (!isWindowClose) {
      isWindowClose = closeAnswerDetail();
    }

    if (!isWindowClose) await closeChart();
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     handleOpenModal("today's date is:", "something");
  //     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown

  //     // Chrome requires returnValue to be set
  //     e.returnValue =
  //       "it is better to let me close all window browsers first";
  //   };
  //   window.addEventListener("beforeunload", async function (e) {
  //     // Cancel the event
  //     handleBeforeUnload(e);
  //   });
  //   return async () => {
  //     window.removeEventListener("beforeunload", async (e) => {
  //       handleBeforeUnload(e);
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const sections = [
    "news",
    "trading",
    "common",
    "stock info",
    "user",
  ];

  const howCanHelp = () => {
    const renderContent = () =>
      sections.map((section, index) => (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {section} section
        </Typography>
      ));
    response("I help you with finance using the stock market");
    response(
      "plese select a section to show you all possible commands"
    );
    updateModal({
      open: true,
      isModalOpen: true,
      renderContent,
      title:
        "select a section to show you all possible commands:",
    });
  };

  const secoinsCommands = {
    user: [
      "login",
      "sign up",
      "update my info",
      "forgot (my) password",
      "logout",
      "update (my) password",
      "add {Apple|AAPL|...} stock to (my) watch list",
      "delete {Apple|AAPL|...} stock from (my) watch list",
      "open (my) watch list",
      "what's my {name|email|gender}",
      "show me my infomation",
    ],
    trading: [
      "buy stocks",
      "sell stocks",
      "start back testing",
      "reset back testing (data)",
      "force sell",
      "sell with profit or without",
      "set stop loss for stocks",
      "trade stocks for me",
      "find buy signals",
      "show me (a) chart for found buy signals (stocks)",
      "sold stocks chart",
      "show me trading progress",
    ],
    news: [
      "Give me the news from {yahoo finance|investing|seekingalpha}",
      "with control open article (number) {1|5|...}",
      "what's up with {Apple|China|...}",
      "Give me the latest new",
      "read the news",
      "give me more news",
      "start reading (news) from article {1|5|...}",
      "open article (number) {1|5|...}",
      "give me top stories",
      "give me {Apple|AAPL|...} stock news",
    ],
    info: [
      "open {Apple|AAPL|...} (symbol) chart",
      "give me {Apple|AAPL|...} statistics",
      "give me The most {actives|gainers|losers} stocks",
      "give me trending stocks",
      "open {Apple|AAPL|...} (symbol) chart with your control",
      "what is the current price for {Apple|AAPL|...} (symbol)",
      "show me {Apple and Tesla|AAPL and DD|Apple and Tesla and amazon|...} charts",
    ],
    common: [
      "stock (number) {1|5|...}",
      "what can you do",
      "what is your name",
      "(of course) yes",
      "no",
      "do you have a boyfriend",
      "can you hear me",
      "stop listening",
      "thank you",
      "what's the date today",
      "how many commands do you understand",
    ],
  };

  const showCommands = (section) => {
    if (!sections.includes(section.toLowerCase()))
      return response(`${section} section not exist`);

    if (isModalOpen) closeModal();
    const renderContent = () =>
      secoinsCommands[section.toLowerCase()].map(
        (command, index) => (
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            - {command}
          </Typography>
        )
      );
    updateModal({
      open: true,
      isModalOpen: true,
      renderContent,
      title: `${section} commands:`,
    });
    response(`here is ${section} commands`);
  };

  const commandsAnswer = () => {
    response(`I can understand ${comandsNum} differnt commands`);
  };

  return {
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
  };
};
