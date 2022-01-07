import React from "react";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { NewsPage } from "./pages/NewsPage";
import { useFinansis } from "./utils/appUtils";
import { NoBrowserSupport } from "./components/NoBrowserSupport/NoBrowserSupport";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { InfoPage } from "./pages/InfoPage";
import { TheMostTable } from "./components/TheMostTable/TheMostTable";
import BasicModal from "./components/Modal";

export const PAGES = [
  {
    path: "/",
    Component: (props) => <HomePage {...props} />,
  },
  {
    path: "/news",
    Component: (props) => <NewsPage {...props} />,
  },
  {
    path: "/info",
    Component: (props) => <InfoPage {...props} />,
  },
  // {
  //   path: "/test",
  //   Component: (props) => <BasicModal {...props} />,
  // },
];

export const App = () => {
  const {
    NewsPageProps,
    FinanbroBtnProps,
    isBrowserSupportsSpeechRecognition,
    modalProps,
  } = useFinansis();

  if (!isBrowserSupportsSpeechRecognition) {
    return <NoBrowserSupport />;
  }

  return (
    <>
      <Switch>
        {/* <Route exact path="/">
          <HomePage {...NewsPageProps} />
        </Route> */}
        {PAGES.map((page, index) => (
          <Route exact path={page.path} key={index}>
            {page.Component(NewsPageProps)}
          </Route>
        ))}

        {/* <Route path="/news">
          <NewsPage {...NewsPageProps} />
        </Route>
        <Route path="/info">
          <InfoPage {...NewsPageProps} />
        </Route>
        <Route path="/test">
          <TheMostTable />
        </Route> */}
      </Switch>
      <FinanbroBtn {...FinanbroBtnProps} />
      <BasicModal {...modalProps} />
    </>
  );
};
