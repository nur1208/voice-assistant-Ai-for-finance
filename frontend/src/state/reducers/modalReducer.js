const initialValue = {};

export const MODAL_ACTIONS = {
  UPDATE: "MODAL_UPDATE_STATE",
  UPDATE_USER_INPUT: "MODAL_UPDATE_USER_INPUT",
  CLOSE_MODAL: "CLOSE_MODAL",
  UPDATE_MESSAGE_POPUP: "UPDATE_MESSAGE_POPUP",
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
        title: "",
        type: "",
        stateName: "",
        label: "",
        isReduxState: false,
        selectOptions: null,
        open: false,
        extraHelperText: "",
        text: "",
        confirmPasswordCounter: 0,
        isEnterPasswordAgain: false,
        renderContent: null,
      };
    case MODAL_ACTIONS.UPDATE_MESSAGE_POPUP:
      return {
        ...state,
        messageData: { ...state.messageData, ...action.payload },
      };
    default:
      return state;
  }
};
