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
import { SoundManager } from "./soundManager";
import { DirectorNPC } from "./director";
import { AudienceMeter } from "./audienceMeter";
import { Tomatoes } from "./tomatoEmitter";

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
  private director!: DirectorNPC;
  private audienceMeter!: AudienceMeter;
  private tomatoes!: Tomatoes;
  public leftSpotlight!: CueCardTrigger;
  public centerSpotlight!: CueCardTrigger;
  public rightSpotlight!: CueCardTrigger;

  public onInitialize(engine: Engine) {
    this.tomatoes = new Tomatoes(this);
    (window as any).tomatoes = this.tomatoes;
    this.cuecardmanager = new CueCardManager(this);
    this.audienceMeter = new AudienceMeter(this.tomatoes);
    this.add(this.audienceMeter);
    // Player
    this.player = new Player(
      Config.GameWidth,
      Config.GameHeight - Config.PlayerHeight * 1.5
    );
    this.add(this.player);

    // Director
    this.director = new DirectorNPC(this.player, {
      pos: vec(
        Config.GameWidth - Config.PlayerWidth * 4,
        Config.GameHeight - Config.PlayerHeight * 1.5
      ),
    });
    this.add(this.director);

    this.stageTileMap = Resources.map.getTileMap(
      Config.StagePos.x,
      Config.StagePos.y
    );
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
    SoundManager.startBackgroundMusic();
    this.player
      .beginEnterStage()
      .then(() => {
        return this.director.playGreetingSequence();
      })
      .then(() => {
        // start cue cards
        this.director.kill();
        this.cuecardmanager.start();
        this.audienceMeter.start();
      });
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
          this.leftSpotlight = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageLeft,
            triggerArgs
          );
          this.add(this.leftSpotlight);
          this.leftSpotlight.setZIndex(-2);
          break;
        case OBJECT_TRIGGERS.StageCenterTrigger:
          this.centerSpotlight = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageCenter,
            triggerArgs
          );
          this.add(this.centerSpotlight);
          this.centerSpotlight.setZIndex(-2);
          break;
        case OBJECT_TRIGGERS.StageRightTrigger:
          this.rightSpotlight = new CueCardTrigger(
            this.player,
            this.cuecardmanager,
            StageTriggerLocation.StageRight,
            triggerArgs
          );
          this.add(this.rightSpotlight);
          this.rightSpotlight.setZIndex(-2);
          break;
      }
    }
  }

  private spawnItems() {
    let costumePoints = this.getPoints(COSTUME_TYPE);
    let propPoints = this.getPoints(PROP_TYPE);
    let stageProps = Object.keys(StageProps);
    // console.log(stageProps);
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
