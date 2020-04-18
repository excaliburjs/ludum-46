import {
  Actor,
  Color,
  Engine,
  Graphics,
  Vector,
  vec,
  GameEvent,
} from "excalibur";
import { Resources } from "./resources";
export interface CueCardOptions {
  // The lifetime in seconds of the cue card
  lifeTime: number;
  requiredLocation: any;
  requiredProp: any;
  requiredCostume: any;
}

export enum CueCardEvents {
  CueCardExpired = "CueCardExpired",
}

export class CueCard extends Actor {
  private timer: number;
  private timerRect!: Graphics.Rect;
  private lifeTime: number;
  private cueCardWidth: number = 300;
  private cueCardHeight: number = 100;

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
  private padding: number = 0.05 * this.cueCardWidth;
  private symbolWidth:number =  (1-this.padding) * this.cueCardWidth / 3;

  constructor(options: CueCardOptions) {
    super();
    this.timer = this.lifeTime = 10;

    this._setUpBackground();
    this._setUpTimer();
    this._setUpLocationSymbol(options.requiredLocation);
    this._setUpPropSymbol(options.requiredProp);
    this._setUpCostumeSymbol(options.requiredCostume);
  }

  public onInitialize(engine: Engine) {}

  public update(engine: Engine, delta: number) {
    this.timer -= delta / 1000;
    this.timerRect.width = (this.cueCardWidth * this.timer) / this.lifeTime;

    if (this.timer <= 0) {
      //do something with points
      this.emit(CueCardEvents.CueCardExpired, new GameEvent());
      this.kill();
    }
  }

  public isSatisfied(player: any): boolean {
    // if player location in spot, return true;
    return false;
  }

  private _calculateRelativePosition(symbolNumber: number): Vector {
    const totalPadding = symbolNumber * this.padding;
    const positionalOffset = (symbolNumber - 1) * this.symbolWidth;
    return vec(this.vel.x + totalPadding + positionalOffset, this.vel.y);
  }
  private _setUpBackground(): void {
    const background = this.graphics.createLayer({
      name: "background",
      order: -1,
    });
    const backgroundRect = new Graphics.Rect({
      width: this.cueCardWidth,
      height: this.cueCardHeight,
      color: Color.White,
    });
    backgroundRect.opacity = 0.33;
    background.show(backgroundRect);
  }

  private _setUpTimer(): void {
    const timerLayer = this.graphics.createLayer({ name: "timer", order: 0 });
    this.timerRect = new Graphics.Rect({
      width: this.cueCardWidth,
      height: this.cueCardHeight,
      color: Color.White,
    });

    timerLayer.show(this.timerRect);
  }

  private _setUpLocationSymbol(requiredLocation: any): void {
    const locationSymbolLayer = this.graphics.createLayer({
      name: "locationSymbol",
      order: 2,
    });

    const stageLeftSprite = Graphics.Sprite.from(Resources.stageLeftImage);
    locationSymbolLayer.offset = this._calculateRelativePosition(1);
    locationSymbolLayer.show(stageLeftSprite);
  }
  private _setUpPropSymbol(requiredProp: any): void {
    const propSymbolLayer = this.graphics.createLayer({
      name: "propSymbol",
      order: 3,
    });
    const propSprite = new Graphics.Rect({
      width: this.symbolWidth,
      height: 100,
      color: Color.Red,
    });
    propSymbolLayer.offset = this._calculateRelativePosition(2);
    propSymbolLayer.show(propSprite);
  }
  private _setUpCostumeSymbol(requiredCostume: any): void {
    const costumeSymbolLayer = this.graphics.createLayer({
      name: "costumeSymbol",
      order: 4,
    });
    const constumeSprite = new Graphics.Rect({
      width: this.symbolWidth,
      height: 100,
      color: Color.Red,
    });
    costumeSymbolLayer.offset = this._calculateRelativePosition(3);
    costumeSymbolLayer.show(constumeSprite);
  }
}
