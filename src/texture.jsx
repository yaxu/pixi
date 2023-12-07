import { Container, Sprite, Texture, Text } from "pixi.js";

import { Graphics } from "@pixi/graphics";
import { Input, Button } from "@pixi/ui";
import reactLogo from "./assets/react.svg";

import { functions } from "./types.jsx";
window.functions = functions;
console.log(functions);

function add_word(app, word, position) {
  const borderColor = "#ffffff";
  const backgroundColor = "#ffffff";
  const fontSize = 14;
  const maxLength = 100;
  const align = ["center", "left", "right"];
  const placeholder = "Enter text";
  const textColor = "#000000";
  const width = 200;
  const height = 30;
  const radius = 0;
  const border = 1;
  const paddingTop = 0;
  const paddingRight = 10;
  const paddingBottom = 0;
  const paddingLeft = 10;
  const cleanOnFocus = false;

  const input = new Input({
    bg: new Graphics()
      .beginFill(borderColor)
      .drawRect(0, 0, width, height, radius + border)
      .beginFill(backgroundColor)
      .drawRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius
      ),
    textStyle: {
      fill: textColor,
      fontSize,
      fontWeight: "normal",
    },
    maxLength,
    align,
    placeholder,
    value: "hello",
    padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
    cleanOnFocus,
  });

  const text = new Text(word, {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xffffff,
    align: "center",
  });

  text.eventMode = "static";
  text.cursor = "pointer";
  text.interactive = true;

  text.x = position.x;
  text.y = position.y;

  text.on("click", function (e) {
    if (e.detail == 2) {
      console.log("clicky", e.detail);
      input.x = text.x;
      input.y = text.y;
      input.value = text.text;
      app.stage.removeChild(text);
      app.stage.addChild(input);
    }
    e.stopPropagation();
  });

  app.stage.on("pointerup", onDragEnd);
  app.stage.on("pointerupoutside", onDragEnd);

  let dragTarget = null;
  let dragOffset = null;
  function onDragMove(e) {
    if (dragTarget) {
      dragTarget.parent.toLocal(
        { x: e.global.x - dragOffset.x, y: e.global.y - dragOffset.y },
        null,
        dragTarget.position
      );
    }
  }

  function onDragStart(e) {
    this.alpha = 0.5;
    dragTarget = this;
    dragOffset = this.toLocal(e.global);
    app.stage.on("pointermove", onDragMove);
  }
  text.on("pointerdown", onDragStart);

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }
  app.stage.addChild(text);

  input.onEnter.connect((val) => {
    app.stage.removeChild(input);
    text.text = val;
    app.stage.addChild(text);
  });
}

export default function run(app) {
  console.log("hello");
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("click", function (e) {
    if (e.detail == 2) {
      console.log("oh!");
      add_word(app, "bingo", e.global);
    }
  });
}
