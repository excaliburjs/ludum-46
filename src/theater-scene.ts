import {
  Scene,
  Engine,
  TileMap,
  Actor,
  vec,
  Color,
  Graphics,
  CollisionType,
  ActorArgs,
} from "excalibur";
import { ITiledMapLayer } from "excalibur-tiled";
import Config from "./config";
import { Resources } from "./resources";
import { CueCardManager } from "./cuecardmanager";
import { Player } from "./player";
import { CueCardTrigger, StageTriggerLocation } from "./cuecardtriggertrigger";

const LAYER_IMPASSABLE = "walls";
const LAYER_TRIGGERS = "triggers";
const OBJECT_TRIGGERS = {
  StageLeftTrigger: "stageLeftTrigger",
  StageCenterTrigger: "stageCenterTrigger",
  StageRightTrigger: "stageRightTrigger",
};

export class Theater extends Scene {
  public stageTileMap!: TileMap;
  private player!: Player;
  private cuecardmanager!: CueCardManager;

  public onInitialize(engine: Engine) {
    this.cuecardmanager = new CueCardManager(this);
    this.player = new Player(Config.GameWidth / 2, Config.GameHeight / 2);
    this.add(this.player);
    this.player.body.collider.type = CollisionType.Active;

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
      const triggerArgs: ActorArgs = {
        anchor: vec(0, 0),
        pos: vec(
          this.stageTileMap.x + trigger.x,
          this.stageTileMap.y + trigger.y
        ),
        width: trigger.width,
        height: trigger.height,
        z: -2
      };

      switch (trigger.name) {
        case OBJECT_TRIGGERS.StageLeftTrigger:
          const stageLeftTrigger = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageLeft,
            triggerArgs
          );
          this.add(stageLeftTrigger);
          break;
        case OBJECT_TRIGGERS.StageCenterTrigger:
          const stageCenterTrigger = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageCenter,
            triggerArgs
          );
          this.add(stageCenterTrigger);
          break;
        case OBJECT_TRIGGERS.StageRightTrigger:
          const stageRightTrigger = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageRight,
            triggerArgs
          );
          this.add(stageRightTrigger);
          break;
      }
    }
  }
}
