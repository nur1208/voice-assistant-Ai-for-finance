import React from "react";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";
import { NewsPage } from "./pages/NewsPage";
import { useFinansis } from "./appUtils";
export const App = () => {
  const { NewsPageProps, FinanbroBtnProps } = useFinansis();
  return (
    <>
      <NewsPage {...NewsPageProps} />
      <FinanbroBtn {...FinanbroBtnProps} />
    </>
  );
};
