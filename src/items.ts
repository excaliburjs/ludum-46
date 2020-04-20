import { Graphics, Actor, CollisionType } from "excalibur";
import { IconPosition, Costumes, StageProps } from "./constants";
import { Resources } from "./resources";
import { stats } from "./session";
import { Player } from "./player";

export default class Items {
  public static getIconSprite(key: string): Graphics.Sprite {
    const spriteSheet = Graphics.SpriteSheet.fromGrid({
      image: <Graphics.RawImage>Resources.icons,
      grid: {
        rows: 6,
        columns: 5,
        spriteHeight: 80,
        spriteWidth: 80,
      },
    });

    const index = IconPosition[key];
    const sprite = spriteSheet.sprites[index];
    return sprite;
  }
}

export class Item extends Actor {
  constructor(
    private kind: "prop" | "costume",
    private resourceName: Costumes | StageProps,
    x: number,
    y: number
  ) {
    super(x, y);
  }

  onInitialize() {
    this.body.collider.type = CollisionType.Passive;

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
  }
}
