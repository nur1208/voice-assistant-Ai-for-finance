import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import "./app.css";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { useEffect } from "react";
export const App = () => {
  const { speak, voices } = useSpeechSynthesis();

  const response = (optionsResponse) => {
    const randomOption =
      optionsResponse[
        Math.floor(Math.random() * optionsResponse.length)
      ];

    // console.log(randomOption);
    if (typeof optionsResponse !== "object")
      speak({ text: optionsResponse });
    else speak({ text: randomOption });
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
        response("I help you with navigation"),
    },
    {
      command: [
        "what is your name",
        "bro what is your name",
        "what's your name",
      ],
      callback: (redirectPage) =>
        response([
          "my name is finanbro",
          "I'm finanbro... bro",
          "finanbro, Finance plus brother equals my name, finanbro",
        ]),
    },
    {
      command: ["Give me the news from *"],
      callback: (redirectPage) =>
        speak({ text: "Okay, I'm working on it" }),
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
  ];
  // give me list of most active stocks
  // the most active stock of yesterday is list of stocks
  const { transcript, listening } = useSpeechRecognition({
    commands,
  });

  useEffect(() => {
    console.log({ voices });
  }, [voices]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const FinanbroBtnProps = {
    onClick: () =>
      SpeechRecognition.startListening({
        language: "zh-CN",
      }),
    isListening: listening,
  };

  return (
    <>
      <div className="mainWrapper">
        <div>
          <p id="transcript">Transcript: {transcript}</p>
          <button
            onClick={() =>
              SpeechRecognition.startListening({
                language: "zh-CN",
              })
            }
          >
            Start
          </button>
        </div>
      </div>
      <FinanbroBtn {...FinanbroBtnProps} />
    </>
  );
};
