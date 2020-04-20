import {
  Actor,
  Engine,
  Graphics,
  Color,
  Vector,
  CollisionType,
} from "excalibur";
import { Resources } from "./resources";
import { CueCard } from "./cuecard";
import { Costumes, StageProps } from "./constants";
import Items, { Item } from "./items";
import { stats } from "./session";
import { Player } from "./player";
import Config from "./config";

export class Inventory extends Actor {
  private _costume?: Costumes;
  private _prop?: StageProps;
  private _engine: Engine;
  private _propX?: number;
  private _propY?: number;
  private _costumeX?: number;
  private _costumeY?: number;

  constructor(engine: Engine, x: number, y: number) {
    super(x, y, 200, 80);
    this._engine = engine;
    this._setUpLayers();
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);

    if (this._prop) {
      let sprite = Items.getIconSprite(this._prop);
      let layer = this.graphics.getLayer("prop");
      layer!.offset = new Vector(0, 0);
      layer?.show(sprite);
    }

    if (this._costume) {
      let sprite = Items.getIconSprite(this._costume);
      let layer = this.graphics.getLayer("costume");
      let widthOffset = (this.width * 2) / 3 - 15;
      layer!.offset = new Vector(widthOffset, 0);
      layer?.show(sprite);
    }
  }

  public addCostume(item: Costumes, spawnLocation: Vector) {
    // drop the item if holding one
    if (this._costume) {
      let currentCostume = this._costume;
      let sprite = Items.getIconSprite(currentCostume);
      let actor = new Item(
        "costume",
        currentCostume,
        sprite,
        this._costumeX!,
        this._costumeY!
      );
      this.scene.add(actor);
    }
    this._costume = item;
    this._costumeX = spawnLocation.x;
    this._costumeY = spawnLocation.y;
  }

  public addProp(item: StageProps, spawnLocation: Vector) {
    // drop the item if holding one
    if (this._prop) {
      let currentProp = this._prop;
      let sprite = Items.getIconSprite(this._prop);
      let actor = new Item(
        "prop",
        currentProp,
        sprite,
        this._propX!,
        this._propY!
      );
      this.scene.add(actor);
    }

    this._prop = item;
    this._propX = spawnLocation.x;
    this._propY = spawnLocation.y;
  }

  public getQueueCardScore(card: CueCard): number {
    let score = Config.ScoreBaseIncrease;
    let inventoryBonus = 0;
    if (card.options.requiredProp == this._prop) {
      inventoryBonus += Config.ScoreIncreasePerProp;
    } else {
      card.failed = true;
      card.showFailedProp();
    }
    if (card.options.requiredCostume == this._costume) {
      inventoryBonus += Config.ScoreIncreasePerProp;
    } else {
      card.failed = true;
      card.showFailedCostume();
    }
    if (
      card.options.requiredCostume == this._costume &&
      card.options.requiredProp == this._prop
    ) {
      inventoryBonus *= Config.ScoreMultiplier;
    }
    if (
      card.options.requiredProp != this._prop &&
      card.options.requiredCostume != this._costume
    ) {
      inventoryBonus = -Config.ScorePunishment;
    }
    return score + inventoryBonus;
  }

  private _setUpLayers() {
    const background = this.graphics.createLayer({
      name: "background",
      order: -1,
    });

    this.graphics.createLayer({
      name: "costume",
      order: 1,
    });

    this.graphics.createLayer({
      name: "prop",
      order: 2,
    });
    const backgroundRect = new Graphics.Rect({
      width: this.width,
      height: this.height,
      color: Color.ExcaliburBlue,
    });
    background.offset = this.vel;
    backgroundRect.opacity = 0.33;
    background.show(backgroundRect);
  }
}
