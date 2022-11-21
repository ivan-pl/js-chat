import { createMessageElement } from "./domController";
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
