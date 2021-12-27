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
  } = useNewsCommandsHandler(
    response,
    responseAfterTimeout,
    cancel
  );

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
    // {
    //   command: ["what's the last closing price for *"],
    //   callback: (ticker) =>
    //     speak({
    //       text: `the close last price for ${ticker} is 160$`,
    //     }),
    // },

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
