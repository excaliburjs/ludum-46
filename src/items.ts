import { IconPosition } from "./constants";
import { Resources } from "./resources";
import { Graphics } from "excalibur";

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
