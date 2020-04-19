import {
  Actor,
  Color,
  Engine,
  Graphics,
  Vector,
  vec,
  GameEvent,
  Resource,
} from "excalibur";
import { Resources } from "./resources";
import { Locations, StageProps, Costumes } from "./constants";
import Items from "./items";
export interface CueCardOptions {
  // The lifetime in seconds of the cue card
  lifeTime: number;
  requiredLocation: Locations;
  requiredProp: StageProps;
  requiredCostume: Costumes;
  cueCardHeight: number;
  cueCardWidth: any;
  cueCardLoc: Vector;
}

export enum CueCardEvents {
  CueCardExpired = "CueCardExpired",
  CueCardSatisfied = "CueCardSatisfied",
}

export class CueCardExpiredEvent extends GameEvent<CueCard, false> {
  constructor(public cueCard: CueCard) {
    super();
  }
}

export class CueCard extends Actor {
  private timer: number;
  private timerRect!: Graphics.Rect;
  private lifeTime: number;
  private cueCardWidth: number;
  private cueCardHeight: number;

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
  private xPaddingPercent: number;
  private xPadding: number;
  private symbolWidth: number;
  private yPaddingPercent: number;
  private yPadding: number;
  private symbolHeight: number;
  public options: CueCardOptions;

  constructor(options: CueCardOptions) {
    super();
    this.timer = this.lifeTime = options.lifeTime;

    this.options = options;
    this.pos = options.cueCardLoc;
    this.cueCardHeight = options.cueCardHeight;
    this.cueCardWidth = options.cueCardWidth;
    this.xPaddingPercent = 0.15;
    this.xPadding = (this.xPaddingPercent * this.cueCardWidth) / 4;
    this.symbolWidth = ((1 - this.xPaddingPercent) * this.cueCardWidth) / 3;
    this.yPaddingPercent = 0.2;
    this.yPadding = (this.yPaddingPercent * this.cueCardHeight) / 2;
    this.symbolHeight = (1 - this.yPaddingPercent) * this.cueCardHeight;

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
      this.kill();
    }
  }

  kill() {
    const event = new CueCardExpiredEvent(this);
    this.scene.emit(CueCardEvents.CueCardExpired, event);
    super.kill();
  }

  private _calculateRelativePosition(symbolNumber: number): Vector {
    const totalPadding = symbolNumber * this.xPadding;
    const positionalOffset = (symbolNumber - 1) * this.symbolWidth;
    return vec(
      this.pos.x + totalPadding + positionalOffset,
      this.pos.y + this.yPadding
    );
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
    background.offset = this.pos;
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
    timerLayer.offset = this.pos;
    timerLayer.show(this.timerRect);
  }

  private _setUpLocationSymbol(requiredLocation: Locations): void {
    const locationSymbolLayer = this.graphics.createLayer({
      name: "locationSymbol",
      order: 2,
    });

    locationSymbolLayer.offset = this._calculateRelativePosition(1);

    let sprite = Items.getLocationSprite(requiredLocation);
    this._setUpSymbolWidthHeight(sprite);
    locationSymbolLayer.show(sprite);
  }

  private _setUpSymbolWidthHeight(sprite: Graphics.Sprite) {
    sprite.destSize.width = this.symbolWidth;
    sprite.destSize.height = this.symbolHeight;
  }

  private _setUpPropSymbol(requiredProp: StageProps): void {
    const propSymbolLayer = this.graphics.createLayer({
      name: "propSymbol",
      order: 3,
    });

    propSymbolLayer.offset = this._calculateRelativePosition(2);

    let sprite = Items.getPropSprite(requiredProp);
    this._setUpSymbolWidthHeight(sprite);
    propSymbolLayer.show(sprite);
  }

  private _setUpCostumeSymbol(requiredCostume: Costumes): void {
    const costumeSymbolLayer = this.graphics.createLayer({
      name: "costumeSymbol",
      order: 4,
    });

    costumeSymbolLayer.offset = this._calculateRelativePosition(3);

    let sprite = Items.getCostumeSprite(requiredCostume);
    this._setUpSymbolWidthHeight(sprite);
    costumeSymbolLayer.show(sprite);
  }
}
