export const RESPONSE_ACTIONS = {
  UPDATE_SECOND_COMMAND: "UPDATE_SECOND_COMMAND",
  UPDATE_SPEAKING: "UPDATE_SPEAKING",
  UPDATE_IS_START_RECOGNIZE: "UPDATE_IS_START_RECOGNIZE",
  UPDATE_IS_SERVER_DOWN: "UPDATE_IS_SERVER_DOWN",
  UPDATE_IS_LOADING: "UPDATE_IS_LOADING",
  UPDATE_COMMANDS_NUM: "UPDATE_COMMANDS_NUM",
};

const initState = {
  isLoading: true,
};

export const responseReducer = (state = initState, action) => {
  switch (action.type) {
    case RESPONSE_ACTIONS.UPDATE_SECOND_COMMAND:
      return { ...state, secondCommand: action.payload };

    case RESPONSE_ACTIONS.UPDATE_SPEAKING:
      return { ...state, isSpeaking: action.payload };

    case RESPONSE_ACTIONS.UPDATE_IS_START_RECOGNIZE:
      return { ...state, isStartRecognize: action.payload };

    case RESPONSE_ACTIONS.UPDATE_IS_SERVER_DOWN:
      return { ...state, isServerDown: action.payload };

    case RESPONSE_ACTIONS.UPDATE_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESPONSE_ACTIONS.UPDATE_COMMANDS_NUM:
      return { ...state, comandsNum: action.payload };

    default:
      return state;
  }
};
