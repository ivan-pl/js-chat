import { initApp, addMessages, createMessageElement } from "./app";
import { IMessage } from "./messagesApi";

describe("app", () => {
  describe("initApp", () => {
    let root: HTMLElement;
    let app: HTMLElement;

    beforeEach(() => {
      root = document.createElement("div");
      app = initApp(root);
    });

    it("returns element with class app", () => {
      expect(app).toBeInstanceOf(HTMLElement);
      expect(app.classList.contains("app")).toBeTruthy();
    });

    it("appends to the root element", () => {
      expect(root.querySelector(".app")).not.toBeNull();
    });

    it("has layout", () => {
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

  describe("createMessageElement", () => {
    it("returns styled element", () => {
      const message: IMessage = {
        date: new Date(),
        message: "Some message",
        name: "Some nickname",
      };
      const el = createMessageElement(message);
      expect(el.classList.contains("message")).toBeTruthy();
      expect(
        (el.querySelector(".message__date") as HTMLElement).innerText
      ).toBe(message.date.toLocaleDateString());
      expect(
        (el.querySelector(".message__text") as HTMLElement).innerText
      ).toBe(message.message);
      expect(
        (el.querySelector(".message__nickname") as HTMLElement).innerText
      ).toBe(message.name);
    });
  });

  describe("addMessages", () => {
    it("adds messages into root element", () => {
      const messages: IMessage[] = Array.from({ length: 5 }, (_, k) => ({
        date: new Date(),
        message: `Some message ${k}`,
        name: `Some nickname ${k}`,
      }));
      const messageHistory = document.createElement("div");

      addMessages(messageHistory, messages);
      expect(messageHistory.querySelectorAll(".message").length).toBe(
        messages.length
      );
    });
  });
});
