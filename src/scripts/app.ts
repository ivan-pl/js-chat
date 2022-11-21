import {
  IMessage,
  sendMessage as sendMessageApi,
  getMessagesList,
} from "./messagesApi";
import store, { getHistoryLength, getNewMessages } from "../store/store";
import { newMessages } from "../store/actions";
import { createMessageElement, createLayout, resetForm } from "./domController";

export function addMessages(root: HTMLElement, messages: IMessage[]): void {
  messages.forEach((message) => root.append(createMessageElement(message)));
  root.scrollTop = root.scrollHeight; // eslint-disable-line no-param-reassign
}

export function filterMessages(messages: { [key: string]: any }[]): IMessage[] {
  const res: IMessage[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const message of messages) {
    if (["name", "message", "date"].every((prop) => prop in message)) {
      res.push(message as IMessage);
    }
  }
  return res;
}

function handleMessages() {
  const messages = getNewMessages();
  const filteredMessages = filterMessages(messages);
  if (filteredMessages.length > 0) {
    const messageHistoryEl = document.getElementById("message-history")!;
    addMessages(messageHistoryEl, filteredMessages);
  }
}

export async function updateMessages() {
  const curHistoryLength = getHistoryLength();
  const messages = await getMessagesList();
  if (messages.length > curHistoryLength) {
    const newMessagesSlice = messages.slice(curHistoryLength);
    store.dispatch(
      newMessages({ messageHistory: messages, newMessages: newMessagesSlice })
    );
  }
}

export function initApp(root: HTMLElement, initListening = false): HTMLElement {
  const app = createLayout(root, sendMessage); // eslint-disable-line @typescript-eslint/no-use-before-define
  if (initListening) {
    store.subscribe(handleMessages);
    setInterval(() => updateMessages(), 3000);
    updateMessages();
  }

  return app;
}

export async function sendMessage(e: Event) {
  const form = e.target as HTMLFormElement;
  (form.querySelector("#send-message") as HTMLButtonElement).disabled = true;
  e.preventDefault();
  const nicknameElem = document.getElementById(
    "message-author"
  ) as HTMLInputElement | null;
  const nickname = nicknameElem?.value;
  if (!nickname) {
    alert("You should enter your name");
    return;
  }

  const messageElem = document.getElementById(
    "message-entry-area"
  ) as HTMLTextAreaElement | null;
  const messageText = messageElem?.value;
  if (!messageText) {
    alert("You should enter a message");
    return;
  }

  const message = { name: nickname!, message: messageText! };
  await sendMessageApi(message).catch((err) => {
    alert(`Oooops! Something happened. ${err.toString()}`);
  });
  resetForm(form);
}
