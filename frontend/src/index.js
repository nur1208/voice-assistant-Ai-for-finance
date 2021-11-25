import ReactDom from "react-dom";
import { App } from "./App";
import { FinanbroBtn } from "./components/finanbroBtn/finanbroBtn";

ReactDom.render(
  <>
    <App />
    <FinanbroBtn />
  </>,
  document.getElementById("root")
);
