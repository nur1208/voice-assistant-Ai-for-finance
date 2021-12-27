import React from "react";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { NewsPage } from "./pages/NewsPage";
import { useFinansis } from "./appUtils";
import { NoBrowserSupport } from "./components/NoBrowserSupport/NoBrowserSupport";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

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
      <Switch>
        <Route exact path="/">
          <HomePage {...NewsPageProps} />
        </Route>
        <Route path="/news">
          <NewsPage {...NewsPageProps} />
        </Route>
      </Switch>
      <FinanbroBtn {...FinanbroBtnProps} />
    </>
  );
};
