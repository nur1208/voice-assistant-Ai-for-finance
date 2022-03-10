import { combineReducers } from "redux";
import { backTestingReducer } from "./backTestingReducer";
import { responseReducer } from "./responseReducer";

const reducers = combineReducers({
  back_testing: backTestingReducer,
  response_store: responseReducer,
});

export default reducers;
