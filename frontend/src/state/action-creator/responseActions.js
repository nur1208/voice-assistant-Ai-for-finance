import { RESPONSE_ACTIONS } from "../reducers/responseReducer";

export const updateSecondCommand = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESPONSE_ACTIONS.UPDATE_SECOND_COMMAND,
      payload: data,
    });
  };
};
