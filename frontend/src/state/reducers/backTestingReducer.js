import { statesDefault } from "../../components/Simulator/utils/useSaveTestedData";

const initialState = { ...statesDefault, isResetBTData: false };

export const BT_ACTIONS = {
  UPDATE_STATE: "UPDATE_STATE",
  RESET_STATE: "RESET_STATE",
  UPDATE_IS_RESET_BT_DATA: "UPDATE_IS_RESET_BT_DATA",
};

export const backTestingReducer = (
  state = initialState,
  action
) => {
  console.log({ action });

  switch (action.type) {
    case BT_ACTIONS.UPDATE_STATE:
      return { ...state, ...action.payload };
    case BT_ACTIONS.RESET_STATE:
      return { ...statesDefault };
    case BT_ACTIONS.UPDATE_IS_RESET_BT_DATA:
      return { ...state, isResetBTData: action.payload };

    default:
      return state;
  }
};
