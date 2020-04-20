import {
  Actor,
  Color,
  Engine,
  Graphics,
  ActorArgs,
  Util,
  Vector,
  vec,
} from "excalibur";
import Config from "./config";
import { stats } from "./session";
import { Resources } from "./resources";
import { Tomatoes } from "tomatoEmitter";

export class AudienceMeter extends Actor {
  private meterWidth: number = Config.AudienceMeterMaxWidth;
  private meterHeight: number = Config.AudienceMeterHeight;
  private meterSpeed: number = 3;
  private meterRect!: Graphics.Rect;
  private started: boolean = false;

  private _tomatoes!: Tomatoes;
  private _meterAnim!: Graphics.Animation;

  constructor(tomatoes: Tomatoes) {
    super({
      x: Config.GameWidth / 2,
      y: 0,
      width: Config.AudienceMeterMaxWidth,
      height: Config.AudienceMeterHeight,
      anchor: vec(0.5, 0),
    });

    this._tomatoes = tomatoes;
    this._setUpMeter();
  }

  public start(): void {
    this.started = true;
    this.graphics.getLayer("meter")!.show(this._meterAnim);
  }

  update(gameEngine: Engine, delta: number) {
    super.update(gameEngine, delta);
    if (!this.started || stats().isGameOver) return;
    stats().reduceAudienceMeter((Config.ScoreDecayRate * delta) / 1000);
    // let difference = stats().currentAudienceScore - this.meterRect.width;
    // this.meterRect.width += difference;

    this._meterAnim.goToFrame(
      127 -
        Math.floor(
          (stats().currentAudienceScore / Config.AudienceMeterMaxWidth) * 128
        )
    );

    if (
      stats().currentAudienceScore / Config.AudienceMeterMaxWidth <=
      Config.TomatoPercentage
    ) {
      this._tomatoes.show();
    }

    if (stats().currentAudienceScore == 0) {
      stats().isGameOver = true;
      console.log("game over (loss)");
    }
  }

  private _setUpMeter(): void {
    const meterLayer = this.graphics.createLayer({ name: "meter", order: 0 });
    this.meterRect = new Graphics.Rect({
      width: stats().currentAudienceScore,
      height: this.meterHeight,
      color: Color.Green,
    });

    const sheet = Graphics.SpriteSheet.fromGrid({
      image: Resources.audienceMeterSheet,
      grid: {
        rows: 128,
        columns: 1,
        spriteWidth: 934,
        spriteHeight: 40,
      },
    });
    this._meterAnim = Graphics.Animation.fromSpriteSheet(
      sheet,
      Util.range(0, 127),
      200,
      Graphics.AnimationStrategy.Freeze
    );
    this._meterAnim.pause();
    this._meterAnim.goToFrame(
      127 -
        Math.floor(
          (Config.AudienceMeterStartingWidth / Config.AudienceMeterMaxWidth) *
            128
        )
    );
  }
}
