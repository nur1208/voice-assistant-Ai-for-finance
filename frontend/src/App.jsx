import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import "./app.css";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { useEffect } from "react";
export const App = () => {
  const { speak, voices, speaking } = useSpeechSynthesis();

  const [randomIndex, setRandomIndex] = useState(0);

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
  const { transcript, listening, resetTranscript } =
    useSpeechRecognition({
      commands,
    });

  useEffect(() => {
    if (speaking) {
      resetTranscript();
    }
  }, [resetTranscript, speaking]);

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
      <div className="mainWrapper">
        <div>
          <p id="transcript">Transcript: {transcript}</p>
          <button onClick={SpeechRecognition.startListening}>
            Start
          </button>
        </div>
      </div>
      <FinanbroBtn {...FinanbroBtnProps} />
    </>
  );
};
