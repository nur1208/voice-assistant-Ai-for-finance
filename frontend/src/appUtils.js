import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect } from "react";
import axios from "axios";
import { useAudio } from "./hooks/useAudio";

export const useSecondCommand = (commands) => {
  const { transcript } = useSpeechRecognition();
};

export const useFinansis = () => {
  const [playing, toggle] = useAudio(
    "./audio/zapsplat_multimedia_button_click_007_53868.mp3"
  );
  const { speak, voices, speaking } = useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [secondCommandFor, setSecondCommandFor] = useState("");
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
  const giveMeSource = async (source) => {
    // response(`finding news from ${source}`);
    const API_KEY = "c8be8b2944eb4366aac8e7c44e783746";
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

    // here we add the source to the user url and convert
    // cnn news to CNN-NEWS
    if (source) {
      NEWS_API_URL = `${NEWS_API_URL}&sources=${source
        .toLowerCase()
        .split(" ")
        .join("-")}`;
    }

    const {
      data: { articles },
    } = await axios.get(NEWS_API_URL);
    setNewsArticles(articles);
    setActiveArticle(-1);

    if (articles.length === 0) {
      response(`sorry, I didn't find news from ${source}`);
      return;
    } else {
      response(`here is the news from ${source}`);
    }
    response(`do you want me to read the head lines`);

    setSecondCommandFor("giveMeSource");
    // wait for 5 second and then let finansis listening again
    setTimeout(() => {
      toggle();
      SpeechRecognition.startListening();
    }, 1000 * 5);
  };

  const responseAfterTimeout = (title, option = {}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        response(title);
        option.indexArticle &&
          setActiveArticle(option.indexArticle);
        // setActiveArticle(index);
        // console.log({ index });
        resolve();
      }, option.timeout || 1000);
    });

  const handleReadingHeadLines = async () => {
    for (let index = 0; index < newsArticles.length; index++) {
      const { title } = newsArticles[index];

      if (index !== 0) {
        const timeout = title.length > 80 ? 1000 * 8 : 1000 * 6;
        // const callback = (index) => setActiveArticle(index);
        await responseAfterTimeout(title, {
          indexArticle: index,
          timeout,
        });
      } else {
        response(title);
        setActiveArticle(index);
      }
    }
  };

  const respondedWithYesSC = () => {
    console.log(secondCommandFor);
    switch (secondCommandFor) {
      case "giveMeSource":
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
      case "giveMeSource":
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
      const { url } = newsArticles[articleNum - 1];
      window.open(url, "_blank");
    } else {
      response(
        `article with number ${articleNum} not exist, so yeah I can't open it.}`
      );
    }
    // window.location.href = url;
  };

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
      command: [
        "what is your name",
        "sis what is your name",
        "what's your name",
      ],
      callback: (redirectPage) =>
        response([
          "my name is finansis",
          "I'm finansis... bro",
          "finansis, Finance plus sister equals my name... finansis, simple right?",
        ]),
    },
    {
      command: ["Give me the news from *"],
      callback: async (source) => await giveMeSource(source),
    },
    {
      command: ["what's the last closing price for *"],
      callback: (ticker) =>
        speak({
          text: `the close last price for ${ticker} is 160$`,
        }),
    },
    {
      command: ["f*** you"],
      callback: (ticker) =>
        speak({
          text: `fuck you too bitch, motherfucker, fuck you again`,
        }),
    },

    {
      command: ["do you like me"],
      callback: (ticker) =>
        speak({
          text: `no pathetic, motherfucker`,
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
  ];
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

  useEffect(() => {
    console.log({ finalTranscript });
  }, [finalTranscript]);

  useEffect(() => {
    if (
      !listening &&
      (finalTranscript.length > 0) & !(secondCommandFor.length > 0)
    ) {
      response("I didn't get that. you can try again... bro");
    } else if (!listening && finalTranscript.length > 0) {
      switch (finalTranscript) {
        case "yes":
        case "no":
          break;

        default:
          console.log("do something");
          // response("I didn't get that. you can try again... bro");
          // resetTranscript();
          break;
      }
    }
  }, [listening]);

  useEffect(() => {
    if (speaking) {
      resetTranscript();
    }

    // if (!speaking && secondCommandFor.length > 0) {

    //   switch (finalTranscript) {
    //     case "yes":
    //     case "no":
    //       break;

    //     default:
    //       console.log("do something");
    //       // response("I didn't get that. you can try again... bro");
    //       // resetTranscript();
    //       break;
    //   }
    // }
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
    onClick: SpeechRecognition.startListening,
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
