import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useReduxActions } from "../../hooks/useReduxActions";
import {
  AUTO_API_URL,
  NEWS_API_URL_C,
} from "../../utils/serverUtils";
import { wordToNumber } from "../../utils/wordToNumber";
import { MODAL_TYPE_OPTIONS } from "../Modal/BasicModal/BasicModalUtils";
import { OTHER_USER_FIELDS } from "./hooks/useOtherUserFields";
import { sleep } from "../../utils/sleep";
// import puppeteer from "puppeteer";

import { useResponse } from "./hooks/useResponse";

export const handleGiveMeMoreNews = async (
  pageNumber,
  setPageNumber
) => {
  let NEWS_API_URL = `http://localhost:4050/api/v1/news?page=${
    pageNumber + 10
  }`;
  setPageNumber(pageNumber + 10);
  const {
    data: { articles, isExist },
  } = await axios.get(NEWS_API_URL);
};

export const useNewsCommandsHandler = (
  response,
  responseAfterTimeout,
  cancel,
  setSecondCommandFor
) => {
  // const { response, responseAfterTimeout, cancel } = useResponse();
  const [pageNumber, setPageNumber] = useState(1);
  const [lastGetNewsCommand, setLastGetNewsCommand] = useState({
    type: "",
  });
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  // const [secondCommandFor, setSecondCommandFor] = useState("");
  const [timeoutIdsForReadingH, setTimeoutIdsForReadingH] =
    useState([]);
  const [timeoutIdsForScrolling, setTimeoutIdsForScrolling] =
    useState([]);
  const [isStopReading, setIsStopReading] = useState(false);

  const [isScrolling, setIsScrolling] = useState(false);
  const {
    user_store: { userData },
  } = useSelector((state) => state);
  const { updateModal } = useReduxActions();
  const getNews = async (type, query) => {
    response(`finding`);
    // 445938e7b4214f4988780151868665cc
    // response(`finding news from ${source}`);
    // const API_KEY = "c8be8b2944eb4366aac8e7c44e783746";
    // const API_KEY = "445938e7b4214f4988780151868665cc";
    // let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&language=en`;
    // let NEWS_API_URL = `http://localhost:4050/api/v1/news?`;
    let NEWS_API_URL = NEWS_API_URL_C;

    let lastCommand;
    if (type === "giveMeMore") {
      NEWS_API_URL = `${NEWS_API_URL}&page=${pageNumber + 1}`;
      setPageNumber(pageNumber + 1);
      lastCommand = { ...lastGetNewsCommand };
    }

    if (
      type === "giveMeSource" ||
      lastCommand?.type === "giveMeSource"
    ) {
      // here we add the source to the user url and convert
      // cnn news to CNN-NEWS
      const localQuery =
        type === "giveMeSource"
          ? query.toLowerCase()
          : lastCommand.localQuery.toLowerCase();
      NEWS_API_URL = `${NEWS_API_URL}&source=${localQuery}&sortBy=publishedAt`;
      setLastGetNewsCommand({
        type: "giveMeSource",
        localQuery,
      });
    } else if (
      type === "latestNews" ||
      lastCommand?.type === "latestNews"
    ) {
      NEWS_API_URL = `${NEWS_API_URL}&sortBy=publishedAt`;
      setLastGetNewsCommand({ type: "latestNews" });
    } else if (
      type === "topStories" ||
      lastCommand?.type === "topStories"
    ) {
      NEWS_API_URL = `${NEWS_API_URL}&source=google finance&sortBy=publishedAt`;
      setLastGetNewsCommand({ type: "topStories" });
    } else if (
      type === "whatsUpWith" ||
      lastCommand?.type === "whatsUpWith"
    ) {
      const localQuery =
        type === "whatsUpWith" ? query : lastCommand.localQuery;
      NEWS_API_URL = `${NEWS_API_URL}&keywordInTitle=${localQuery}&sortBy=publishedAt`;
      setLastGetNewsCommand({ type: "whatsUpWith", localQuery });
    }
    // else if (type === "category") {
    //   NEWS_API_URL = `${NEWS_API_URL}&category=${query
    //     .toLowerCase()
    //     .split(" ")
    //     .join("-")}`;

    const {
      data: { articles, isExist },
    } = await axios.get(NEWS_API_URL);

    if (type !== "giveMeMore") {
      setNewsArticles(isExist ? articles : []);
      setActiveArticle(-1);
      setPageNumber(1);
      window.scroll(0, 0);
    } else {
      setNewsArticles(
        isExist ? [...newsArticles, ...articles] : newsArticles
      );
      setActiveArticle(pageNumber * 10);
    }
    const responsePositiveOrNegative = (negative, positive) => {
      if (!isExist) {
        response(negative);
        return false;
      } else {
        response(positive);
        return true;
      }
    };

    let isPositiveResponse;
    switch (type) {
      case "giveMeSource":
        isPositiveResponse = responsePositiveOrNegative(
          `sorry, I didn't find news from ${query}`,
          `here is the news from ${query}`
        );

        if (!isPositiveResponse) return;
        break;
      case "whatsUpWith":
        isPositiveResponse = responsePositiveOrNegative(
          `sorry, I didn't find news for ${query} keyword`,
          `here is what's up with ${query}`
        );
        if (!isPositiveResponse) return;

        break;
      case "category":
        isPositiveResponse = responsePositiveOrNegative(
          `sorry, I didn't find news for ${query} category`,
          `here is the news for ${query} category`
        );
        if (!isPositiveResponse) return;

        break;

      case "latestNews":
        isPositiveResponse = responsePositiveOrNegative(
          `sorry, I didn't find any news`,
          `here is the latest news`
        );

        if (!isPositiveResponse) return;
        break;

      case "giveMeMore":
        isPositiveResponse = responsePositiveOrNegative(
          `sorry, I didn't find any more news`,
          `here is more news`
        );

        if (!isPositiveResponse) return;
        break;

      default:
        break;
    }

    response(`do you want me to read the head lines`);
    setSecondCommandFor("readThHeadLines");

    // wait for 5 second and then let finansis listening again
    // setTimeout(() => {
    //   toggle();
    //   // SpeechRecognition.startListening();
    //   // SpeechRecognition.startListening({ continuous: true });
    // }, 1000 * 5);
  };

  const [isReadingHeadLines, setIsReadingHeadLines] =
    useState(false);
  const readHeadLinesFrom = async (num) => {
    if (num > 0 && num <= newsArticles.length) {
      response(`reading from article ${num}`);
      setTimeout(async () => {
        await handleReadingHeadLines(num);
      }, 1000 * 4);
    } else {
      response(
        `the article with number ${num} not exist so I can't read it.`
      );
    }
  };
  const handleStopReading = () => {
    setIsStopReading(true);
    // response("Good");
    setIsReadingHeadLines(false);
    cancel();
    response("okay, I'll stop reading");

    // SpeechRecognition.stopListening();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Control") {
      handleStopReading();

      window.removeEventListener("keydown", handleKeyDown);
    }
  };

  const handleReadingHeadLines = async (startReadingNum) => {
    setIsReadingHeadLines(true);

    window.addEventListener("keydown", handleKeyDown);

    if (newsArticles.length) {
      const ids = [];
      let startReadingIndex;
      if (startReadingNum) {
        startReadingIndex = startReadingNum - 1;
      } else {
        startReadingIndex =
          pageNumber === 1 ? 0 : pageNumber * 10 - 10;

        // read the news from the last one has been read.
        const addMore =
          activeArticle === -1 ? 0 : activeArticle % 10;
        startReadingIndex = startReadingIndex + addMore;
      }

      for (
        let index = startReadingIndex;
        index < newsArticles.length;
        index++
      ) {
        const { title } = newsArticles[index];
        if (index !== startReadingIndex) {
          const timeout =
            title.length > 80 ? 1000 * 8 : 1000 * 6;
          // const callback = (index) => setActiveArticle(index);

          const timeoutId = await responseAfterTimeout(title, {
            indexArticle: index,
            timeout,
            ids,
            setActiveArticle,
            setIsReadingHeadLines,
            isLast: index === newsArticles.length - 1,
          });

          setTimeoutIdsForReadingH(ids);
        } else {
          response(title);
          setActiveArticle(index);
        }
      }
      window.removeEventListener("keydown", handleKeyDown);

      // SpeechRecognition.stopListening();
    } else {
      response("there is no news to read.");
    }
  };

  const [popupWindow, setPopupWindow] = useState(null);
  const [
    popupWindowWithoutController,
    setPopupWindowWithoutController,
  ] = useState(null);

  const openArticleWithoutControllerItHandler = (num) => {
    const articleNum = wordToNumber(num);
    const articleNumberIsInRange =
      articleNum > 0 && articleNum < newsArticles.length - 1;
    if (newsArticles.length && articleNumberIsInRange) {
      const { goToUrl, source } = newsArticles[articleNum - 1];

      if (source === "investing") {
        response(
          "sorry, i can't open articles from investing source for this command, try 'open article' command"
        );
        return;
      }

      response(`opening article ${articleNum} without my help`);
      const newPopupWindow = window.open(
        goToUrl,
        "ORIGIN_ARTICLE_WINDOW",
        "popup,width=1366,height=708"
      );
      setPopupWindowWithoutController(newPopupWindow);
      // window.open(goToUrl, "_blank");
    } else {
      response(
        `article with number ${articleNum} not exist, so yeah I can't open it.}`
      );
    }
    // window.location.href = url;
  };

  const [currentArticle, setCurrentArticle] = useState(null);
  const openArticleHandler = async (articleNum) => {
    // there is some error because 'open article (number) * without controlling it'
    // and 'open article number (number) *' commands are similar
    // before '*' dynamic content symbol
    //  so the flowing code will' fix it
    if (articleNum.includes("without")) return;

    const articleNumberIsInRange =
      articleNum > 0 && articleNum <= newsArticles.length;
    const width = window.outerWidth - 20;
    const height = window.outerHeight - 20;
    if (newsArticles.length && articleNumberIsInRange) {
      if (!userData) {
        response(
          "you not logged in, you need to log in for this command"
        );

        return;
      }

      if (!userData.executableChromePath) {
        response(
          "oh no, I don't have your chrome executable path"
        );
        response("paste it here to let me control your browser");
        updateModal({
          type: MODAL_TYPE_OPTIONS.INPUT,
          isReduxState: true,
          open: true,
          label: OTHER_USER_FIELDS.EXECUTABLE_CHROME_PATH.label,
          stateName:
            OTHER_USER_FIELDS.EXECUTABLE_CHROME_PATH.stateName,
          // text: "token",
          // extraHelperText: "type your new password, then ",
        });

        return;
      }

      response(`opening article ${articleNum}`);
      const { goToUrl } = newsArticles[articleNum - 1];
      response("loading the page will take seconds");
      await sleep(1000 * 3);
      try {
        const { data } = await axios.post(
          `${AUTO_API_URL}/open`,
          {
            goToUrl,
            windowType: "detailArticle",
            windowWidth: width,
            windowHeight: height,
            executablePath: userData.executableChromePath,
          }
        );
        await sleep(1000 * 3);

        response(
          "the page is done loading , do you want me to scroll every 5 seconds"
        );
        await sleep(1000 * 1);

        setSecondCommandFor("scrollDetailsA");
        setCurrentArticle(newsArticles[articleNum - 1]);
        setPopupWindow(data.isAutoBrowserOpen);

        // response("");
        // setCurrentArticle(null);
        // window.open(goToUrl, "_blank");
      } catch (error) {
        response(
          "something wrong from auto app, please make sure your auto app is running"
        );
      }
    } else {
      response(
        `article with number ${articleNum} not exist, so yeah I can't open it.}`
      );
    }
    // window.location.href = url;
  };

  const handleClosePopupWindowWithoutController = () => {
    if (popupWindow) {
      popupWindowWithoutController.close();
      //     popupWindow.scrollBy(0, 1000);
      response("closing popup window");
    } else {
      response("popup window is not open, so i can't close it");
    }
  };

  // let isScrolling = false;
  const handleClosePopupWindow = async () => {
    let isWindowClosed = true;

    if (isScrolling) {
      response(
        "sorry, i can't close the window before finishing scrolling"
      );
      return isWindowClosed;
    }

    if (popupWindow) {
      const { data } = await axios.post(`${AUTO_API_URL}/close`);

      setPopupWindow(data.isAutoBrowserOpen);
      response("closing popup window");
    } else if (popupWindowWithoutController) {
      popupWindowWithoutController.close();
      //     popupWindow.scrollBy(0, 1000);
      response("closing popup window");
      setPopupWindowWithoutController(null);
    } else {
      // response("popup window is not open, so i can't close it");
      isWindowClosed = false;
    }

    return isWindowClosed;
  };

  const scrollAfterTimeout = (source) =>
    new Promise((resolve, reject) => {
      const callApi = async (source) => {
        const {
          data: { isEndOfPage },
        } = await axios.post(`${AUTO_API_URL}/scroll`, {
          source,
        });

        resolve(isEndOfPage);
      };

      const timeoutId = setTimeout(
        callApi.bind(null, source),
        1000 * 4
      );
      // const timeoutId = setTimeout(async () => {
      //   const {
      //     data: { isEndOfPage },
      //   } = await axios.post("http://localhost:3333/scroll");

      //   resolve(isEndOfPage);
      // }, 1000 * 4);
      setTimeoutIdsForScrolling(timeoutId);
    });

  const handleScrollDetailPage = async () => {
    if (popupWindow) {
      const { source } = currentArticle;
      await axios.post(`${AUTO_API_URL}/scroll`, { source });
      setIsScrolling(true);
      for (let index = 0; index < 300; index++) {
        try {
          const isEngOfPage = await scrollAfterTimeout(source);
          // isScrolling = isEngOfPage;

          // setIsScrolling(isEngOfPage);
          if (isEngOfPage) {
            setIsScrolling(false);
            response("DONE scrolling");
            break;
          }
        } catch (error) {
          console.log(error);
        }
      }

      // setPopupWindow(data.isAutoBrowserOpen);
    } else {
      response("popup window is not open, so i can't scroll it");
    }
  };

  // lef finansis stop reading
  useEffect(() => {
    let timeId;
    if (isStopReading) {
      timeoutIdsForReadingH.forEach((id) => clearTimeout(id));

      timeId = setTimeout(() => {
        setIsStopReading(false);
      }, 1000 * 3);
    }

    return () => clearTimeout(timeId);
  }, [isStopReading, timeoutIdsForReadingH]);

  // export const getStockNews = () => {

  // }

  return {
    getNews,
    handleReadingHeadLines,
    // respondedWithYesSC,
    // respondedWithNoSC,
    handleScrollDetailPage,
    openArticleHandler,
    handleStopReading,
    activeArticle,
    newsArticles,
    isReadingHeadLines,
    handleClosePopupWindow,
    readHeadLinesFrom,
    setPageNumber,
    setNewsArticles,
    handleClosePopupWindowWithoutController,
    openArticleWithoutControllerItHandler,
    // setIsStopReading,
    // isStopReading,
  };
};
