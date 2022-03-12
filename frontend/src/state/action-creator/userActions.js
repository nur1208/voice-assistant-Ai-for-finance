import axios from "axios";
import {
  BACKEND_API_URL,
  USER_ROUTE,
} from "../../utils/serverUtils";
import { USER_ACTIONS } from "../reducers/userReducer";

export const signUp =
  (userData, response) => async (dispatch, getState) => {
    try {
      response && response("signing up");
      dispatch({ type: USER_ACTIONS.SIGN_UP.LOADING });
      // response.data.doc
      const { data } = await axios.post(
        `${BACKEND_API_URL}/${USER_ROUTE}/signup`,
        {
          ...userData,
        }
      );
      response &&
        response("signed up and logged in successfully");
      response && response(`welcome ${userData.name}`);

      const serverUserDate = {
        ...data.data.user,
        token: data.token,
      };
      localStorage.setItem(
        "userData",
        JSON.stringify(serverUserDate)
      );
      dispatch({
        type: USER_ACTIONS.SIGN_UP.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
      console.log(userData);

      response && response("signing up failed");

      if (error.response.status === 400) {
        response && response(`${userData.email} email is exist`);
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

export const login =
  (userData, response) => async (dispatch, getState) => {
    try {
      response && response("logging in");
      dispatch({ type: USER_ACTIONS.LOGIN.LOADING });
      // response.data.doc
      const { data } = await axios.post(
        `${BACKEND_API_URL}/${USER_ROUTE}/login`,
        {
          ...userData,
        }
      );
      response && response("logged in successfully");
      response &&
        response(`welcome back ${data.data.user.name}`);

      const serverUserDate = {
        ...data.data.user,
        token: data.token,
      };
      localStorage.setItem(
        "userData",
        JSON.stringify(serverUserDate)
      );
      dispatch({
        type: USER_ACTIONS.LOGIN.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
      response && response("signing up failed");

      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      response && response(errorMessage);

      response &&
        response("if you want to try again say, login");

      dispatch({
        type: USER_ACTIONS.LOGIN.FALL,
        payload: errorMessage,
      });
    }
  };
