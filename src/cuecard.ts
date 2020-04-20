import {
  Actor,
  Color,
  Engine,
  Graphics,
  Vector,
  vec,
  GameEvent,
  Resource,
  Animation,
  Util,
} from "excalibur";
import { Resources } from "./resources";
import { Locations, StageProps, Costumes } from "./constants";
import Items, { Item } from "./items";
import { stats } from "./session";
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
  public timerAnimation!: Graphics.Animation;

  private _running: boolean = true;
  public failed = false;

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
    this._setUpTimer(this.timer);
    // this._setUpLocationSymbol(options.requiredLocation);
    this._setUpPropSymbol(options.requiredProp);
    this._setUpCostumeSymbol(options.requiredCostume);
    this._setUpFailedPropSymbol();
    this._setUpFailedCostumeSymbol();
  }

  public onInitialize(engine: Engine) {}

  public pause() {
    this._running = false;
    this.timerAnimation.pause();
  }
  public play() {
    this._running = true;
    this.timerAnimation.play();
  }

  public update(engine: Engine, delta: number) {
    if (!this._running) return;
    this.timer -= delta / 1000;
    // this.timerRect.width = (this.cueCardWidth * this.timer) / this.lifeTime;

    if (this.timer <= 0) {
      const event = new CueCardExpiredEvent(this);
      this.scene.emit(CueCardEvents.CueCardExpired, event);
      this.kill();
    } else {
      if (stats().isGameOver === true) {
        this.pause();
      }
    }
  }

  kill() {
    super.kill();
  }

  public Satisfied(): void {
    const event = new CueCardExpiredEvent(this);
    this.scene.emit(CueCardEvents.CueCardSatisfied, event);
    this.kill();
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
    const back = Graphics.Sprite.from(Resources.cuecardBaseImage);
    background.offset = this.pos.add(vec(90, -50));
    background.show(back);
  }

  private _setUpTimer(totaltime: number): void {
    const sheet = Graphics.SpriteSheet.fromGrid({
      image: Resources.cuecardTimerSheet,
      grid: {
        rows: 1,
        columns: 38,
        spriteWidth: 53,
        spriteHeight: 52,
      },
    });
    const timer = Graphics.Animation.fromSpriteSheet(
      sheet,
      Util.range(0, 37),
      (totaltime * 1000) / 38,
      Graphics.AnimationStrategy.Freeze
    );
    const timerLayer = this.graphics.createLayer({ name: "timer", order: 0 });
    timerLayer.offset = this.pos.add(vec(174, 90));
    timerLayer.show(timer);
    this.timerAnimation = timer;
  }

  private _setUpLocationSymbol(requiredLocation: Locations): void {
    const locationSymbolLayer = this.graphics.createLayer({
      name: "locationSymbol",
      order: 2,
    });

    locationSymbolLayer.offset = this._calculateRelativePosition(1);

    let sprite = Items.getIconSprite(requiredLocation);
    this._setUpSymbolWidthHeight(sprite);
    locationSymbolLayer.show(sprite);
  }

  private _setUpSymbolWidthHeight(sprite: Graphics.Sprite) {
    // sprite.destSize.width = this.symbolWidth;
    // sprite.destSize.height = this.symbolHeight;
  }

  private _setUpPropSymbol(requiredProp: StageProps): void {
    const propSymbolLayer = this.graphics.createLayer({
      name: "propSymbol",
      order: 3,
    });

    propSymbolLayer.offset = this._calculateRelativePosition(2);

    let sprite = Items.getIconSprite(requiredProp);
    this._setUpSymbolWidthHeight(sprite);
    propSymbolLayer.show(sprite);
  }

  private _setUpCostumeSymbol(requiredCostume: Costumes): void {
    const costumeSymbolLayer = this.graphics.createLayer({
      name: "costumeSymbol",
      order: 4,
    });

    costumeSymbolLayer.offset = this._calculateRelativePosition(3);

    let sprite = Items.getIconSprite(requiredCostume);
    this._setUpSymbolWidthHeight(sprite);
    costumeSymbolLayer.show(sprite);
  }

  private _setUpFailedPropSymbol(): void {
    const failedLayer = this.graphics.createLayer({
      name: "failedPropSymbol",
      order: 5,
    });

    failedLayer.offset = this._calculateRelativePosition(2);
  }

  private _setUpFailedCostumeSymbol(): void {
    const failedLayer = this.graphics.createLayer({
      name: "failedCostumeSymbol",
      order: 5,
    });

    failedLayer.offset = this._calculateRelativePosition(3);
  }

  showFailedCostume() {
    let redCheck = Items.getIconSprite("redCheck");
    this.graphics.getLayer("failedCostumeSymbol")?.show(redCheck);
    this.pause();
  }

  showFailedProp() {
    let redCheck = Items.getIconSprite("redCheck");
    this.graphics.getLayer("failedPropSymbol")?.show(redCheck);
    this.pause();
  }
}
