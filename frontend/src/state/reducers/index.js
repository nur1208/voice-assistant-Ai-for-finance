import { combineReducers } from "redux";
import { backTestingReducer } from "./backTestingReducer";
import { modalReducer } from "./modalReducer";
import { responseReducer } from "./responseReducer";
import { tradingReducer } from "./tradingReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  back_testing: backTestingReducer,
  response_store: responseReducer,
  trading_store: tradingReducer,
  modal_store: modalReducer,
  user_store: userReducer,
});

export default reducers;
