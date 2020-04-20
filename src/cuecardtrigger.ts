import {
  Trigger,
  Actor,
  Graphics,
  Engine,
  Color,
  EnterTriggerEvent,
  ExitTriggerEvent,
  ActorArgs,
  Logger,
} from "excalibur";
import { Player } from "./player";
import { CueCardManager } from "./cuecardmanager";
import { stats } from "./session";
import Config from "./config";

export enum StageTriggerLocation {
  StageLeft,
  StageCenter,
  StageRight,
}
export class CueCardTrigger extends Actor {
  private trigger!: Trigger;
  private rect!: Graphics.Rect;
  private triggered: boolean = false;
  private waitTime: number = Config.CueCardScoreDelaySeconds;
  private timer: number = 0;
  private minAlpha:number = 0.1;
  private maxAlpha: number = 0.6;

  constructor(
    private player: Player,
    private cueCardManager: CueCardManager,
    private triggerPosition: StageTriggerLocation,
    options: ActorArgs
  ) {
    super(options);
  }

  onInitialize() {
    this.trigger = new Trigger({
      width: this.width,
      height: this.height,
      pos: this.pos,
      target: this.player,
      repeat: -1,
    });
    // WORKAROUND: body not being updated onInitialize to use new anchor
    this.trigger.body.useBoxCollider(this.width, this.height, this.anchor);
    this.trigger.on("enter", this.onTriggerEnter.bind(this));
    this.trigger.on("exit", this.onTriggerExit.bind(this));
    this.rect =new Graphics.Circle({
      radius: this.width/2,
      color: Color.Yellow
    });
    this.rect.color.a = this.minAlpha;
    this.graphics.add(this.rect);
    this.scene.add(this.trigger);
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);

    if (!this.triggered) return;

    this.timer += delta / 1000;
    this.rect.color.a = this.maxAlpha * this.timer / this.waitTime + this.minAlpha;

    if (this.timer >= this.waitTime) {
      Logger.getInstance().info("Stage trigger", this.triggerPosition);
      switch (this.triggerPosition) {
        case StageTriggerLocation.StageCenter:
          this.cueCardManager.SatisfyStageCenter(stats().inventory);
          break;
        case StageTriggerLocation.StageLeft:
          this.cueCardManager.SatisfyStageLeft(stats().inventory);
          break;
        case StageTriggerLocation.StageRight:
          this.cueCardManager.SatisfyStageRight(stats().inventory);
          break;
        default:
          break;
      }
      this._reset();
    }
  }

  private _reset(): void {
    this.triggered = false;
    this.timer = 0;
    this.rect.opacity = 1;
    this.rect.color.a = this.minAlpha;
  }

  private onTriggerEnter(event: EnterTriggerEvent): void {
    this.triggered = true;
  }

  private onTriggerExit(event: ExitTriggerEvent): void {
    this._reset();
  }
}
