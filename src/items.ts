import { StageProps, Costumes, Locations } from "./constants";
import { Resources } from "./resources";
import { Graphics } from "excalibur";

export default class Items {
  public static getLocationSprite(location: Locations): Graphics.Sprite {
    let key = `${location}Image`;
    return this._getSprite(key);
  }

  public static getPropSprite(prop: StageProps): Graphics.Sprite {
    let key = `${prop}Image`;
    return this._getSprite(key);
  }

  public static getCostumeSprite(costume: Costumes): Graphics.Sprite {
    let key = `${costume}Image`;
    return this._getSprite(key);
  }

  private static _getSprite(key: string): Graphics.Sprite {
    let resource = <Graphics.RawImage>Resources[key];
    return Graphics.Sprite.from(resource);
  }
}
