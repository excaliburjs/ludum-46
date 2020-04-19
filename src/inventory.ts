import { Actor, Engine, Graphics, Color, Vector } from "excalibur";
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
    super(x, y, 200, 80);
    this._engine = engine;
    this._setUpLayers();
    this._costumeSprite = Items.getIconSprite(Costumes.topHat);
    this._propSprite = Items.getIconSprite(StageProps.rubberChicken);
  }

  public onPreUpdate() {
    if (this._costumeSprite) {
      let layer = this.graphics.getLayer("costume");
      let heightOffset = (this.height / 2) - (this._costumeSprite.height / 2);
      let widthOffset = (this.width / 3) - (this._costumeSprite.width / 2);
      layer!.offset = new Vector(widthOffset, heightOffset);
      layer?.show(this._costumeSprite);
    }

    if (this._propSprite) {
      let layer = this.graphics.getLayer("prop");
      let heightOffset = (this.height / 2) - (this._propSprite.height / 2);
      let widthOffset = (this.width * 2) / 3 - (this._propSprite.width / 2);
      layer!.offset = new Vector(widthOffset, heightOffset);
      layer?.show(this._propSprite);
    }
  }

  public addCostume(item: Costumes) {
    // drop the item if holding one
    this._costumeSprite = Items.getIconSprite(item);
  }

  public addProp(item: StageProps) {
    // drop the item if holding one
    this._propSprite = Items.getIconSprite(item);
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
