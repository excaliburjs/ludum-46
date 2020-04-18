import { Actor, Color, Engine, Graphics } from "excalibur";

export interface CueCardOptions {
  // The lifetime in seconds of the cue card
  lifeTime: number;
  requiredLocation: any;
  requiredProp: any;
  requiredCostume: any;
}

export class CueCard extends Actor {
  private timerRect: Graphics.Rect;
  private timer: number;
  private lifeTime: number;
  private cueCardWidth: number = 1000;
  // the spacing between symbols as a % of cue card max width
  // There are 4 padding sections
  // The rest of the spacing is given equally to the three symbols
  //
  //  |----------------------------------------     |
  //  |                                             |
  //  |   |---------|   |---------|   |---------|   |
  //  |-x-|----y----|-x-|----y----|-x-|----y----|-x-|
  //  |   |---------|   |---------|   |---------|   |
  //  |                                             |
  //  |----------------------------------------------
  //
  private padding: number = 5;

  constructor(options: CueCardOptions) {
    super();
    this.timer = this.lifeTime = 10;

    //#region  background
    const background = this.graphics.createLayer({
      name: "background",
      order: -1,
    });
    const backgroundRect = new Graphics.Rect({
      width: this.cueCardWidth,
      height: 100,
      color: Color.White,
    });
    backgroundRect.opacity = 0.33;
    background.show(backgroundRect);
    //#endregion background

    const timerRect = new Graphics.Rect({
      width: 100,
      height: 100,
      color: Color.White,
    });
    timerLayer.show(this.timerRect);
    //#endregion timer

    //#region Symbol Layer
    const symbolLayer = this.graphics.createLayer({ name: "goals", order: 2 });
    //Symbol Loc1
    const locationSprite = new Graphics.Rect({
        width: 50,
        height: 100,
        color: Color.Red,
    });
    const propSprite = new Graphics.Rect({
        width: 50,
        height: 100,
        color: Color.Red,
    });
    const constumeSprite = new Graphics.Rect({
        width: 50,
        height: 100,
        color: Color.Red,
    });
    symbolLayer.show(locationSprite);
    symbolLayer.show(propSprite);
    symbolLayer.show(constumeSprite);
    //#endregion
  }

  public onInitialize(engine: Engine) {}

  public update(engine: Engine, delta: number) {
    this.timer -= delta / 1000;
    this.timerRect.width = (1000 * this.timer) / this.lifeTime;

    if (this.timer <= 0) {
      //do something with points
      this.kill();
    }
  }

  public isSatisfied(player: any): boolean {
    // if player location in spot, return true;
    return false;
  }
}
