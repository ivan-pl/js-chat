import "normalize.css";
import "./style.scss";
import { initApp, addMessages } from "./scripts/app";

const messages = Array.from({ length: 15 }, (_, k) => ({
  date: new Date(),
  message: `Some messagesaddddddd ddddddddddddddddd ddddddddddddddddddddddddddddd ${k}`,
  name: `Some nickname ${k}`,
}));

const app = initApp(document.body);
addMessages(app.querySelector("#message-history")!, messages);
