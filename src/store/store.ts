import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(reducer);

export function getHistoryLength() {
  return store.getState().messageHistory.length;
}

export function getNewMessages() {
  return store.getState().newMessages;
}

export default store;
