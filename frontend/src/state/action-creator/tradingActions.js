import { TRADING_OPTIONS } from "../reducers/tradingReducer";

export const updateProgress = (data) => {
  return (dispatch) => {
    dispatch({
      type: TRADING_OPTIONS.UPDATE_PROGRESS,
      payload: data,
    });
  };
};
