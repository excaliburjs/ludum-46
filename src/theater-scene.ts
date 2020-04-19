import { Scene, Engine, TileMap, Actor, vec, Color, Graphics } from "excalibur";
import { Resources } from "./resources";
import { ITiledMapLayer } from "excalibur-tiled";

const LAYER_IMPASSABLE = "walls";
const LAYER_TRIGGERS = "triggers";
const OBJECT_TRIGGERS = {
  StageLeftTrigger: "stageLeftTrigger",
  StageCenterTrigger: "stageCenterTrigger",
  StageRightTrigger: "stageRightTrigger",
};

export class Theater extends Scene {
  public stageTileMap!: TileMap;

  public onInitialize(engine: Engine) {
    // add a blackout area behind stage
    const stageBlackout = new Actor({
      anchor: vec(0, 0),
      pos: vec(0, 168),
      width: engine.canvasWidth,
      height: engine.canvasHeight - 168,
    });
    stageBlackout.graphics.add(
      new Graphics.Rect({
        height: stageBlackout.height,
        width: stageBlackout.width,
        color: Color.Black,
      })
    );
    this.add(stageBlackout);
    stageBlackout.setZIndex(-4);

    this.stageTileMap = Resources.map.getTileMap(40, 168);
    this.stageTileMap.data.forEach((c) => (c.transform.z = -3));
    this.add(this.stageTileMap);

    Resources.map.data.layers.forEach((layer) => {
      this.collectSolidTiles(layer);
      this.collectStageTriggers(layer);
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

  collectStageTriggers(layer: ITiledMapLayer) {
    if (
      layer.name !== LAYER_TRIGGERS ||
      typeof layer.data == "string" ||
      !layer.objects
    )
      return;

    for (const trigger of layer.objects) {
      switch (trigger.name) {
        case OBJECT_TRIGGERS.StageLeftTrigger:
          console.log("todo stageLeftTrigger", trigger);
          break;
        case OBJECT_TRIGGERS.StageCenterTrigger:
          console.log("todo stageCenterTrigger", trigger);
          break;
        case OBJECT_TRIGGERS.StageRightTrigger:
          console.log("todo stageRightCenter", trigger);
          break;
      }
    }
  }
}
