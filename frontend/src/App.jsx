import React, { useEffect, useState } from "react";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { NewsPage } from "./pages/NewsPage";
import { useFinansis } from "./utils/appUtils";
import { NoBrowserSupport } from "./components/NoBrowserSupport/NoBrowserSupport";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { InfoPage } from "./pages/InfoPage";
import { TheMostTable } from "./components/TheMostTable/TheMostTable";
// import BasicModal from "./components/Modal";
import { getAllTickersInDatabaseToJson } from "./utils/getAllTickersInDatabaseToJson";
import { Offline } from "./components/Offline";
import { NotWorkingInChina } from "./components/NotWorkingInChina";
import { getCurrentCountry } from "./utils/getCurrentCountry";
import { Test } from "./components/Test";
import { Simulator } from "./components/Simulator/Simulator";
import { GlobalStyle } from "./appSC";
import BasicModal from "./components/Modal/Modal";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { useReduxActions } from "./hooks/useReduxActions";
import { useSaveTestedData } from "./components/Simulator/utils/useSaveTestedData";
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
  {
    path: "/backTesting",
    Component: (props) => <Simulator {...props} />,
  },
  {
    path: "/test",
    Component: (props) => <Test {...props} />,
  },
];

export const App = () => {
  const state = useSelector((state) => state.back_testing);

  const { updateBTState } = useReduxActions();

  // const { updateBTState, resetBTState } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );
  console.log({ stateBackTesting: state });

  const [userCountry, setUserCountry] = useState("");
  const {
    NewsPageProps,
    FinanbroBtnProps,
    isBrowserSupportsSpeechRecognition,
    modalProps,
  } = useFinansis();

  // get localStorage date in add it to redux store
  const [localStorageData] = useSaveTestedData();

  useEffect(() => {
    updateBTState(localStorageData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get user current country
  useEffect(() => {
    (async () => {
      const userCurrentCountry = await getCurrentCountry();
      setUserCountry(userCurrentCountry);
    })();
  }, []);

  if (userCountry.toLowerCase() === "china") {
    return <NotWorkingInChina />;
  }

  if (!isBrowserSupportsSpeechRecognition) {
    return <NoBrowserSupport />;
  }

  // tell users finansis doesn't work without internet connection
  // if the user offline
  if (!navigator.onLine) return <Offline />;
  // getAllTickersInDatabaseToJson();
  return (
    <>
      <GlobalStyle />
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
