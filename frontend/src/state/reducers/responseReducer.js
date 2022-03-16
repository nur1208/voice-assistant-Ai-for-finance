export const RESPONSE_ACTIONS = {
  UPDATE_SECOND_COMMAND: "UPDATE_SECOND_COMMAND",
  UPDATE_SPEAKING: "UPDATE_SPEAKING",
};

export const responseReducer = (state = {}, action) => {
  switch (action.type) {
    case RESPONSE_ACTIONS.UPDATE_SECOND_COMMAND:
      return { ...state, secondCommand: action.payload };

    case RESPONSE_ACTIONS.UPDATE_SPEAKING:
      return { ...state, isSpeaking: action.payload };
    default:
      return state;
  }
};
