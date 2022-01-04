import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect } from "react";
import axios from "axios";
import { useAudio } from "./hooks/useAudio";
import {
  getNews,
  useNewsCommandsHandler,
} from "./components/finanbroBtn/commandsHandler";
import { useResponse } from "./components/finanbroBtn/hooks/useResponse";
import { useHistory, useLocation } from "react-router-dom";
import { PAGES } from "./App";
// export const useSecondCommand = (commands) => {
//   const { transcript } = useSpeechRecognition();
// };

export const useFinansis = () => {
  const [playing, toggle] = useAudio(
    "./audio/zapsplat_multimedia_button_click_007_53868.mp3"
  );

  const { response, speaking, responseAfterTimeout, cancel } =
    useResponse();

  const {
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
    handleClosePopupWindow,
  } = useNewsCommandsHandler(
    response,
    responseAfterTimeout,
    cancel
  );

  const handleStopListening = () => {
    console.log("here");
    SpeechRecognition.stopListening();
    response("okay, I'll stop listening");
  };

  const history = useHistory();
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
      callback: (redirectPage) =>
        response("I provide finance information for you"),
      commandFor: "every section",
    },
    {
      command: ["what is your name", "what's your name"],
      callback: () =>
        response(["my name is finansis", "I'm sis... bro"]),
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
      callback: async () => await respondedWithYesSC(),
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
      command: [
        "close pop-up window",
        "close the window",
        "close the article",
      ],
      callback: async () => await handleClosePopupWindow(),
      commandFor: "news",
    },
  ];

  const [onlyCommands, setOnlyCommands] = useState([]);
  const [onlyCommandFor, setOnlyCommandFor] = useState([]);
  useEffect(() => {
    const newOnlyCommands = [];
    const newOnlyCommandFor = [];
    for (const index in commands) {
      const element = commands[index];
      // console.log(element);
      const { command, commandFor } = element;
      if (typeof command === "string") {
        newOnlyCommands.push(command.toLocaleLowerCase());
        newOnlyCommandFor.push(commandFor);
      } else {
        for (let index = 0; index < command.length; index++) {
          const stringC = command[index];
          newOnlyCommands.push(stringC.toLocaleLowerCase());
          newOnlyCommandFor.push(commandFor);
        }
      }
    }
    setOnlyCommands(newOnlyCommands);
    setOnlyCommandFor(newOnlyCommandFor);

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
  const [isCommandExist, setIsCommandExist] = useState(true);
  // code for handling unknown commands
  const [isStopListing, setIsStopListing] = useState(false);
  useEffect(() => {
    let isCommandExist = false;
    if (finalTranscript) {
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
          transcript = transcript.replace(optionalWord, "").trim();

          element = element.replace(/\((.*?)\)/, "").trim();
        }

        console.log({ transcript, element });
        if (element.includes("*")) {
          const indexDynamic = element.split(" ").indexOf("*");
          const lastWordBeforeDynamic =
            element.split(" ")[indexDynamic - 1];

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
            foundCommand = onlyCommands[index];
          }
        } else {
          if (element === transcript.toLocaleLowerCase()) {
            isCommandExist = true;
            foundCommand = onlyCommands[index];
          }
        }
      }

      if (isCommandExist) {
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
      }
      // console.log({ isCommandExist });

      setIsCommandExist(isCommandExist);
      if (!isCommandExist)
        response("I didn't get that. you can try again... bro");

      const autoResetTranscriptNotWorking = [
        "of course yes",
        "of course yeah",
        "yes",
        "yeah",
        "stop reading",
        "stop listening",
        "read the news",
      ];
      if (autoResetTranscriptNotWorking.includes(transcript))
        resetTranscript();
    }
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
