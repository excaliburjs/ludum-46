import { Scene, Engine, TileMap } from "excalibur";
import { Resources } from "./resources";
import { TiledResource } from "excalibur-tiled";

export class Theater extends Scene {
  public map!: TileMap;

  constructor(engine: Engine) {
    super(engine);
  }

  public onInitialize(engine: Engine) {
    this.map = (Resources.map as TiledResource).getTileMap(40, 168);
    this.map.data.forEach((c) => (c.transform.z = -3));
    this.add(this.map);
  }
}
