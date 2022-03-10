const initialValue = {
  progressData: { sell: "", buy: "", setStopLoss: "" },
};

export const TRADING_OPTIONS = {
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
};

export const tradingReducer = (state = initialValue, action) => {
  switch (action.type) {
    case TRADING_OPTIONS.UPDATE_PROGRESS:
      return {
        ...state,
        progressData: {
          ...state.progressData,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
