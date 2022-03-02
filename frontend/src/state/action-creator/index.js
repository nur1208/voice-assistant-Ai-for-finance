import { BT_ACTIONS } from "../reducers/backTestingReducer";

export const updateBTState = (newState) => {
  //   console.log("here where");

  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.UPDATE_STATE,
      payload: newState,
    });
  };
};

export const resetBTState = () => {
  //   console.log("here where");
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.RESET_STATE,
    });
  };
};

export const updateIsResetBTData = (value) => {
  //   console.log("here where");

  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.UPDATE_IS_RESET_BT_DATA,
      payload: value,
    });
  };
};
