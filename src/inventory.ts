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
import Items from "./items";
import { stats } from "./session";
import { Player } from "./player";

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
    if (this._costume) {
      let sprite = Items.getIconSprite(this._costume);
      let layer = this.graphics.getLayer("costume");
      let heightOffset = this.height / 2 - sprite.height / 2;
      let widthOffset = this.width / 3 - sprite.width / 2;
      layer!.offset = new Vector(widthOffset, heightOffset);
      //console.log(this._costumeSprite);
      layer?.show(sprite);
    }

    if (this._prop) {
      let sprite = Items.getIconSprite(this._prop);
      let layer = this.graphics.getLayer("prop");
      let heightOffset = this.height / 2 - sprite.height / 2;
      let widthOffset = (this.width * 2) / 3 - sprite.width / 2;
      layer!.offset = new Vector(widthOffset, heightOffset);
      //console.log(this._propSprite);
      layer?.show(sprite);
    }
  }

  public addCostume(item: Costumes, spawnLocation: Vector) {
    // drop the item if holding one
    if (this._costume) {
      let currentCostume = this._costume;
      console.log(item);
      let sprite = Items.getIconSprite(this._costume);
      let actor = new Actor(this._costumeX, this._costumeY);
      actor.graphics.show(sprite);
      actor.body.collider.type = CollisionType.Passive;
      actor.on("precollision", (event) => {
        if (event.other instanceof Player) {
          actor.kill();
          stats().inventory.addCostume(currentCostume, actor.pos);
        }
      });
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
      let actor = new Actor(this._propX, this._propY);
      actor.graphics.show(sprite);
      actor.body.collider.type = CollisionType.Passive;
      actor.on("precollision", (event) => {
        if (event.other instanceof Player) {
          actor.kill();
          stats().inventory.addProp(currentProp, actor.pos);
        }
      });
      this.scene.add(actor);
    }

    this._prop = item;
    this._propX = spawnLocation.x;
    this._propY = spawnLocation.y;
  }

  public getQueueCardScore(card: CueCard): number {
    return 15;
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
