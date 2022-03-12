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
      return handleReducerReturn(REDUCER_RETURN.LOADING, state);
    case USER_ACTIONS.SIGN_UP.SUCCESS:
    case USER_ACTIONS.LOGIN.SUCCESS:
    case USER_ACTIONS.UPDATE_INFO.SUCCESS:
    case USER_ACTIONS.AUTO_LOGIN:
      return handleReducerReturn(
        REDUCER_RETURN.SUCCESS,
        state,
        action.payload
      );
    case USER_ACTIONS.SIGN_UP.FALL:
    case USER_ACTIONS.LOGIN.FALL:
    case USER_ACTIONS.UPDATE_INFO.FALL:
      return handleReducerReturn(
        REDUCER_RETURN.FAIL,
        state,
        action.payload
      );
    default:
      return state;
  }
};
