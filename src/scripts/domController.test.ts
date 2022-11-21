import { createMessageElement, createLayout, resetForm } from "./domController";
import { IMessage } from "./messagesApi";

describe("createMessageElement", () => {
  it("returns styled element", () => {
    const message: IMessage = {
      date: new Date(),
      message: "Some message",
      name: "Some nickname",
    };
    const el = createMessageElement(message);
    expect(el.classList.contains("message")).toBeTruthy();
    expect((el.querySelector(".message__date") as HTMLElement).innerText).toBe(
      message.date.toLocaleDateString()
    );
    expect((el.querySelector(".message__text") as HTMLElement).innerText).toBe(
      message.message
    );
    expect(
      (el.querySelector(".message__nickname") as HTMLElement).innerText
    ).toBe(message.name);
  });
});

describe("createLayout", () => {
  const sendMessage = jest.fn();
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement("div");
  });

  it("appends to the root element", () => {
    createLayout(root, sendMessage);
    expect(root.querySelector(".app")).not.toBeNull();
  });

  it("returns app element containing layout", () => {
    const app = createLayout(root, sendMessage);
    expect(app).toBeInstanceOf(HTMLElement);
    expect(app.classList.contains("app")).toBeTruthy();

    expect(app.querySelector("#message-box")).toBeInstanceOf(HTMLFormElement);
    expect(app.querySelector("#send-message")).toBeInstanceOf(
      HTMLButtonElement
    );
    expect(app.querySelector("#message-history")).toBeInstanceOf(HTMLElement);
    expect(app.querySelector("#message-author")).toBeInstanceOf(
      HTMLInputElement
    );
    expect(app.querySelector("#message-entry-area")).toBeInstanceOf(
      HTMLTextAreaElement
    );
  });
});

describe("resetForm", () => {
  let form: HTMLFormElement;
  let input: HTMLInputElement;
  let textArea: HTMLTextAreaElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    const app = createLayout(document.createElement("div"), jest.fn());
    form = app.querySelector("form")!;
    input = app.querySelector("input")!;
    textArea = app.querySelector("textarea")!;
    button = app.querySelector("button")!;

    input.value = "Lorem ipsum";
    textArea.value = "Lorem ipsum";
    button.disabled = true;
  });

  it("clears input", () => {
    expect(input.value).not.toBe("");
    resetForm(form);
    expect(input.value).toBe("");
  });

  it("clears textArea", () => {
    expect(textArea.value).not.toBe("");
    resetForm(form);
    expect(textArea.value).toBe("");
  });

  it("enables button", () => {
    expect(button.disabled).toBe(true);
    resetForm(form);
    expect(button.disabled).toBe(false);
  });
});
