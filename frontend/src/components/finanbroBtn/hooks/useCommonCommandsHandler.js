import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PAGES } from "../../../App";
export const useCommonCommandsHandler = (
  setPageNumber,
  setNewsArticles,
  response,
  responseAfterTimeout,
  newsArticles,
  SpeechRecognition,
  handleOpenModal,
  handleCloseModal
) => {
  const history = useHistory();

  const [appHistoryIndex, setAppHistoryIndex] = useState(0);

  // limiting the user to only move throw the app for 'go back' command
  useEffect(() => {
    return history.listen(() => {
      if (history.action === "PUSH") {
        setAppHistoryIndex(appHistoryIndex + 1);
      }

      if (history.action === "POP") {
        setAppHistoryIndex(appHistoryIndex - 1);
      }
    });
  }, [appHistoryIndex]);

  const goBackHandler = () => {
    // handling going back from list articles page to main news page
    if (newsArticles.length) {
      response("back to the main news page");
      setNewsArticles([]);
      setPageNumber(1);
      return;
    }
    // 0 false, any other number true
    if (appHistoryIndex > 0) {
      // console.log(location);

      history.goBack();
      response("going back");

      console.log(history.location.pathname);
    } else {
      response("there is nothing back");
      responseAfterTimeout("good morning", { timeout: 500 });
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

    // handling going to the current page
    if (
      (pathname === "/" && page.toLocaleLowerCase() === "home") ||
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

  return {
    goBackHandler,
    handleStopListening,
    handleGoToPage,
    handleTodaysDate,
  };
};
