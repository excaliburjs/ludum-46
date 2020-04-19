import { Scene, Engine, TileMap } from "excalibur";
import { Resources } from "./resources";
import { ITiledMapLayer } from "excalibur-tiled";

const LAYER_IMPASSABLE = "walls";

export class Theater extends Scene {
  public stageTileMap!: TileMap;

  constructor(engine: Engine) {
    super(engine);
  }

  public onInitialize(engine: Engine) {
    this.stageTileMap = Resources.map.getTileMap(40, 168);
    this.stageTileMap.data.forEach((c) => (c.transform.z = -3));
    this.add(this.stageTileMap);

    Resources.map.data.layers.forEach((layer) => {
      this.collectSolidTiles(layer);
    });
  }

  collectSolidTiles(layer: ITiledMapLayer) {
    if (
      layer.name !== LAYER_IMPASSABLE ||
      typeof layer.data == "string" ||
      !layer.data
    )
      return;

    for (let i = 0; i < layer.data.length; i++) {
      if (layer.data[i] !== 0) {
        this.stageTileMap.data[i].solid = true;
      }
    }
  }
}
