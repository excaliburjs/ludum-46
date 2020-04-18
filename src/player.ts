import {
  Actor,
  Engine,
  CollisionType,
  Input,
  PostDrawEvent,
  PostUpdateEvent,
} from "excalibur";
import config from "./config";

export class Player extends Actor {
  constructor(x: number, y: number) {
    super(x, y, config.PlayerWidth, config.PlayerHeight);
  }

  public onInitialize(engine: Engine) {
    this.body.collider.type = CollisionType.Active;
    engine.input.keyboard.on("hold", (keyHeld: Input.KeyEvent) => {
      // if (!State.gameOver) {
      //    if (player.disableMovement) return;

      switch (keyHeld.key) {
        case Input.Keys.Up:
        case Input.Keys.W:
          this.vel.setTo(this.vel.x, -config.PlayerVel);
          this.graphics.show("walkUp");
          break;
        case Input.Keys.Down:
        case Input.Keys.S:
          this.vel.setTo(this.vel.x, config.PlayerVel);
          this.graphics.show("walkDown");
          break;
        case Input.Keys.Left:
        case Input.Keys.A:
          this.vel.setTo(-config.PlayerVel, this.vel.y);
          this.graphics.show("walkLeft");
          break;
        case Input.Keys.Right:
        case Input.Keys.D:
          this.vel.setTo(config.PlayerVel, this.vel.y);
          this.graphics.show("walkRight");
          break;
      }
    });

    engine.input.keyboard.on("release", (keyUp: Input.KeyEvent) => {
      // if (!State.gameOver) {
      switch (keyUp.key) {
        case Input.Keys.Up:
        case Input.Keys.W:
          this.graphics.show("up");
          break;
        case Input.Keys.Down:
        case Input.Keys.S:
          this.vel.setTo(this.vel.x, config.PlayerVel);
          this.graphics.show("down");
          break;
        case Input.Keys.Left:
        case Input.Keys.A:
          this.graphics.show("left");
          break;
        case Input.Keys.Right:
        case Input.Keys.D:
          this.graphics.show("right");
          break;
      }
      //}
    });

    this.on("postupdate", (evt: PostUpdateEvent) => {
      this.vel.setTo(0, 0);
    });

    //  this.on('postdraw', (evt: PostDrawEvent) => {
    //     this._selectSprite.draw(evt.ctx, -this._selectSprite.naturalWidth / 2, this._selectSprite.naturalHeight / 2);
    //  });
  }
}
