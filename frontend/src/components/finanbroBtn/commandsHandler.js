import axios from "axios";
import { useEffect, useState } from "react";
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
  cancel
) => {
  // const { response, responseAfterTimeout, cancel } = useResponse();
  const [pageNumber, setPageNumber] = useState(1);
  const [lastGetNewsCommand, setLastGetNewsCommand] = useState({
    type: "",
  });
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  const [secondCommandFor, setSecondCommandFor] = useState("");
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [isStopReading, setIsStopReading] = useState(false);

  const getNews = async (type, query) => {
    response(`finding`);
    // 445938e7b4214f4988780151868665cc
    // response(`finding news from ${source}`);
    // const API_KEY = "c8be8b2944eb4366aac8e7c44e783746";
    // const API_KEY = "445938e7b4214f4988780151868665cc";
    // let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&language=en`;
    // let NEWS_API_URL = `http://localhost:4050/api/v1/news?`;
    let NEWS_API_URL = `https://news-api-lovat.vercel.app/api/v1/news?`;

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
      NEWS_API_URL = `${NEWS_API_URL}&source=${localQuery}`;
      setLastGetNewsCommand({ type: "giveMeSource", localQuery });
    } else if (
      type === "latestNews" ||
      lastCommand?.type === "latestNews"
    ) {
      NEWS_API_URL = `${NEWS_API_URL}&sortBy=publishedAt`;
      setLastGetNewsCommand({ type: "latestNews" });
    } else if (
      type === "whatsUpWith" ||
      lastCommand?.type === "whatsUpWith"
    ) {
      NEWS_API_URL = `${NEWS_API_URL}&keywordInTitle=${
        type === "whatsUpWith" ? query : lastCommand.query
      }`;
      setLastGetNewsCommand({ type: "whatsUpWith", query });
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
  const handleReadingHeadLines = async () => {
    setIsReadingHeadLines(true);
    if (newsArticles.length) {
      const ids = [];
      let startReadingIndex =
        pageNumber === 1 ? 0 : pageNumber * 10 - 10;
      // console.log("🧐");

      // read the news from the last one has been read.
      const addMore = activeArticle === -1 ? 0 : activeArticle % 10;
      startReadingIndex = startReadingIndex + addMore;

      for (
        let index = startReadingIndex;
        index < newsArticles.length;
        index++
      ) {
        const { title } = newsArticles[index];
        if (index !== startReadingIndex) {
          const timeout = title.length > 80 ? 1000 * 8 : 1000 * 6;
          // const callback = (index) => setActiveArticle(index);

          const timeoutId = await responseAfterTimeout(title, {
            indexArticle: index,
            timeout,
            ids,
            setActiveArticle,
            setIsReadingHeadLines,
            isLast: index === newsArticles.length - 1,
          });

          // const callback = (resolve) => {
          //   response(title);
          //   index && setActiveArticle(index);
          //   // setActiveArticle(index);
          //   // console.log({ index });
          //   if (index === newsArticles.length - 1) {
          //     setIsReadingHeadLines(false);
          //   }
          //   resolve();
          // };
          // await responseAfterTimeout(title, {
          //   timeout,
          //   ids,
          //   params: {
          //     indexArticle: index,
          //     isLast: index === newsArticles.length - 1,
          //     setActiveArticle,
          //     setIsReadingHeadLines,
          //   },
          //   callback: (resolve, params = {}) => {
          //     response(title);
          //     console.log({ params });
          //     params?.indexArticle &&
          //       params?.setActiveArticle(params?.indexArticle);
          //     // setActiveArticle(index);
          //     // console.log({ index });
          //     if (params?.isLast) {
          //       params?.setIsReadingHeadLines(false);
          //     }
          //     resolve();
          //   },
          // });

          // console.log({ isStopReading });
          setTimeoutIds(ids);
          // console.log({ timeoutId });
        } else {
          response(title);
          setActiveArticle(index);
        }
      }

      // SpeechRecognition.stopListening();
    } else {
      response("there is no news to read.");
    }
  };

  const respondedWithYesSC = () => {
    console.log(secondCommandFor);
    switch (secondCommandFor) {
      case "readThHeadLines":
        handleReadingHeadLines();

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

      default:
        response("I didn't get that. you can try again... bro");
        break;
    }
    setSecondCommandFor("");
    // resetTranscript();
  };

  const goBackHandler = () => {
    // 0 false, any other number true
    if (newsArticles.length) {
      response("back to the main news page");
      setNewsArticles([]);
      setPageNumber(1);
    } else {
      response(
        "there is nothing back, you are in the main news page"
      );
      responseAfterTimeout("good morning", { timeout: 500 });
    }
  };

  const openArticleHandler = (articleNum) => {
    const articleNumberIsInRange =
      articleNum > 0 && articleNum < newsArticles.length - 1;
    if (newsArticles.length && articleNumberIsInRange) {
      response(`opening article ${articleNum}`);
      const { goToUrl } = newsArticles[articleNum - 1];
      console.log({ goToUrl });
      window.open(goToUrl, "ORIGIN_ARTICLE_WINDOW", "popup");
      // window.open(goToUrl, "_blank");
    } else {
      response(
        `article with number ${articleNum} not exist, so yeah I can't open it.}`
      );
    }
    // window.location.href = url;
  };

  const handleStopReading = () => {
    setIsStopReading(true);
    // response("Good");
    setIsReadingHeadLines(false);
    cancel();
    response("okay, I'll stop reading");

    // SpeechRecognition.stopListening();
  };

  useEffect(() => {
    let timeId;
    if (isStopReading) {
      console.log({ isStopReading, timeoutIds });
      timeoutIds.forEach((id) => clearTimeout(id));

      timeId = setTimeout(() => {
        setIsStopReading(false);
      }, 1000 * 3);
    }

    return () => clearTimeout(timeId);
  }, [isStopReading, timeoutIds]);

  return {
    getNews,
    handleReadingHeadLines,
    respondedWithYesSC,
    respondedWithNoSC,
    goBackHandler,
    openArticleHandler,
    handleStopReading,
    activeArticle,
    newsArticles,
    isReadingHeadLines,
  };
};
