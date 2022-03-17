export const RESPONSE_ACTIONS = {
  UPDATE_SECOND_COMMAND: "UPDATE_SECOND_COMMAND",
  UPDATE_SPEAKING: "UPDATE_SPEAKING",
  UPDATE_IS_START_RECOGNIZE: "UPDATE_IS_START_RECOGNIZE",
};

export const responseReducer = (state = {}, action) => {
  switch (action.type) {
    case RESPONSE_ACTIONS.UPDATE_SECOND_COMMAND:
      return { ...state, secondCommand: action.payload };

    case RESPONSE_ACTIONS.UPDATE_SPEAKING:
      return { ...state, isSpeaking: action.payload };

    case RESPONSE_ACTIONS.UPDATE_IS_START_RECOGNIZE:
      return { ...state, isStartRecognize: action.payload };

    default:
      return state;
  }
};
