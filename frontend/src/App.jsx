import React from "react";

export const App = () => {
  const { speak } = useSpeechSynthesis();

  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: ["what can you do", "how can you help me"],
      callback: (redirectPage) =>
        speak({ text: "I help you with navigation" }),
    },
    {
      command: ["what's your name"],
      callback: (redirectPage) =>
        speak({ text: "my name is no name" }),
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

  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    blog: "/blog",
    "new blog post": "/blog/new",
    contact: "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="mainWrapper">
      <p id="transcript">Transcript: {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>
        Start
      </button>
    </div>
  );
};
