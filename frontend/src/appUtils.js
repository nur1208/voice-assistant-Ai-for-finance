import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect } from "react";
import axios from "axios";
import { useAudio } from "./hooks/useAudio";

// export const useSecondCommand = (commands) => {
//   const { transcript } = useSpeechRecognition();
// };

export const useFinansis = () => {
  const [playing, toggle] = useAudio(
    "./audio/zapsplat_multimedia_button_click_007_53868.mp3"
  );
  const { speak, voices, speaking, cancel } = useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [secondCommandFor, setSecondCommandFor] = useState("");
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [isStopReading, setIsStopReading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

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
          setActiveArticle(option.indexArticle);
        // setActiveArticle(index);
        // console.log({ index });
        resolve();
      }, option.timeout || 1000);
      option?.ids?.push(timeoutId);
      // return timeoutId;
    });

  const handleReadingHeadLines = async () => {
    if (newsArticles.length) {
      const ids = [];
      const startReadingIndex =
        pageNumber === 1 ? 0 : pageNumber * 10 - 10;
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
          });

          console.log({ isStopReading });
          setTimeoutIds(ids);
          console.log({ timeoutId });
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
    resetTranscript();
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
    resetTranscript();
  };

  const goBackHandler = () => {
    // 0 false, any other number true
    if (newsArticles.length) {
      response("back to the main news page");
      setNewsArticles([]);
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
      window.open(goToUrl, "_blank");
    } else {
      response(
        `article with number ${articleNum} not exist, so yeah I can't open it.}`
      );
    }
    // window.location.href = url;
  };

  const [lastGetNewsCommand, setLastGetNewsCommand] = useState({
    type: "",
  });

  const getNews = async (type, query) => {
    response(`finding`);
    // 445938e7b4214f4988780151868665cc
    // response(`finding news from ${source}`);
    const API_KEY = "c8be8b2944eb4366aac8e7c44e783746";
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

  const handleGiveMeMoreNews = async () => {
    let NEWS_API_URL = `http://localhost:4050/api/v1/news?page=${
      pageNumber + 10
    }`;
    setPageNumber(pageNumber + 10);
    const {
      data: { articles, isExist },
    } = await axios.get(NEWS_API_URL);
  };

  const handleStopReading = () => {
    setIsStopReading(true);
    // response("Good");
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

  const commands = [
    {
      command: ["你叫什么名字"],
      callback: () =>
        speak({
          text: "我叫finansis",
          voice: voices[4],
        }),
    },
    {
      command: ["what can you do", "how can you help me"],
      callback: (redirectPage) =>
        response("I provide finance information for you"),
    },
    {
      command: ["what is your name", "what's your name"],
      callback: () =>
        response(["my name is finansis", "I'm sis... bro"]),
    },
    {
      command: ["Give me the news from *"],
      // callback: async (source) => await giveMeSource(source),
      // callback: async (source) => await giveMeSource(source),
      callback: async (source) =>
        await getNews("giveMeSource", source),
    },
    {
      command: ["what's the last closing price for *"],
      callback: (ticker) =>
        speak({
          text: `the close last price for ${ticker} is 160$`,
        }),
    },

    {
      command: "yes",
      callback: () => respondedWithYesSC(),
    },
    {
      command: "no",
      callback: () => respondedWithNoSC(),
    },
    {
      command: "go back",
      callback: () => goBackHandler(),
    },
    {
      command: "open article (number) *",
      callback: (articleNum) => openArticleHandler(articleNum),
    },
    {
      command: "what's up with *",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async (query) =>
        await getNews("whatsUpWith", query),
    },
    {
      command: "Give me the latest news",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async () => await getNews("latestNews"),
    },
    {
      command: "read the news",
      // callback: (query) => whatsUpWithHandler(query),
      callback: async () => await handleReadingHeadLines(),
    },
    {
      command: "stop reading",
      callback: async () => await handleStopReading(),
    },
    {
      command: "give me more news",
      callback: async () => await getNews("giveMeMore"),
    },
  ];

  const [onlyCommands, setOnlyCommands] = useState([]);

  useEffect(() => {
    const newOnlyCommands = [];

    for (const index in commands) {
      const element = commands[index];
      // console.log(element);
      const { command } = element;
      if (typeof command === "string") {
        newOnlyCommands.push(command.toLocaleLowerCase());
      } else {
        for (let index = 0; index < command.length; index++) {
          const stringC = command[index];
          newOnlyCommands.push(stringC.toLocaleLowerCase());
        }
      }
    }
    setOnlyCommands(newOnlyCommands);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // give me list of most active stocks
  // the most active stock of yesterday is list of stocks
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
  } = useSpeechRecognition({
    commands,
  });

  // code for handling unknown commands
  useEffect(() => {
    console.log("🧐");
    let isCommandExist = false;
    if (finalTranscript) {
      // console.log(
      //   onlyCommands.includes(finalTranscript.toLocaleLowerCase())
      // );
      for (let index = 0; index < onlyCommands.length; index++) {
        let element = onlyCommands[index];
        let transcript = finalTranscript;

        if (element.includes("(") && element.includes(")")) {
          const optionalWord = element
            .match(/\((.*?)\)/)[0]
            .replace("(", "")
            .replace(")", "");
          transcript = transcript.replace(optionalWord, "").trim();

          element = element.replace(/ \((.*?)\)/, "").trim();
          console.log({ transcript, element });
        }

        if (element.includes("*")) {
          const indexDynamic = element.split(" ").indexOf("*");
          const lastWordBeforeDynamic =
            element.split(" ")[indexDynamic - 1];
          console.log({
            test: finalTranscript.split(" "),
            test2: element.split(" "),
            test3: indexDynamic,
            test4: finalTranscript
              .split(" ")
              .slice(0, indexDynamic)
              .join(" "),
          });

          // if (element.replace(/\((.*?)\)/, ""))
          if (
            transcript
              .split(" ")
              .slice(0, indexDynamic)
              .join(" ")
              .toLocaleLowerCase() ===
            element.split(" ").slice(0, indexDynamic).join(" ")
          ) {
            isCommandExist = true;
          }
        } else {
          if (element === transcript.toLocaleLowerCase())
            isCommandExist = true;
        }
      }
      console.log({ isCommandExist });

      if (!isCommandExist)
        response("I didn't get that. you can try again... bro");
    }
  }, [finalTranscript]);

  // useEffect(() => {
  //   console.log({
  //     listening,
  //     finalTranscript,
  //     secondCommandFor,
  //     condition:
  //       !listening &&
  //       finalTranscript.length > 0 &&
  //       !(secondCommandFor.length > 0),
  //   });

  //   if (
  //     !listening &&
  //     finalTranscript.length > 0 &&
  //     !(secondCommandFor.length > 0)
  //   ) {
  //     response("I didn't get that. you can try again... bro");
  //   } else if (!listening && finalTranscript.length > 0) {
  //     switch (finalTranscript) {
  //       case "yes":
  //       case "no":
  //         break;

  //       default:
  //         console.log("do something");
  //         // response("I didn't get that. you can try again... bro");
  //         // resetTranscript();
  //         break;
  //     }
  //   }
  // }, [listening]);

  // useEffect(() => {
  //   console.log(finalTranscript);
  // }, [finalTranscript]);

  useEffect(() => {
    if (speaking) {
      resetTranscript();
      setTimeout(() => {
        toggle();
      }, 1000 * 5);
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
      if (!listening)
        SpeechRecognition.startListening({ continuous: true });
      else SpeechRecognition.stopListening();
    },
    isListening: listening,
    isSpeaking: speaking,
    transcript,
  };

  return {
    isBrowserSupportsSpeechRecognition:
      SpeechRecognition.browserSupportsSpeechRecognition(),
    NewsPageProps,
    FinanbroBtnProps,
  };
};
