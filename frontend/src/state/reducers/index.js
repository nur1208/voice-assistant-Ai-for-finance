import { combineReducers } from "redux";
import { backTestingReducer } from "./backTestingReducer";

const reducers = combineReducers({
  back_testing: backTestingReducer,
});

export default reducers;
