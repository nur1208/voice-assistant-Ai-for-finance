import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect } from "react";
import axios from "axios";
// import "./app.css";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import useStyles from "./styles";
import { Modal, Typography } from "@material-ui/core";
import NewsCards from "./components/NewsCards/NewsCards";
// import NewsCard from "./components";
export const App = () => {
  // dotenv.config();

  const { speak, voices, speaking } = useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isResponded, setIsResponded] = useState(false);
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
    setIsResponded(true);
  };
  const [s, setS] = useState("");
  const giveMeSource = async (source) => {
    response(`Okay, I'm working on finding news from ${source}`);
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
  };

  const commands = [
    {
      command: ["你叫什么名字"],
      callback: () =>
        speak({
          text: "我叫finanbro",
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
      command: "undefined",
      callback: (ticker) =>
        response("I did't get that. you can try again... bro"),
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

  const checkIsResponded = () => {
    console.log({ s });
  };
  useEffect(() => {
    let timeoutId;
    if (!listening && finalTranscript.length > 0) {
      response("I didn't get that. you can try again... bro");
    }

    return () => clearTimeout(timeoutId);
  }, [listening]);

  useEffect(() => {
    if (speaking) {
      resetTranscript();
    }
  }, [resetTranscript, speaking]);
  const classes = useStyles();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

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

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.logoContainer}>
          {newsArticles.length ? (
            <div className={classes.infoContainer}>
              <div className={classes.card}>
                <Typography variant="h5" component="h2">
                  Try saying: <br />
                  <br />
                  Open article number [4]
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography variant="h5" component="h2">
                  Try saying: <br />
                  <br />
                  Go back
                </Typography>
              </div>
            </div>
          ) : null}
          <img
            src="./images/logo.png"
            className={classes.alanLogo}
            alt="logo"
          />
        </div>

        <NewsCards
          articles={newsArticles}
          activeArticle={activeArticle}
        />
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <FinanbroBtn {...FinanbroBtnProps} />
    </>
  );
};
