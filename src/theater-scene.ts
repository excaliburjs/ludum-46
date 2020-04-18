import { Scene, Engine, TileMap } from "excalibur";
import { Resources } from "./resources";
import { TiledResource } from "excalibur-tiled";

export class Theater extends Scene {
  public map!: TileMap;

  constructor(engine: Engine) {
    super(engine);
  }

  public onInitialize(engine: Engine) {
    this.map = (Resources.map as TiledResource).getTileMap();
    this.add(this.map);
  }
}
