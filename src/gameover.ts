import {
  Actor,
  CollisionType,
  Color,
  EasingFunctions,
  Engine,
  Graphics,
  vec,
  ExitTriggerEvent,
} from "excalibur";
import { DialogCard } from "./dialogCard";

import Config from "./config";
import config from "./config";
import { Button } from "./button";
import {newgame} from "./session";
import { SoundManager } from "./soundManager";

export class GameOver extends Actor {

  private card!: DialogCard;
  private backShadow!: Graphics.Rect;
  private backshadowLayer!: Graphics.GraphicsLayer;
  private button!: Button;

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
      height: Config.GameHeight + 500,
      color: Color.fromRGB(51, 51, 51, 0.5)
    });
    this.z = 100;

    this.pos = vec(100,100);
    this.button = new Button("Play Again?",{
      pos: cardPos,
      width: 200,
      height: 100
    });
    this.scene.add(this.button);
    this.button.z = 100;

    this.button.on("pointerup", () => {
      if (this.button.isKilled()) return;
      console.log(`reset button alive?: ${this.button.isKilled()}`);
      for (let actor of this.scene.actors) {
        actor.kill();
      }
      engine.removeScene(this.scene);
      this.button.pos.add(vec(10000,10000));
      newgame(engine);
    });
  }

  show() {
    this.backshadowLayer.show(this.backShadow);
    this.card.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight / 2,
      500,
      EasingFunctions.EaseInOutCubic
    );
    this.button.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight / 2 + 125,
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
    this.button.actions.easeTo(
      Config.GameWidth / 2,
      Config.GameHeight * 2,
      500,
      EasingFunctions.EaseInOutCubic
    );
  }
}
