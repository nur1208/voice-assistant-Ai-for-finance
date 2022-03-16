import { MODAL_ACTIONS } from "../reducers/modalReducer";
export const updateModal = (data) => {
  return (dispatch) =>
    dispatch({ type: MODAL_ACTIONS.UPDATE, payload: data });
};

export const setUserInput = (userInput) => (dispatch) => {
  dispatch({
    type: MODAL_ACTIONS.UPDATE_USER_INPUT,
    payload: userInput,
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: MODAL_ACTIONS.CLOSE_MODAL,
  });
};
