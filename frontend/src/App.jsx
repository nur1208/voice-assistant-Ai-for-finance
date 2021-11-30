import React from "react";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { NewsPage } from "./pages/NewsPage";
import { useFinansis } from "./appUtils";
import { NoBrowserSupport } from "./components/NoBrowserSupport/NoBrowserSupport";
export const App = () => {
  const {
    NewsPageProps,
    FinanbroBtnProps,
    isBrowserSupportsSpeechRecognition,
  } = useFinansis();

  if (!isBrowserSupportsSpeechRecognition) {
    return <NoBrowserSupport />;
  }

  return (
    <>
      <NewsPage {...NewsPageProps} />
      <FinanbroBtn {...FinanbroBtnProps} />
    </>
  );
};
