const initialValue = {};

export const MODAL_ACTIONS = {
  UPDATE: "MODAL_UPDATE_STATE",
  UPDATE_USER_INPUT: "MODAL_UPDATE_USER_INPUT",
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
    default:
      return state;
  }
};
