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

  return (dispatch) => {
    dispatch({
      type: BT_ACTIONS.RESET_STATE,
    });
  };
};
