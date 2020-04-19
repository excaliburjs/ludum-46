import {
  Actor,
  Graphics,
  Color,
  EasingFunctions,
  vec,
  CollisionType,
} from "excalibur";

import Config from "./config";

export class GameOver extends Actor {
  constructor() {
    super(Config.GameWidth / 2, Config.GameHeight * 2, 600, 600);
  }

  onInitialize() {
    this.body.collider.type = CollisionType.PreventCollision;
    this.graphics.add(
      new Graphics.Rect({
        color: Color.DarkGray,
        width: 600,
        height: 600,
      })
    );
    this.graphics.createLayer({ name: "foreground", order: 1 }).show(
      new Graphics.Text({
        text: "The show has not gone on",
        font: new Graphics.Font({
          size: 50,
          family: "sans-serif",
        }),
      })
    );
    this.graphics.getLayer("foreground")!.offset = vec(0, 100);

    this.graphics.createLayer({ name: "button", order: 1 }).show(
      new Graphics.Text({
        text: "Play Again?",
        font: new Graphics.Font({
          size: 50,
          family: "sans-serif",
        }),
      })
    );

    this.graphics.getLayer("button")!.offset = vec(0, 500);

    this.on("pointerup", () => {
      // reset
      console.log("reset");
    });

    this.z = 100;
  }

  show() {
    this.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight / 2,
      500,
      EasingFunctions.EaseInOutCubic
    );
  }

  hide() {
    this.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight * 2,
      500,
      EasingFunctions.EaseInOutCubic
    );
  }
}
