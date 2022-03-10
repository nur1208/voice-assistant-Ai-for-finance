const initialValue = {};

export const MODAL_OPTIONS = {
  UPDATE: "UPDATE",
};

export const modalReducer = (state = initialValue, action) => {
  switch (action.type) {
    case MODAL_OPTIONS.UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
