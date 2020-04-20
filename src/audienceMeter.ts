import { Actor, Color, Engine, Graphics, ActorArgs } from "excalibur";
import Config from "./config";
import { stats } from "./session";

export class AudienceMeter extends Actor {
  private meterWidth: number = Config.AudienceMeterMaxWidth;
  private meterHeight: number = Config.AudienceMeterHeight;
  private meterSpeed: number = 3;
  private meterRect!: Graphics.Rect;
  private started!: boolean = false;

  constructor() {
    super({
      x: Config.GameWidth / 2,
      y: Config.AudienceMeterHeight,
      width: Config.AudienceMeterMaxWidth,
      height: Config.AudienceMeterHeight,
    });

    this._setUpBackground();
    this._setUpMeter();
  }

  public start(): void {
    this.started = true;
  }

  private _setUpBackground(): void {
    const background = this.graphics.createLayer({
      name: "background",
      order: -1,
    });
    const backgroundRect = new Graphics.Rect({
      width: this.meterWidth,
      height: this.meterHeight,
      color: Color.White,
    });
    backgroundRect.opacity = 0.33;
    background.show(backgroundRect);
  }

  update(gameEngine: Engine, delta: number) {
    super.update(gameEngine, delta);
    if (!this.started) return;
    stats().reduceAudienceMeter(Config.ScoreDecayRate * delta/1000);
    let difference = (stats().currentAudienceScore - this.meterRect.width);
    this.meterRect.width += difference;
  }

  private _setUpMeter(): void {
    const meterLayer = this.graphics.createLayer({ name: "meter", order: 0 });
    this.meterRect = new Graphics.Rect({
      width: stats().currentAudienceScore,
      height: this.meterHeight,
      color: Color.Green,
    });
    meterLayer.show(this.meterRect);
  }
}
