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
  Loadable,
} from "excalibur";
import Config from "./config";
import { Resources } from "./resources";
import { stats } from "./session";

enum PlayerInputState {
  input_deny,
  input_accept,
}

export class Player extends Actor {
  private inputState: PlayerInputState = PlayerInputState.input_deny;
  public charImage!: Graphics.RawImage;

  constructor(x: number, y: number) {
    super(x, y, Config.PlayerWidth, Config.PlayerHeight);
  }

  public onInitialize(engine: Engine) {
    this._setupDrawing(engine);
    this.enableTileMapCollision();
    engine.input.keyboard.on("hold", (keyHeld: Input.KeyEvent) => {
      // if (!State.gameOver) {

      if (this.inputState !== PlayerInputState.input_accept) {
        return;
      }
      if (stats().isGameOver == true) return;
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
      if (this.inputState !== PlayerInputState.input_accept) {
        return;
      }
      if (stats().isGameOver == true) return;
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

    //  this.on('postdraw', (evt: PostDrawEvent) => {
    //     this._selectSprite.draw(evt.ctx, -this._selectSprite.naturalWidth / 2, this._selectSprite.naturalHeight / 2);
    //  });
  }

  onPostUpdate() {
    if (this.inputState === PlayerInputState.input_accept) {
      this.vel.setTo(0, 0);
    }
  }

  /**
   * Begin the enter stage transition. Block input until we're done playing actions.
   */
  public beginEnterStage() {
    this.inputState = PlayerInputState.input_deny;
    this.graphics.show("walkLeft");
    this.body.collider.type = CollisionType.PreventCollision;

    setTimeout(() => {
      Resources.sndDoorOpen.play();
    }, 800);

    return this.actions
      .moveBy(-(Config.PlayerWidth * 3), 0, 60)
      .callMethod(() => {
        this.graphics.show("left");
        this.body.collider.type = CollisionType.Active;
      })
      .asPromise();
  }

  public AllowUserControl(): void {
    this.inputState = PlayerInputState.input_accept;
  }

  private _setupDrawing(engine: Engine) {
    this.charImage = this.getCharSprite();
    let sheet = Graphics.SpriteSheet.fromGrid({
      image: this.charImage,
      grid: {
        rows: 1,
        columns: 10,
        spriteHeight: Config.PlayerSpriteHeight,
        spriteWidth: Config.PlayerSpriteWidth,
      },
    });
    let sprites = sheet.sprites;
    let downSprite = sprites[0];
    let upSprite = sprites[3];
    let leftSprite = sprites[7];
    let rightSprite = sprites[9];

    downSprite.origin?.setTo(0, 0.2);
    upSprite.origin?.setTo(0, 0.2);
    leftSprite.origin?.setTo(0, 0.2);
    rightSprite.origin?.setTo(0, 0.2);

    this.graphics.add("down", downSprite);
    this.graphics.add("up", upSprite);
    this.graphics.add("left", leftSprite);
    this.graphics.add("right", rightSprite);

    let walkDownAnim = Graphics.Animation.fromSpriteSheet(
      sheet,
      [0, 1, 0, 2],
      180
    );
    walkDownAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkDown", walkDownAnim);

    let walkUpAnim = Graphics.Animation.fromSpriteSheet(
      sheet,
      [3, 4, 3, 5],
      180
    );
    walkUpAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkUp", walkUpAnim);

    let walkLeftAnim = Graphics.Animation.fromSpriteSheet(sheet, [7, 6], 200);
    walkLeftAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkLeft", walkLeftAnim);

    let walkRightAnim = Graphics.Animation.fromSpriteSheet(sheet, [9, 8], 200);
    walkRightAnim.origin?.setTo(0, 0.2);
    this.graphics.add("walkRight", walkRightAnim);
  }

  public getCharSprite(excludeCurrent?: boolean): Graphics.RawImage {
    let gameRandom = new Random(Date.now());
    let charSheets = [];
    for (let r in Resources) {
      if (r.search("charSheet") != -1) {
        let img = (Resources as Record<string, Loadable>)[r];

        if (excludeCurrent && img === this.charImage) {
          continue;
        }
        charSheets.push(img);
      }
    }
    let randCharSheets = gameRandom.shuffle(charSheets);
    let result = randCharSheets[0];
    return <Graphics.RawImage>result;
  }
}
