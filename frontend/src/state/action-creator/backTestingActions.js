import { BT_ACTIONS } from "../reducers/backTestingReducer";

export const updateBTState = (newState) => {
  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.UPDATE_STATE,
      payload: newState,
    });
  };
};

export const resetBTState = () => {
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.RESET_STATE,
    });
  };
};

export const updateIsResetBTData = (value) => {
  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.UPDATE_IS_RESET_BT_DATA,
      payload: value,
    });
  };
};
