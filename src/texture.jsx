import { Container, Sprite, Texture, Text } from "pixi.js";
import { Graphics } from "@pixi/graphics";
import { Input, Button } from "@pixi/ui";
import reactLogo from "./assets/react.svg";

export default function run(app) {
  const container = new Container();
  app.stage.addChild(container);

  const text = new Text("This is a PixiJS text", {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xffffff,
    align: "center",
  });
  container.addChild(text);

  const borderColor = "#ffffff";
  const backgroundColor = "#ffffff";
  const fontSize = 12;
  const maxLength = 100;
  const align = ["center", "left", "right"];
  const placeholder = "Enter text";
  const textColor = "#000000";
  const width = 320;
  const height = 100;
  const radius = 11;
  const border = 5;
  const paddingTop = 0;
  const paddingRight = 10;
  const paddingBottom = 0;
  const paddingLeft = 10;
  const cleanOnFocus = true;
  const input = new Input({
    bg: new Graphics()
      .beginFill(borderColor)
      .drawRoundedRect(0, 0, width, height, radius + border)
      .beginFill(backgroundColor)
      .drawRoundedRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius
      ),
    textStyle: {
      fill: textColor,
      fontSize,
      fontWeight: "bold",
    },
    maxLength,
    align,
    placeholder,
    value: text,
    padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
    cleanOnFocus,
  });

  input.onEnter.connect((val) => {
    console.log(`Input (${val})`);
  });
  container.addChild(input);

  // const input = new Input({
  //   bg: 0xaaaaaa,
  //   placeholder: "Enter text",
  //   padding: {
  //     top: 11,
  //     right: 11,
  //     bottom: 11,
  //     left: 11,
  //   }, // alternatively you can use [11, 11, 11, 11] or [11, 11] or just 11
  // });
  //container.addChild(input.view);

  // Move container to the center
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  // Center logo sprite in local container coordinates
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  //   app.ticker.add((delta) => {
  //     container.rotation -= 0.01 * delta;
  //   });
  //
}
