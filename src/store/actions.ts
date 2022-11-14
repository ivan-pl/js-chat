import { IMessage } from "../scripts/messagesApi";

type INewMessageAction = {
  type: "RECEIVED_NEW_MESSAGES";
  payload: { messageHistory: IMessage[]; newMessages: IMessage[] };
};
export type TActions = INewMessageAction;

export const newMessages = (payload: INewMessageAction["payload"]) => ({
  type: "RECEIVED_NEW_MESSAGES" as const,
  payload,
});
