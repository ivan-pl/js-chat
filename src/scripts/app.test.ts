import {
  initApp,
  addMessages,
  createMessageElement,
  updateMessages,
  filterMessages,
} from "./app";
import {
  IMessage,
  sendMessage as sendMessageApi,
  getMessagesList,
} from "./messagesApi";
import store from "../store/store";

window.alert = jest.fn();

jest.mock("./messagesApi", () => {
  const originalModule = jest.requireActual("./messagesApi");

  return {
    __esModule: true,
    ...originalModule,
    sendMessage: jest.fn().mockResolvedValue(1),
    getMessagesList: jest.fn(),
  };
});

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

  describe("sendMessage", () => {
    let root: HTMLElement;
    let app: HTMLElement;
    let form: HTMLFormElement;
    const submitEvent = new Event("submit");

    beforeEach(() => {
      root = document.createElement("div");
      app = initApp(root);
      form = app.querySelector("#message-box") as HTMLFormElement;
      document.body.append(root);
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("doesn't send empty message", () => {
      const nickname = app.querySelector("#message-author") as HTMLInputElement;
      nickname.value = "Nickname";
      form.dispatchEvent(submitEvent);
      expect(sendMessageApi).not.toHaveBeenCalled();
    });

    it("doesn't send noname message", () => {
      const messageEntryArea = app.querySelector(
        "#message-entry-area"
      ) as HTMLTextAreaElement;
      messageEntryArea.value = "Lorem ipsum";
      form.dispatchEvent(submitEvent);
      expect(sendMessageApi).not.toHaveBeenCalled();
    });

    it("calls api", async () => {
      const authorName = "Nickname";
      const messageText = "Lorem ipsum";
      (app.querySelector("#message-author") as HTMLInputElement).value =
        authorName;
      (app.querySelector("#message-entry-area") as HTMLTextAreaElement).value =
        messageText;
      form.dispatchEvent(submitEvent);
      expect(sendMessageApi).toHaveBeenCalledTimes(1);
      expect((sendMessageApi as jest.Mock).mock.calls[0][0]).toEqual({
        name: authorName,
        message: messageText,
      });
    });
  });

  describe("updateMessages", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("is a function", () => {
      expect(updateMessages).toBeInstanceOf(Function);
    });

    it("dispatches after receiving new messages", async () => {
      (getMessagesList as jest.Mock)
        .mockResolvedValueOnce([
          { name: "A", message: "A message", date: new Date() },
        ])
        .mockResolvedValue([
          { name: "A", message: "A message", date: new Date() },
          { name: "B", message: "B message", date: new Date() },
        ]);

      const spyDispatch = jest.spyOn(store, "dispatch");
      await updateMessages();
      expect(spyDispatch).toHaveBeenCalledTimes(1);

      await updateMessages();
      expect(spyDispatch).toHaveBeenCalledTimes(2);
    });

    it("doesn't dispatch without new messages", async () => {
      (getMessagesList as jest.Mock).mockResolvedValue([
        { name: "A", message: "A message", date: new Date() },
        { name: "B", message: "B message", date: new Date() },
      ]);

      const spyDispatch = jest.spyOn(store, "dispatch");
      await updateMessages();
      expect(spyDispatch).not.toHaveBeenCalled();

      await updateMessages();
      expect(spyDispatch).not.toHaveBeenCalled();
    });
  });

  describe("filterMessages", () => {
    it("is a function", () => {
      expect(filterMessages).toBeInstanceOf(Function);
    });

    it("calls addMessages only with correct messages", () => {
      const messages = [
        { AuthorName: "B", data: "B message", date: new Date() },
        { name: "A", message: "A message", date: new Date() },
        { message: "A message", date: new Date() },
        { name: "A", message: "A message" },
        { message: "A message" },
        { name: "B", message: "B message", date: new Date() },
      ];

      expect(filterMessages(messages)).toEqual([messages[1], messages[5]]);
    });
  });
});
