import { Actor, Engine } from "excalibur";
import { Resources } from "./resources";
import { CueCard } from "./cuecard";
import { Costumes, StageProps } from "./constants";

export class Inventory extends Actor {
  private _costume?: Costumes;
  private _prop?: StageProps;
  private _engine: Engine;
  private _costumeSprite: any;
  private _propSprite: any;

  constructor(engine: Engine, x: number, y: number) {
    super(x, y);
    this._engine = engine;
  }

  public update(engine: Engine, delta: number) {}

  public addWardrobeItem(item: Costumes) {
    // drop the item if holding one
  }

  public addProp(item: StageProps) {
    // drop the item if holding one
  }

  public getQueueCardScore(card: CueCard) {}

  private _getPropResource(item: Costumes) {}

  private _getWardrobeItemResource(item: StageProps) {}
}
