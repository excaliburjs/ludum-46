import {
  Trigger,
  Actor,
  Graphics,
  Engine,
  Color,
  EnterTriggerEvent,
  ExitTriggerEvent,
  ActorArgs,
} from "excalibur";
import { Player } from "./player";
import { CueCardManager } from "./cuecardmanager";

export enum StageTriggerLocation {
  StageLeft,
  StageCenter,
  StageRight,
}
export class CueCardTrigger extends Actor {
  private trigger!: Trigger;
  private rect!: Graphics.Rect;
  private triggered: boolean = false;
  private waitTime: number = 3;
  private timer: number = 0;

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
    this.trigger.anchor.setTo(this.anchor.x, this.anchor.y);
    this.trigger.on("enter", this.onTriggerEnter.bind(this));
    this.trigger.on("exit", this.onTriggerExit.bind(this));
    this.rect = new Graphics.Rect({
      width: this.width,
      height: this.height,
      color: Color.fromRGB(255, 0, 0, 0.4),
    });
    this.graphics.add(this.rect);
    this.scene.add(this.trigger);
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.timer += delta / 1000;

    if (this.timer >= this.waitTime) {
      switch (this.triggerPosition) {
        case StageTriggerLocation.StageCenter:
          this.cueCardManager.SatisfyStageCenter(this.player);
          break;
        case StageTriggerLocation.StageLeft:
          this.cueCardManager.SatisfyStageLeft(this.player);
          break;
        case StageTriggerLocation.StageRight:
          this.cueCardManager.SatisfyStageRight(this.player);
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
  }

  private onTriggerEnter(event: EnterTriggerEvent): void {
    this.triggered = true;
  }

  private onTriggerExit(event: ExitTriggerEvent): void {
    this._reset();
  }
}
