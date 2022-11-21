/* eslint-disable import/prefer-default-export */
import { IMessage } from "./messagesApi";

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
