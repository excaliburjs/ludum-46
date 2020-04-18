import { Actor, Color, Engine, Graphics, Vector, vec } from "excalibur";

export interface CueCardOptions {
  // The lifetime in seconds of the cue card
  lifeTime: number;
  requiredLocation: any;
  requiredProp: any;
  requiredCostume: any;
}

export class CueCard extends Actor {
  private timer: number;
  private timerRect: Graphics.Rect;
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

    this._setUpBackground();
    this._setUpTimer();
    this._setUpLocationSymbol();
    this._setUpPropSymbol();
    this._setUpCostumeSymbol();
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

  private _setUpBackground(): void {
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
  }

  private _setUpTimer(): void {
    const timerLayer = this.graphics.createLayer({ name: "timer", order: 0 });
    this.timerRect = new Graphics.Rect({
      width: 100,
      height: 100,
      color: Color.White,
    });

    timerLayer.show(this.timerRect);
  }

  private _setUpLocationSymbol(): void {
    const locationSymbolLayer = this.graphics.createLayer({
      name: "locationSymbol",
      order: 2,
    });
    //Symbol Loc1
    const locationSprite = new Graphics.Rect({
      width: 50,
      height: 100,
      color: Color.Red,
    });

    locationSymbolLayer.offset = vec(10, 0);
    locationSymbolLayer.show(locationSprite);
  }
  private _setUpPropSymbol(): void {
    const propSymbolLayer = this.graphics.createLayer({
      name: "propSymbol",
      order: 2,
    });
    const propSprite = new Graphics.Rect({
      width: 50,
      height: 100,
      color: Color.Red,
    });

    propSymbolLayer.show(propSprite);
  }
  private _setUpCostumeSymbol(): void {
    const costumeSymbolLayer = this.graphics.createLayer({
      name: "costumeSymbol",
      order: 2,
    });
    const constumeSprite = new Graphics.Rect({
      width: 50,
      height: 100,
      color: Color.Red,
    });
    costumeSymbolLayer.show(constumeSprite);
  }
}
