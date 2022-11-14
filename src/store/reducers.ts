import { Reducer } from "redux";
import { IMessage } from "../scripts/messagesApi";
import { TActions } from "./actions";

export interface IState {
  messageHistory: IMessage[];
  newMessages: IMessage[];
}

const initialState: IState = {
  messageHistory: [],
  newMessages: [],
};

const reducer: Reducer<IState, TActions> = (
  state: IState = initialState, // eslint-disable-line @typescript-eslint/default-param-last
  action
) => {
  if (action.type === "RECEIVED_NEW_MESSAGES") {
    const { messageHistory, newMessages } = action.payload;
    return {
      ...state,
      messageHistory,
      newMessages,
    };
  }
  return state;
};

export default reducer;
