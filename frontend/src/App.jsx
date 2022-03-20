import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from "react";
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
import { ProgressFetch } from "./components/ProgressFetch/ProgressFetch";
import {
  getCurrentCountry,
  useGetCurrentCountry,
} from "./utils/getCurrentCountry";
import { Test } from "./components/Test";
import { Simulator } from "./components/Simulator/Simulator";
import { GlobalStyle } from "./appSC";
// import BasicModal from "./components/Modal/Modal";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { useReduxActions } from "./hooks/useReduxActions";
import { useSaveTestedData } from "./components/Simulator/utils/useSaveTestedData";
// import BasicModal from "./components/Modal/BasicModal";
import InputModal from "./components/Modal/InputModal/InputModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useExitPrompt } from "./hooks/useExitPrompt";
import { LinearLoading } from "./components/LinearLoading";
import { TradingPage } from "./pages/TradingPage";
import { ProgressModal } from "./components/Modal/ProgressModal/ProgressModal";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { DateInputFormat } from "./components/DateInputFormat";
import { ResetPassword } from "./pages/ResetPassword";
import BasicModal from "./components/Modal/BasicModal/BasicModal";
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
    path: "/trading",
    Component: (props) => <TradingPage {...props} />,
  },
  {
    path: "/backTesting",
    Component: (props) => <Simulator {...props} />,
  },
  {
    path: "/test",
    Component: () => (
      // <BasicModal
      //   open={true}
      //   // isTestIcon
      //   isInput
      //   label={{ stateName: "soemthign", label: "date" }}
      //   // isProgress
      //   // progressData={{
      //   //   sell: "fall",
      //   //   buy: "loading",
      //   //   setStopLoss: "success",
      //   // }}
      // />
      // <Test />
      <ResetPassword />
      // <DateInputFormat />
    ),
  },
  {
    path: "/resetPassword/:token",
    Component: () => <ResetPassword />,
  },
];

export const WaitForUserInputContext = createContext();

export const App = () => {
  const state = useSelector((state) => state.trading_store);

  const [isWaitingUserDone, setIsWaitingUserDone] = useState("");

  // const handleWaitUserInput = () =>
  //   new Promise((resolve, reject) => {
  //     if (isWaitingUserDone) {
  //       resolve();
  //       setIsWaitingUserDone(false);
  //     }
  //   });

  const { updateBTState, autoLogin } = useReduxActions();

  // const { updateBTState, resetBTState } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );
  console.log({ stateBackTesting: state });

  // const [userCountry, setUserCountry] = useState("loading");
  const {
    NewsPageProps,
    FinanbroBtnProps,
    isBrowserSupportsSpeechRecognition,
    modalProps,
  } = useFinansis({ isWaitingUserDone, setIsWaitingUserDone });

  // get localStorage date in add it to redux store
  const [localStorageData] = useSaveTestedData();

  const [accountRisk, setAccountRisk] = useLocalStorage(
    "accountRisk",
    1
  );

  const [userData, setUserData] = useLocalStorage(
    "userData",
    null
  );

  useExitPrompt(false);

  const appRef = useRef(null);
  useEffect(() => {
    updateBTState({ ...localStorageData, accountRisk });

    if (userData) {
      autoLogin(userData);
    }
    // appRef.current.click();
    // appRef.current.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get user current country
  // useEffect(() => {
  //   (async () => {
  //     const userCurrentCountry = await getCurrentCountry();
  //     setUserCountry(userCurrentCountry);
  //   })();
  // }, []);

  const networkStatus = useNetworkStatus();
  const userCountry = useGetCurrentCountry(networkStatus);

  if (
    (userCountry !== "loading" && !userCountry) ||
    userCountry.toLowerCase() === "china"
  ) {
    return <NotWorkingInChina />;
  }

  if (!isBrowserSupportsSpeechRecognition) {
    return <NoBrowserSupport />;
  }

  // tell users finansis doesn't work without internet connection
  // if the user offline
  if (!navigator.onLine || networkStatus === "offline")
    return <Offline />;
  // getAllTickersInDatabaseToJson();
  const waitOption = {
    // handleWaitUserInput,
    setIsWaitingUserDone,
  };
  return (
    <div ref={appRef}>
      <WaitForUserInputContext.Provider value={waitOption}>
        <GlobalStyle />
        <Switch>
          {PAGES.map((page, index) => (
            <Route exact path={page.path} key={index}>
              {page.Component(NewsPageProps)}
            </Route>
          ))}
        </Switch>
        <FinanbroBtn {...FinanbroBtnProps} />
        <BasicModal {...modalProps} />
      </WaitForUserInputContext.Provider>
    </div>
  );
};
