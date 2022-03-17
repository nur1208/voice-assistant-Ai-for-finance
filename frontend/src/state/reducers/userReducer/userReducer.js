import {
  handleReducerReturn,
  initialValue,
  REDUCER_RETURN,
  USER_ACTIONS,
} from "./userReducerUtils";

export const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    //   sign up
    case USER_ACTIONS.SIGN_UP.LOADING:
    case USER_ACTIONS.LOGIN.LOADING:
    case USER_ACTIONS.UPDATE_INFO.LOADING:
    case USER_ACTIONS.FORGET_PASS.LOADING:
    case USER_ACTIONS.RESET_PASS.LOADING:
    case USER_ACTIONS.UPDATE_PASSWORD.LOADING:
      return handleReducerReturn(REDUCER_RETURN.LOADING, state);
    case USER_ACTIONS.SIGN_UP.SUCCESS:
    case USER_ACTIONS.LOGIN.SUCCESS:
    case USER_ACTIONS.UPDATE_INFO.SUCCESS:
    case USER_ACTIONS.AUTO_LOGIN:
    case USER_ACTIONS.UPDATE_PASSWORD.SUCCESS:
    case USER_ACTIONS.RESET_PASS.SUCCESS:
      return handleReducerReturn(
        REDUCER_RETURN.SUCCESS,
        state,
        action.payload
      );
    case USER_ACTIONS.FORGET_PASS.SUCCESS:
      return handleReducerReturn(
        REDUCER_RETURN.SUCCESS,
        state,
        action.payload,
        true
      );
    case USER_ACTIONS.SIGN_UP.FALL:
    case USER_ACTIONS.UPDATE_PASSWORD.FALL:
    case USER_ACTIONS.LOGIN.FALL:
    case USER_ACTIONS.UPDATE_INFO.FALL:
    case USER_ACTIONS.FORGET_PASS.FALL:
    case USER_ACTIONS.RESET_PASS.FALL:
      return handleReducerReturn(
        REDUCER_RETURN.FAIL,
        state,
        action.payload
      );
    case USER_ACTIONS.LOGOUT:
      return { ...state, userData: null };
    default:
      return state;
  }
};
