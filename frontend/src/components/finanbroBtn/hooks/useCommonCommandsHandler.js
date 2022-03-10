import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PAGES } from "../../../App";
import { AUTO_API_URL } from "../../../utils/serverUtils";
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
  closeChart
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

  const openAnswerDetail = (questionObject) => {
    console.log({ questionObject });
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

  const closeAnswerDetail = async () => {
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
      response(`there is no chart open to close it`);
    }
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
    // 0 false, any other number true
    if (historyStack.length > 1) {
      // console.log(location);

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

      console.log(history.location.pathname);
    } else {
      response("there is nothing back");
      responseAfterTimeout("good morning", { timeout: 500 });
    }
  };

  const goForward = () => {
    if (forwardStack.length) {
      // console.log(location);

      history.goForward();
      response("going forward");

      const poppedPage = forwardStack.pop(
        history.location.pathname
      );
      setForwardStack(forwardStack);

      historyStack.push(poppedPage);
      setHistoryStack(historyStack);

      console.log(history.location.pathname);
    } else {
      response("there is nothing forward");
      // responseAfterTimeout("good morning", { timeout: 500 });
    }
  };

  const handleStopListening = () => {
    console.log("here");
    SpeechRecognition.stopListening();
    response("okay, I'll stop listening");
  };

  const { pathname } = useLocation();

  const handleGoToPage = (page) => {
    console.log({ page, pathname });

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
    else {
      const paths = PAGES.map(({ path }) => path.split("/")[1]);
      console.log("🧐");
      console.log(paths);
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
    // console.log(
    //   new Intl.DateTimeFormat("en-US", options).format(today)
    // );
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
  };

  const handleCloseAnyPopup = async () => {
    console.log("in handleCloseAnyPopup");
    const isWindowClose = await handleClosePopupWindow();
    console.log({ isWindowClose });
    if (!isWindowClose) await closeChart();
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
  };
};
