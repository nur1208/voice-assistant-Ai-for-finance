export const initialValue = {};

export const USER_ACTIONS = {
  SIGN_UP: {
    SUCCESS: "SIGN_UP_SUCCESS",
    FALL: "SIGN_UP_FALL",
    LOADING: "SIGN_UP_LOADING",
  },
  LOGIN: {
    SUCCESS: "LOGIN_SUCCESS",
    FALL: "LOGIN_FALL",
    LOADING: "LOGIN_LOADING",
  },
  UPDATE_INFO: {
    SUCCESS: "UPDATE_INFO_SUCCESS",
    FALL: "UPDATE_INFO_FALL",
    LOADING: "UPDATE_INFO_LOADING",
  },
  FORGET_PASS: {
    SUCCESS: "FORGET_PASS_SUCCESS",
    FALL: "FORGET_PASS_FALL",
    LOADING: "FORGET_PASS_LOADING",
  },
  RESET_PASS: {
    SUCCESS: "RESET_PASS_SUCCESS",
    FALL: "RESET_PASS_FALL",
    LOADING: "RESET_PASS_LOADING",
  },
  UPDATE_PASSWORD: {
    SUCCESS: "UPDATE_PASSWORD_SUCCESS",
    FALL: "UPDATE_PASSWORD_FALL",
    LOADING: "UPDATE_PASSWORD_LOADING",
  },
  AUTO_LOGIN: "AUTO_LOGIN",
  LOGOUT: "LOGOUT",
};

export const REDUCER_RETURN = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

export const handleReducerReturn = (
  type,
  state,
  payload,
  isIgnoreUpdate
) => {
  switch (type) {
    case REDUCER_RETURN.LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case REDUCER_RETURN.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        userData: isIgnoreUpdate
          ? state.userData
          : { ...payload },
      };

    case REDUCER_RETURN.FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };

    default:
      return state;
  }
};
