import { combineReducers } from "redux";
import { backTestingReducer } from "./backTestingReducer";
import { responseReducer } from "./responseReducer";
import { tradingReducer } from "./tradingReducer";

const reducers = combineReducers({
  back_testing: backTestingReducer,
  response_store: responseReducer,
  trading_store: tradingReducer,
});

export default reducers;
