export const RESPONSE_ACTIONS = {
  UPDATE_SECOND_COMMAND: "UPDATE_SECOND_COMMAND",
};

export const responseReducer = (state = {}, action) => {
  switch (action.type) {
    case RESPONSE_ACTIONS.UPDATE_SECOND_COMMAND:
      return { ...state, secondCommand: action.payload };

    default:
      return state;
  }
};
