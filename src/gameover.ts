import {
  Actor,
  CollisionType,
  Color,
  EasingFunctions,
  Engine,
  Graphics,
  vec,
} from "excalibur";
import { DialogCard } from "./dialogCard";

import Config from "./config";
import config from "./config";

export class GameOver extends Actor {

  private card!: DialogCard;
  private backShadow!: Graphics.Rect;
  private backshadowLayer!: Graphics.GraphicsLayer;

  constructor() {
    super(Config.GameWidth / 2, Config.GameHeight * 2, 600, 600);
  }

  onInitialize(engine: Engine) {

    const cardPos = vec(
      this.pos.x,
      this.pos.y
    );
    this.card = new DialogCard("The show has not gone on!", {
      pos: cardPos,
    });
    this.scene.add(this.card);
    this.card.z = 100;
    this.backshadowLayer = this.graphics.createLayer({name: "backshadow", order: 1});
    this.backShadow = new Graphics.Rect({
      width: Config.GameWidth + 500,
      height: config.GameHeight + 500,
      color: Color.fromRGB(51,51,51,0.5)
    });
    this.z = 99;
    this.pos = vec(100,100);
    // this.body.collider.type = CollisionType.PreventCollision;
    // this.graphics.add(
    //   new Graphics.Rect({
    //     color: Color.DarkGray,
    //     width: 600,
    //     height: 600,
    //   })
    // );
    // this.graphics.createLayer({ name: "foreground", order: 1 }).show(
    //   new Graphics.Text({
    //     text: "The show has not gone on",
    //     font: new Graphics.Font({
    //       size: 50,
    //       family: "sans-serif",
    //     }),
    //   })
    // );
    // this.graphics.getLayer("foreground")!.offset = vec(0, 100);

    // this.graphics.createLayer({ name: "button", order: 1 }).show(
    //   new Graphics.Text({
    //     text: "Play Again?",
    //     font: new Graphics.Font({
    //       size: 50,
    //       family: "sans-serif",
    //     }),
    //   })
    // );

    // this.graphics.getLayer("button")!.offset = vec(0, 500);

    this.on("pointerup", () => {
      // reset
      console.log("reset");
    });

    this.z = 100;
  }

  show() {
    this.backshadowLayer.show(this.backShadow);
    this.card.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight / 2,
      500,
      EasingFunctions.EaseInOutCubic
    );
  }

  hide() {
    this.backshadowLayer.hide();
    this.card.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight * 2,
      500,
      EasingFunctions.EaseInOutCubic
    );
  }
}
