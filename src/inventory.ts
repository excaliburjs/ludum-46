import { Actor, Engine, Graphics, Color } from "excalibur";
import { Resources } from "./resources";
import { CueCard } from "./cuecard";
import { Costumes, StageProps } from "./constants";
import Items from "./items";

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

  public onPreUpdate() {
    if (this._costumeSprite) {
      this.graphics.add(this._costumeSprite);
      this.graphics.show(this._costumeSprite);
    }

    if (this._propSprite) {
      this.graphics.add(this._propSprite);
      this.graphics.add(this._propSprite);
    }
  }

  public addCostume(item: Costumes) {
    // drop the item if holding one
    this._costumeSprite = Items.getCostumeSprite(item);
  }

  public addProp(item: StageProps) {
    // drop the item if holding one
    this._propSprite = Items.getPropSprite(item);
  }

  public getQueueCardScore(card: CueCard): number {return 15;}

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
