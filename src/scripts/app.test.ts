import initApp from "./app";

describe("app", () => {
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
