import axios from "axios";
import {
  BACKEND_API_URL,
  USER_ROUTE,
} from "../../utils/serverUtils";
import { USER_ACTIONS } from "../reducers/userReducer";

export const signUp =
  (userDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ACTIONS.SIGN_UP.LOADING });
      // response.data.doc
      const {
        data: { doc },
      } = await axios.post(`${BACKEND_API_URL}/${USER_ROUTE}`, {
        ...userDate,
      });
      dispatch({
        type: USER_ACTIONS.SIGN_UP.SUCCESS,
        payload: doc,
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      dispatch({
        type: USER_ACTIONS.SIGN_UP.FALL,
        payload: errorMessage,
      });
    }
  };
