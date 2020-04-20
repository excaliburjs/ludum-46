import {
  Graphics,
  Actor,
  CollisionType,
  EasingFunctions,
  Random,
} from "excalibur";
import { IconPosition, Costumes, StageProps } from "./constants";
import { Resources } from "./resources";
import { stats } from "./session";
import { Player } from "./player";

export default class Items {
  static sheet = Graphics.SpriteSheet.fromGrid({
    image: <Graphics.RawImage>Resources.icons,
    grid: {
      rows: 6,
      columns: 5,
      spriteHeight: 80,
      spriteWidth: 80,
    },
  });

  public static getIconSprite(key: string): Graphics.Sprite {
    const index = IconPosition[key];
    const sprite = Items.sheet.sprites[index];
    return sprite;
  }
}

export class Item extends Actor {
  constructor(
    private kind: "prop" | "costume",
    private resourceName: Costumes | StageProps,
    private sprite: Graphics.Sprite,
    x: number,
    y: number
  ) {
    super(x, y);
  }

  onInitialize() {
    this.body.collider.type = CollisionType.Passive;
    this.graphics.show(this.sprite);
    this.on("precollision", (event) => {
      if (event.other instanceof Player) {
        this.kill();

        if (this.kind === "prop") {
          stats().inventory.addProp(<StageProps>this.resourceName, this.pos);
        } else if (this.kind === "costume") {
          stats().inventory.addCostume(<Costumes>this.resourceName, this.pos);
        }

        Resources.sndPickupItem.play();
      }
    });

    // floaty up and down
    const rand = new Random();
    const origY = this.pos.y;

    this.actions
      .delay(rand.integer(0, 500))
      .easeTo(
        this.pos.x,
        this.pos.y - rand.integer(3, 9),
        1500,
        EasingFunctions.EaseInCubic
      )
      .easeTo(this.pos.x, origY, 1000, EasingFunctions.EaseOutCubic)
      .repeatForever();
  }
}
