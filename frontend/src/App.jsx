import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import "./app.css";
export const App = () => {
  const { speak } = useSpeechSynthesis();

  const whatNameOptions = [
    "my name is finanbro",
    "I'm finanbro, bro",
  ];

  const commands = [
    {
      command: ["what can you do", "how can you help me"],
      callback: (redirectPage) =>
        speak({ text: "I help you with navigation" }),
    },
    {
      command: ["what is your name", "what's your name"],
      callback: (redirectPage) => {
        const optionsResponse = [
          "my name is finanbro",
          "I'm finanbro, bro",
        ];
        // randStock = stocks[Math.floor(Math.random() * stocks.length)];
        speak({ text: "my name is finanbro" });
      },
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
  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="mainWrapper">
      <div>
        <p id="transcript">Transcript: {transcript}</p>
        <button onClick={SpeechRecognition.startListening}>
          Start
        </button>
      </div>
    </div>
  );
};
