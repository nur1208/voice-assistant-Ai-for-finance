const initialValue = {};

export const MODAL_ACTIONS = {
  UPDATE: "MODAL_UPDATE_STATE",
  UPDATE_USER_INPUT: "MODAL_UPDATE_USER_INPUT",
  CLOSE_MODAL: "CLOSE_MODAL",
};

export const modalReducer = (state = initialValue, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case MODAL_ACTIONS.UPDATE_USER_INPUT:
      return {
        ...state,
        userInputs: { ...state.userInputs, ...action.payload },
      };
    case MODAL_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        type: "",
        stateName: "",
        label: "",
        isReduxState: false,
        selectOptions: null,
        open: false,
        extraHelperText: "",
        text: "",
      };
    default:
      return state;
  }
};
