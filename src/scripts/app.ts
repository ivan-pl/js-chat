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

  const buttonSend = document.createElement("button");
  setAttributes(buttonSend, "send-message");

  const historySection = document.createElement("section");
  setAttributes(historySection, "message-history");

  const inputAuthor = document.createElement("input");
  setAttributes(inputAuthor, "message-author");

  const messageEntryArea = document.createElement("textarea");
  setAttributes(messageEntryArea, "message-entry-area");

  [buttonSend, historySection, inputAuthor, messageEntryArea].forEach((el) =>
    form.append(el)
  );

  const app = document.createElement("div");
  app.classList.add("app");
  app.append(form);

  return app;
}

export default initApp;
