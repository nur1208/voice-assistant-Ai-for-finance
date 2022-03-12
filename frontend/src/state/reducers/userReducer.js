const initialValue = {};

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
};

const REDUCER_RETURN = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

const handleReducerReturn = (type, state, payload) => {
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
        userData: { ...payload },
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

export const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    //   sign up
    case USER_ACTIONS.SIGN_UP.LOADING:
      return handleReducerReturn(REDUCER_RETURN.LOADING, state);
    case USER_ACTIONS.SIGN_UP.SUCCESS:
      return handleReducerReturn(
        REDUCER_RETURN.SUCCESS,
        state,
        action.payload
      );
    case USER_ACTIONS.SIGN_UP.FALL:
      return handleReducerReturn(
        REDUCER_RETURN.FAIL,
        state,
        action.payload
      );

    //   login
    case USER_ACTIONS.LOGIN.LOADING:
      return handleReducerReturn(REDUCER_RETURN.LOADING, state);
    case USER_ACTIONS.LOGIN.SUCCESS:
      return handleReducerReturn(
        REDUCER_RETURN.SUCCESS,
        state,
        action.payload
      );
    case USER_ACTIONS.LOGIN.FALL:
      return handleReducerReturn(
        REDUCER_RETURN.FAIL,
        state,
        action.payload
      );

    default:
      return state;
  }
};
