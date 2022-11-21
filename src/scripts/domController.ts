import { IMessage } from "./messagesApi";

export function createMessageElement(message: IMessage): HTMLElement {
  const messageElement = document.createElement("article");
  messageElement.classList.add("message");

  const nicknameElement = document.createElement("div");
  nicknameElement.classList.add("message__nickname");
  nicknameElement.innerText = message.name;
  messageElement.append(nicknameElement);

  const timeElement = document.createElement("time");
  timeElement.classList.add("message__date");
  timeElement.innerText = message.date.toLocaleDateString();
  timeElement.dateTime = message.date.toString();
  messageElement.append(timeElement);

  const textMessageElement = document.createElement("p");
  textMessageElement.classList.add("message__text");
  textMessageElement.innerText = message.message;
  messageElement.append(textMessageElement);

  return messageElement;
}

export function createLayout(
  root: HTMLElement,
  onSendMessage: (e: Event) => void
): HTMLElement {
  const configureElement = (el: HTMLElement, name: string): void => {
    el.id = name; // eslint-disable-line no-param-reassign
    el.classList.add(name);
    if (name !== "message-box") {
      form.append(el); // eslint-disable-line @typescript-eslint/no-use-before-define
    }
  };

  const form = document.createElement("form");
  configureElement(form, "message-box");
  form.addEventListener("submit", onSendMessage);

  const h1 = document.createElement("h1");
  h1.classList.add("title");
  h1.innerText = "Chat";

  const buttonSend = document.createElement("button");
  buttonSend.innerText = "Send";
  configureElement(buttonSend, "send-message");

  const historySection = document.createElement("section");
  configureElement(historySection, "message-history");

  const inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("placeholder", "Your name");
  configureElement(inputAuthor, "message-author");

  const messageEntryArea = document.createElement("textarea");
  messageEntryArea.setAttribute("placeholder", "Message text");
  configureElement(messageEntryArea, "message-entry-area");

  const app = document.createElement("div");
  app.classList.add("app");
  app.append(form);

  root.append(app);

  return app;
}

export function resetForm(form: HTMLFormElement) {
  /* eslint-disable no-param-reassign */
  (form.querySelector("#send-message") as HTMLButtonElement).disabled = false;
  (form.querySelector("#message-author") as HTMLInputElement).value = "";
  (form.querySelector("#message-entry-area") as HTMLTextAreaElement).value = "";
}
