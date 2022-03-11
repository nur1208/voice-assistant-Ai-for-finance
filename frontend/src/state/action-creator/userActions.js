import axios from "axios";
import {
  BACKEND_API_URL,
  USER_ROUTE,
} from "../../utils/serverUtils";
import { USER_ACTIONS } from "../reducers/userReducer";

export const signUp =
  (userDate, response) => async (dispatch, getState) => {
    try {
      response && response("signing up");
      dispatch({ type: USER_ACTIONS.SIGN_UP.LOADING });
      // response.data.doc
      const {
        data: { doc },
      } = await axios.post(`${BACKEND_API_URL}/${USER_ROUTE}`, {
        ...userDate,
      });
      response && response("signed up successfully");
      response && response(`welcome ${userDate.name}`);

      dispatch({
        type: USER_ACTIONS.SIGN_UP.SUCCESS,
        payload: doc,
      });
    } catch (error) {
      console.log(userDate);

      if (error.response.status === 401) {
        response && response(`${userDate.email} email is exist`);
      } else {
        response &&
          response("something went wrong while signing up");
      }

      response &&
        response("if you want to try again say, 'sign up");

      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      dispatch({
        type: USER_ACTIONS.SIGN_UP.FALL,
        payload: errorMessage,
      });
    }
  };
