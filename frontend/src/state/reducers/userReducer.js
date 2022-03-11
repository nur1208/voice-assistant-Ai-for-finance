const initialValue = {};

export const USER_ACTIONS = {
  SIGN_UP: {
    SUCCESS: "SUCCESS",
    FALL: "FALL",
    LOADING: "LOADING",
  },
};

export const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    //   sign up
    case USER_ACTIONS.SIGN_UP.LOADING:
      return { ...state, loading: true };
    case USER_ACTIONS.SIGN_UP.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userData: action.payload,
        error: null,
      };
    case USER_ACTIONS.SIGN_UP.FALL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
