import { createMessageElement, createLayout } from "./domController";
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
