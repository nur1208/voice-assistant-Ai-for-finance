import { MODAL_OPTIONS } from "../reducers/modalReducer";
export const updateModal = (data) => {
  return (dispatch) =>
    dispatch({ type: MODAL_OPTIONS.UPDATE, payload: data });
};
