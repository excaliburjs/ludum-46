import { Actor, Color, Engine, Graphics, Resource } from "excalibur";
import { Resources } from "./resources";
import { RawImage } from "~../lib/excalibur/build/dist/Graphics";
export class CueCard extends Actor {
  private cues: Graphics.GraphicsLayer;

  constructor() {
    super();
    const rect = new Graphics.Rect({
      width: 100,
      height: 100,
      color: Color.White,
    });

    const timerRect = new Graphics.Rect({
      width: 100,
      height: 100,
      color: Color.White,
    });

    this.graphics.add(rect);

    //Background (grey)
    const background = this.graphics.createLayer({
      name: "background",
      order: -1,
    });
    background.show(rect);
    //Timer (white)
    const timer = this.graphics.createLayer({ name: "timer", order: 1 });
    timer.show(timerRect);
    //Symbol Loc1
    //Symbol Loc2
    //Symbol Loc3

    this.cues = this.graphics.createLayer({ name: "cues", order: 2 });

    let stageLeft = new Graphics.RawImage("./assets/stage-left.png");
    let stageLeftSprite = Graphics.Sprite.from(stageLeft);
    this.cues.show(stageLeftSprite);
  }

  public onInitialize(engine: Engine) {
    let prop = {};
    let costume = {};
    let location = {};
    let timer = {};
  }

  public update(engine: Engine, delta: number) {}
}
