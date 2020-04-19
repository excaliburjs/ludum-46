import { Actor, Engine, Graphics, Color } from "excalibur";
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
    super(x, y, 200, 125);
    this._engine = engine;
    this._setUpBackground();
  }

  public onPostUpdate(engine: Engine, delta: number) {}

  public addWardrobeItem(item: Costumes) {
    // drop the item if holding one
  }

  public addProp(item: StageProps) {
    // drop the item if holding one
  }

  public getQueueCardScore(card: CueCard) {}

  private _getPropResource(item: Costumes) {}

  private _getWardrobeItemResource(item: StageProps) {}

  private _setUpBackground() {
    const background = this.graphics.createLayer({
      name: "background",
      order: -1,
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
