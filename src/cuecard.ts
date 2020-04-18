import { Actor, Color, Engine, Graphics } from "excalibur";

export class CueCard extends Actor {
  private background: Graphics.GraphicsLayer;
  private timerRect: Graphics.Rect;
  private timer: number;
  private lifeTime: number;
  private cueCardWidth: number = 1000;

  constructor() {
    super();
    this.timer = this.lifeTime = 10;

    //#region  background
    this.background = this.graphics.createLayer({
      name: "background",
      order: -1,
    });
    const rect = new Graphics.Rect({
      width: this.cueCardWidth,
      height: 100,
      color: Color.Gray,
    });
    this.background.show
    //#endregion background

    //#region timer
    const timerLayer = this.graphics.createLayer({ name: "timer", order: 1 });
    this.timerRect = new Graphics.Rect({
      width: this.cueCardWidth,
      height: 100,
      color: Color.White,
    });(rect);
    timerLayer.show(this.timerRect);
    //#endregion timer

    //#region Symbol Layer
    //Symbol Loc1
    //Symbol Loc2
    //Symbol Loc3
    this.graphics.createLayer({ name: "goals", order: 2 });
    //#endregion

  }

  public onInitialize(engine: Engine) {
  }

  public update(engine: Engine, delta: number) {
    this.timer -= delta / 1000;
    this.timerRect.width = 1000 * this.timer / this.lifeTime;

    if(this.timer <= 0) {
        this.kill();
    }
  }
}
