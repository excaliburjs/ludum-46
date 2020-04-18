import {
  Actor,
  Engine,
  CollisionType,
  Input,
  PostDrawEvent,
  PostUpdateEvent,
  Graphics,
  Random,
  Resource,
} from "excalibur";
import Config from "./config";
import { Resources } from "./resources";

export class Player extends Actor {
  constructor(x: number, y: number) {
    super(x, y, Config.PlayerWidth, Config.PlayerHeight);
  }

  public onInitialize(engine: Engine) {
    this.body.collider.type = CollisionType.Active;
    engine.input.keyboard.on("hold", (keyHeld: Input.KeyEvent) => {
      // if (!State.gameOver) {
      //    if (player.disableMovement) return;

      switch (keyHeld.key) {
        case Input.Keys.Up:
        case Input.Keys.W:
          this.vel.setTo(this.vel.x, -Config.PlayerVel);
          this.graphics.show("walkUp");
          break;
        case Input.Keys.Down:
        case Input.Keys.S:
          this.vel.setTo(this.vel.x, Config.PlayerVel);
          this.graphics.show("walkDown");
          break;
        case Input.Keys.Left:
        case Input.Keys.A:
          this.vel.setTo(-Config.PlayerVel, this.vel.y);
          this.graphics.show("walkLeft");
          break;
        case Input.Keys.Right:
        case Input.Keys.D:
          this.vel.setTo(Config.PlayerVel, this.vel.y);
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
          this.vel.setTo(this.vel.x, Config.PlayerVel);
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
  private _setupDrawing(engine: Engine) {
    var sheet = Graphics.SpriteSheet.fromGrid({
      image: this.getCharSprite(),
      grid: {
        rows: 1,
        columns: 10,
        spriteHeight: 45,
        spriteWidth: 45,
      },
    });
    var sprites = sheet.sprites;
    var downSprite = sprites[0];
    var upSprite = sprites[3];
    var leftSprite = sprites[7];
    var rightSprite = sprites[9];

    downSprite.origin?.setTo(0, 0.2);
    upSprite.origin?.setTo(0, 0.2);
    leftSprite.origin?.setTo(0, 0.2);
    rightSprite.origin?.setTo(0, 0.2);

    this.graphics.add("down", downSprite);
    this.graphics.add("up", upSprite);
    this.graphics.add("left", leftSprite);
    this.graphics.add("right", rightSprite);

    var walkDownAnim = Graphics.Animation.fromSpriteSheet(
      sheet,
      [0, 1, 0, 2],
      180
    );
    walkDownAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkDown", walkDownAnim);

    var walkUpAnim = Graphics.Animation.fromSpriteSheet(
      sheet,
      [3, 4, 3, 5],
      180
    );
    walkUpAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkUp", walkUpAnim);

    var walkLeftAnim = Graphics.Animation.fromSpriteSheet(sheet, [7, 6], 200);
    walkLeftAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkLeft", walkLeftAnim);

    var walkRightAnim = Graphics.Animation.fromSpriteSheet(sheet, [9, 8], 200);
    walkRightAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkRight", walkRightAnim);

    this.setDrawing("down");
  }

  public getCharSprite(): Graphics.RawImage {
    var gameRandom = new Random(Date.now());
    let charSheets = [];
    for (var r in Resource) {
      if (r.search("charSheet") != -1) {
        charSheets.push(Resources[r]);
      }
    }
    var randCharSheets = gameRandom.shuffle(charSheets);
    var result = randCharSheets[0];
    return <Graphics.RawImage>result;
  }
}
