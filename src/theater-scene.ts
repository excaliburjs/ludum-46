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
  Vector,
} from "excalibur";
import { ITiledMapLayer } from "excalibur-tiled";
import Config from "./config";
import { Resources } from "./resources";
import { CueCardManager } from "./cuecardmanager";
import { Player } from "./player";
import { CueCardTrigger, StageTriggerLocation } from "./cuecardtrigger";
import { StageProps, Costumes } from "./constants";
import Items, { Item } from "./items";
import { stats } from "./session";

const LAYER_IMPASSABLE = "walls";
const LAYER_TRIGGERS = "triggers";
const LAYER_ITEMS = "items";
const COSTUME_TYPE = "costume";
const PROP_TYPE = "stageProp";
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
    this.player = new Player(
      Config.GameWidth,
      Config.GameHeight - Config.PlayerHeight * 1.5
    );
    this.add(this.player);

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
        color: Color.fromHex("#333333"),
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

    this.spawnItems();
    let backgroundActor = new Actor({
      width: 50,
      height: 50,
      x: Config.GameWidth / 2,
      y: Config.GameHeight / 2,
    });
    backgroundActor.graphics.add(Graphics.Sprite.from(Resources.background));
    this.add(backgroundActor);
    backgroundActor.z = -4;
  }

  /**
   * Begin the scene! Action!
   */
  onActivate() {
    this.player.beginEnterStage();
  }

  private collectSolidTiles(layer: ITiledMapLayer) {
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

  private collectStageTriggers(layer: ITiledMapLayer) {
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
          stageLeftTrigger.setZIndex(-2);
          break;
        case OBJECT_TRIGGERS.StageCenterTrigger:
          const stageCenterTrigger = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageCenter,
            triggerArgs
          );
          this.add(stageCenterTrigger);
          stageCenterTrigger.setZIndex(-2);
          break;
        case OBJECT_TRIGGERS.StageRightTrigger:
          const stageRightTrigger = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageRight,
            triggerArgs
          );
          this.add(stageRightTrigger);
          stageRightTrigger.setZIndex(-2);
          break;
      }
    }
  }

  private spawnItems() {
    let costumePoints = this.getPoints(COSTUME_TYPE);
    let propPoints = this.getPoints(PROP_TYPE);
    let stageProps = Object.keys(StageProps);
    console.log(stageProps);
    let costumes = Object.keys(Costumes);

    for (let i = 0; i < stageProps.length; i++) {
      let resourceName = stageProps[i];
      let point = propPoints[i];
      let sprite = Items.getIconSprite(resourceName);
      let actor = new Item(
        "prop",
        <StageProps>resourceName,
        sprite,
        point.x,
        point.y
      );
      this.add(actor);
    }

    for (let i = 0; i < costumes.length; i++) {
      let resourceName = costumes[i];
      let point = costumePoints[i];
      let sprite = Items.getIconSprite(resourceName);
      let actor = new Item(
        "costume",
        <Costumes>resourceName,
        sprite,
        point.x,
        point.y
      );
      this.add(actor);
    }
  }

  private getPoints(type: string): Vector[] {
    let layer = Resources.map.data.layers.find((item) => {
      return item.name == "items";
    });
    let points: Vector[] = [];
    for (let i = 0; i < layer!.objects.length; i++) {
      let obj = layer!.objects[i];
      if (obj.type == type) {
        points.push(new Vector(obj.x + 25, obj.y + 170));
      }
    }

    return points;
  }
}
