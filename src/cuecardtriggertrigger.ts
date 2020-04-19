import { Vector, Trigger, Actor, vec, Scene, Graphics, Engine, GameEvent, Color, EnterTriggerEvent, ExitTriggerEvent } from "excalibur";
import { Player } from "./player";
import { CueCardManager } from "./cuecardmanager";

export enum StageTriggerLocation {
    StageLeft,
    StageCenter,
    StageRight
}
export class CueCardTrigger extends Actor {
    private trigger: Trigger;
    private triggered: boolean = false;
    private waitTime: number = 3;
    private timer: number = 0;
    private rect: Graphics.Rect;

    constructor(
        private player: Player,
        private cueCardManager: CueCardManager,
        private triggerPosition: StageTriggerLocation
    ) {
        super();
        this.width = 100;
        this.height = 100;
        this.pos = vec(400, 400);

        this.trigger = new Trigger({
            width: this.width,
            height: this.height,
            pos: this.pos,
            target: player,
            repeat: -1,
        });
        this.trigger.on("enter", this.onTriggerEnter.bind(this));
        this.trigger.on("exit", this.onTriggerExit.bind(this));
        this.rect = new Graphics.Rect({
            width: this.width,
            height: this.height,
            color: Color.Red
        });
        this.graphics.add(this.rect);
    }

    onInitialize() {
        this.scene.add(this.trigger);
    }

    public update(engine: Engine, delta: number) {
        super.update(engine, delta);
        this.timer += delta / 1000;

        if (this.triggered) {
            this.rect.opacity = 1 - (this.timer / this.waitTime);
        }

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