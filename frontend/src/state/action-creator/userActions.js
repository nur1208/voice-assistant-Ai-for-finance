import axios from "axios";
import UserEndPoints from "../../services/User";
import { removeCookie } from "../../utils/removeCookie";
import {
  BACKEND_API_URL,
  USER_ROUTE,
} from "../../utils/serverUtils";
import { setCookie } from "../../utils/setCookie";
import { MODAL_ACTIONS } from "../reducers/modalReducer";
import { USER_ACTIONS } from "../reducers/userReducer/userReducerUtils";

const saveUserData = (userData, token) => {
  const serverUserDate = {
    ...userData,
    token,
  };

  setCookie("userData", JSON.stringify(serverUserDate), 3);

  return serverUserDate;
};

export const signUp =
  (userData, response) => async (dispatch, getState) => {
    try {
      response && response("signing up");
      dispatch({ type: USER_ACTIONS.SIGN_UP.LOADING });
      // response.data.doc
      const { data } = await UserEndPoints.signup(userData);
      // const { data } = await axios.post(
      //   `${BACKEND_API_URL}/${USER_ROUTE}/signup`,
      //   {
      //     ...userData,
      //   }
      // );
      response &&
        response("signed up and logged in successfully");
      response && response(`welcome ${userData.name}`);

      // const serverUserDate = {
      //   ...data.data.user,
      //   token: data.token,
      // };
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify(serverUserDate)
      // );
      const serverUserDate = saveUserData(
        data.data.user,
        data.token
      );
      dispatch({
        type: USER_ACTIONS.SIGN_UP.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
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
      const { data } = await UserEndPoints.login(userData);
      // const { data } = await axios.post(
      //   `${BACKEND_API_URL}/${USER_ROUTE}/login`,
      //   {
      //     ...userData,
      //   }
      // );

      response && response("logged in successfully");
      response &&
        response(`welcome back ${data.data.user.name}`);

      // const serverUserDate = {
      //   ...data.data.user,
      //   token: data.token,
      // };
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify(serverUserDate)
      // );

      const serverUserDate = saveUserData(
        data.data.user,
        data.token
      );
      dispatch({
        type: USER_ACTIONS.LOGIN.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
      response && response("logging in failed");

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

export const autoLogin = (userDate) => async (dispatch) =>
  dispatch({
    type: USER_ACTIONS.AUTO_LOGIN,
    payload: userDate,
  });

export const updateUserInfo =
  (userId, userData, response) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ACTIONS.UPDATE_INFO.LOADING });
      // response.data.doc
      const { data } = await UserEndPoints.updateInfo(
        userId,
        userData,
        getState().user_store.userData.token
      );
      // const { data } = await axios.put(
      //   `${BACKEND_API_URL}/${USER_ROUTE}/${userId}`,
      //   {
      //     ...userData,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${
      //         getState().user_store.userData.token
      //       }`,
      //     },
      //   }
      // );
      response && response("your info updated successfully");
      // response &&
      //   response(`welcome back ${data.data.user.name}`);

      // const serverUserDate = {
      //   ...data.data.user,
      //   token: getState().user_store.userData.token,
      // };
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify(serverUserDate)
      // );

      const serverUserDate = saveUserData(
        data.data.user,
        getState().user_store.userData.token
      );
      dispatch({
        type: USER_ACTIONS.UPDATE_INFO.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
      response && response("updating your info failed");

      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      response && response(errorMessage);

      // response &&
      //   response("if you want to try again say, login");

      dispatch({
        type: USER_ACTIONS.UPDATE_INFO.FALL,
        payload: errorMessage,
      });
    }
  };

export const forgetPass =
  (email, response) => async (dispatch, getState) => {
    try {
      response &&
        response(
          "sending reset password token, this will take more then three minutes"
        );
      dispatch({ type: USER_ACTIONS.FORGET_PASS.LOADING });
      // response.data.doc
      const { data } = await UserEndPoints.forgetPassword(email);
      // const { data } = await axios.post(
      //   `${BACKEND_API_URL}/${USER_ROUTE}/forgetPassword`,
      //   {
      //     email,
      //   }
      // );
      response && response(data.message);

      dispatch({
        type: USER_ACTIONS.FORGET_PASS.SUCCESS,
      });
    } catch (error) {
      response && response("sending reset token failed");

      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      response && response(errorMessage);

      response &&
        response(
          "if you want to try again say, forget password"
        );

      dispatch({
        type: USER_ACTIONS.FORGET_PASS.FALL,
        payload: errorMessage,
      });
    }
  };

export const resetPassword =
  (data, response) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ACTIONS.RESET_PASS.LOADING });
      // response.data.doc
      // const {
      //   data: {
      //     data: { user },
      //     token,
      //   },
      // } = await axios.put(
      //   `${BACKEND_API_URL}/${USER_ROUTE}/resetPassword`,
      //   {
      //     ...data,
      //   }
      // );
      const {
        data: {
          data: { user },
          token,
        },
      } = await UserEndPoints.resetPassword(data);
      response &&
        response(
          "your password updated successfully and logged in successfully"
        );
      response &&
        response(
          `welcome ${user.name} again and your new password also`
        );

      // const serverUserDate = {
      //   ...user,
      //   token,
      // };
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify(serverUserDate)
      // );

      const serverUserDate = saveUserData(user, token);
      dispatch({
        type: USER_ACTIONS.RESET_PASS.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
      // response && response("sending reset token failed");

      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      response && response(errorMessage);

      response &&
        response(
          "if you want to try again say, forget password"
        );

      dispatch({
        type: USER_ACTIONS.RESET_PASS.FALL,
        payload: errorMessage,
      });
    }

    dispatch({ type: MODAL_ACTIONS.CLOSE_MODAL });
  };

export const updatePassword =
  (data, response) => async (dispatch, getState) => {
    try {
      response && response("updating your password");

      dispatch({ type: USER_ACTIONS.UPDATE_PASSWORD.LOADING });
      // response.data.doc
      // const {
      //   data: {
      //     data: { user },
      //     token,
      //   },
      // } = await axios.put(
      //   `${BACKEND_API_URL}/${USER_ROUTE}/updateMyPassword`,
      //   {
      //     ...data,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${
      //         getState().user_store.userData.token
      //       }`,
      //     },
      //   }
      // );
      const {
        data: {
          data: { user },
          token,
        },
      } = await UserEndPoints.updatePassword(
        data,
        getState().user_store.userData.token
      );
      response &&
        response(
          "your password updated successfully and logged in successfully"
        );
      response &&
        response(
          `welcome ${user.name} again and your new password also`
        );

      // const serverUserDate = {
      //   ...user,
      //   token,
      // };
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify(serverUserDate)
      // );

      const serverUserDate = saveUserData(user, token);

      dispatch({
        type: USER_ACTIONS.UPDATE_PASSWORD.SUCCESS,
        payload: serverUserDate,
      });
    } catch (error) {
      // response && response("sending reset token failed");

      const errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;

      response && response(errorMessage);

      response &&
        response(
          "if you want to try again say, update my password"
        );

      dispatch({
        type: USER_ACTIONS.UPDATE_PASSWORD.FALL,
        payload: errorMessage,
      });
    }
  };

export const logout = () => (dispatch) => {
  // localStorage.setItem("userData", null);
  removeCookie("userData");
  dispatch({ type: USER_ACTIONS.LOGOUT });
};
