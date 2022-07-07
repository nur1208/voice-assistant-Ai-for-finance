import { RESPONSE_ACTIONS } from "../reducers/responseReducer";

export const updateSecondCommand = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESPONSE_ACTIONS.UPDATE_SECOND_COMMAND,
      payload: data,
    });
  };
};

export const updateSpeaking = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESPONSE_ACTIONS.UPDATE_SPEAKING,
      payload: data,
    });
  };
};

export const updateIsStartRecognize = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESPONSE_ACTIONS.UPDATE_IS_START_RECOGNIZE,
      payload: data,
    });
  };
};

export const updateIsServerDown = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESPONSE_ACTIONS.UPDATE_IS_SERVER_DOWN,
      payload: data,
    });
  };
};

export const updateIsLoading = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESPONSE_ACTIONS.UPDATE_IS_LOADING,
      payload: data,
    });
  };
};
