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

  constructor(options: CueCardOptions) {
    super();
    this.timer = this.lifeTime = 10;

    this.vel = options.cueCardLoc;
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
      //do something with points
      this.emit(CueCardEvents.CueCardExpired, new GameEvent());
      this.kill();
    }
  }

  public isSatisfied(player: any): boolean {
    // if player location in spot, return true;
    return false;
  }

  public trySatisfyCueCard(player: any): void {
    if (this.isSatisfied(player)) {
      this.emit(CueCardEvents.CueCardSatisfied, new GameEvent());
      // this.kill(); //TODO this kills the whole game
    }
  }

  private _calculateRelativePosition(symbolNumber: number): Vector {
    const totalPadding = symbolNumber * this.xPadding;
    const positionalOffset = (symbolNumber - 1) * this.symbolWidth;
    return vec(
      this.vel.x + totalPadding + positionalOffset,
      this.vel.y + this.yPadding
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
    background.offset = this.vel;
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
    timerLayer.offset = this.vel;
    timerLayer.show(this.timerRect);
  }

  private _setUpLocationSymbol(requiredLocation: any): void {
    const locationSymbolLayer = this.graphics.createLayer({
      name: "locationSymbol",
      order: 2,
    });

    const stageLeftSprite = Graphics.Sprite.from(Resources.stageLeftImage);
    const stageRightSprite = Graphics.Sprite.from(Resources.stageRightImage);
    const stageCenterSprite = Graphics.Sprite.from(Resources.stageCenterImage);

    locationSymbolLayer.offset = this._calculateRelativePosition(1);
    switch (requiredLocation) {
      case Locations.stageLeft:
        locationSymbolLayer.show(stageLeftSprite);
        break;
      case Locations.stageRight:
        locationSymbolLayer.show(stageRightSprite);
        break;
      default:
        locationSymbolLayer.show(stageCenterSprite);
    }
  }

  private _setUpPropSymbol(requiredProp: any): void {
    const propSymbolLayer = this.graphics.createLayer({
      name: "propSymbol",
      order: 3,
    });

    const rubberChickenSprite = Graphics.Sprite.from(
      Resources.rubberChickenImage
    );

    propSymbolLayer.offset = this._calculateRelativePosition(2);

    switch (requiredProp) {
      case StageProps.rubberChicken:
        propSymbolLayer.show(rubberChickenSprite);
        break;
      // case StageProps.umbrella:
      //   propSymbolLayer.show(stageRightSprite);
      //   break;
      default:
        propSymbolLayer.show(rubberChickenSprite);
    }
  }

  private _setUpCostumeSymbol(requiredCostume: any): void {
    const costumeSymbolLayer = this.graphics.createLayer({
      name: "costumeSymbol",
      order: 4,
    });

    costumeSymbolLayer.offset = this._calculateRelativePosition(3);

    const vikingHatSprite = Graphics.Sprite.from(Resources.vikingHatImage);

    switch (requiredCostume) {
      case Costumes.vikingHat:
        costumeSymbolLayer.show(vikingHatSprite);
        break;
      // case Costumes.umbrella:
      //   costumeSymbolLayer.show(stageRightSprite);
      //   break;
      default:
        costumeSymbolLayer.show(vikingHatSprite);
    }
  }
}
