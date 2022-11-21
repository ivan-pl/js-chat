import store from "./store";

export function getHistoryLength() {
  return store.getState().messageHistory.length;
}

export function getNewMessages() {
  return store.getState().newMessages;
}
