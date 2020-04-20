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
import { newgame, stats } from "./session";
import { SoundManager } from "./soundManager";
import { Resources } from "./resources";

export class GameOver extends Actor {
  private card!: DialogCard;
  private backShadow!: Graphics.Rect;
  private backShadowLayer!: Graphics.GraphicsLayer;
  private button!: Button;
  private engine!: Engine;
  constructor() {
    super(Config.GameWidth / 2, Config.GameHeight * 2, 600, 600);
  }

  onInitialize(engine: Engine) {
    this.engine = engine;
    this.backShadowLayer = this.graphics.createLayer({
      name: "backshadow",
      order: 1,
    });
    this.backShadow = new Graphics.Rect({
      width: Config.GameWidth + 500,
      height: Config.GameHeight + 500,
      color: Color.fromRGB(51, 51, 51, 0.5),
    });
  }

  public updateEndScreen() {
    const cardPos = vec(this.pos.x, this.pos.y);
    let text = "The show has not gone on!";
    if (stats().numLinesDelivered >= Config.NumCueCardsToWin) {
      let descriptor = "";
      Resources.applause.play();
      const score = stats().currentAudienceScore;
      if (score >= Config.GreatScoreCutoff) {
        descriptor = "great ";
      }
      if (score >= Config.RoaringScoreCutoff) {
        descriptor = "roaring ";
      }
      text = `The show was a ${descriptor}success!`;
    } else {
      Resources.boo.play();
    }
    const costumesChanged = `You changed costumes ${
      stats().numCostumeChanges
    } times.`;
    const propsUsed = `You used ${stats().numPropsUsed} props.`;
    this.card = new DialogCard([text, costumesChanged, propsUsed, ""], {
      pos: cardPos,
      topPadding: 30,
    });
    this.scene.add(this.card);
    this.card.z = 100;

    this.z = 100;

    this.button = new Button("Play Again?", {
      pos: cardPos,
      width: 200,
      height: 100,
    });
    this.button.on("pointerup", () => {
      if (this.button.isKilled()) return;
      console.log(`reset button alive?: ${this.button.isKilled()}`);
      for (let actor of this.scene.actors) {
        actor.kill();
      }
      this.engine.removeScene(this.scene);
      this.button.pos.add(vec(10000, 10000));
      newgame(this.engine);
    });
    this.scene.add(this.button);
    this.button.z = 100;
  }

  show() {
    this.backShadowLayer.show(this.backShadow);
    this.pos = vec(0, 0);
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
    this.backShadowLayer.hide();
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
