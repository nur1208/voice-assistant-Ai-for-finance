import { statesDefault } from "../../components/Simulator/utils/useSaveTestedData";

const initialState = statesDefault;

export const BT_ACTIONS = {
  UPDATE_STATE: "UPDATE_STATE",
  RESET_STATE: "RESET_STATE",
};

export const backTestingReducer = (
  state = initialState,
  action
) => {
  console.log({ action });

  switch (action.type) {
    case BT_ACTIONS.UPDATE_STATE:
      return action.payload;
    case BT_ACTIONS.RESET_STATE:
      return statesDefault;

    default:
      return state;
  }
};
