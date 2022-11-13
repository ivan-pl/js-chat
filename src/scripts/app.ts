function initApp(root: HTMLElement): HTMLElement {
  const layout = createLayout(); // eslint-disable-line @typescript-eslint/no-use-before-define
  root.append(layout);
  return layout;
}

function createLayout(): HTMLElement {
  const setAttributes = (el: HTMLElement, name: string): void => {
    el.id = name; // eslint-disable-line no-param-reassign
    el.classList.add(name);
  };

  const form = document.createElement("form");
  setAttributes(form, "message-box");

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

export default initApp;
