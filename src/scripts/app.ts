import {
  IMessage,
  sendMessage as sendMessageApi,
  getMessagesList,
} from "./messagesApi";
import store, { getHistoryLength, getNewMessages } from "../store/store";
import { newMessages } from "../store/actions";

export function createMessageElement(message: IMessage): HTMLElement {
  const messageElement = document.createElement("article");
  messageElement.classList.add("message");

  const nicknameElement = document.createElement("div");
  nicknameElement.classList.add("message__nickname");
  nicknameElement.innerText = message.name;

  const timeElement = document.createElement("time");
  timeElement.classList.add("message__date");
  timeElement.innerText = message.date.toLocaleDateString();
  timeElement.dateTime = message.date.toString();

  const textMessageElement = document.createElement("p");
  textMessageElement.classList.add("message__text");
  textMessageElement.innerText = message.message;

  [nicknameElement, timeElement, textMessageElement].forEach((el) =>
    messageElement.append(el)
  );

  return messageElement;
}

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
  const layout = createLayout(); // eslint-disable-line @typescript-eslint/no-use-before-define
  root.append(layout);
  if (initListening) {
    store.subscribe(handleMessages);
    setInterval(() => updateMessages(), 3000);
    updateMessages();
  }

  return layout;
}

function createLayout(): HTMLElement {
  const setAttributes = (el: HTMLElement, name: string): void => {
    el.id = name; // eslint-disable-line no-param-reassign
    el.classList.add(name);
  };

  const form = document.createElement("form");
  setAttributes(form, "message-box");
  form.addEventListener("submit", sendMessage); // eslint-disable-line @typescript-eslint/no-use-before-define

  const h1 = document.createElement("h1");
  h1.classList.add("title");
  h1.innerText = "Chat";

  const buttonSend = document.createElement("button");
  buttonSend.innerText = "Send";
  setAttributes(buttonSend, "send-message");

  const historySection = document.createElement("section");
  setAttributes(historySection, "message-history");

  const inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("placeholder", "Your name");
  setAttributes(inputAuthor, "message-author");

  const messageEntryArea = document.createElement("textarea");
  messageEntryArea.setAttribute("placeholder", "Message text");
  setAttributes(messageEntryArea, "message-entry-area");

  [h1, buttonSend, historySection, inputAuthor, messageEntryArea].forEach(
    (el) => form.append(el)
  );

  const app = document.createElement("div");
  app.classList.add("app");
  app.append(form);

  return app;
}

function resetForm(form: HTMLFormElement) {
  /* eslint-disable no-param-reassign */
  (form.querySelector("#send-message") as HTMLButtonElement).disabled = false;
  (form.querySelector("#message-author") as HTMLInputElement).value = "";
  (form.querySelector("#message-entry-area") as HTMLTextAreaElement).value = "";
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
