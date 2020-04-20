import { Actor, Engine, ActorArgs, Graphics } from "excalibur";
import Config from "./config";
import { Player } from "./player";

export class DirectorNPC extends Actor {
  constructor(private _player: Player, options: ActorArgs) {
    super(options);
  }

  onInitialize() {
    this._setupDrawing();
  }

  public playGreetingSequence() {
    /* TODO: Remove until this is done */
    this.kill();

    return Promise.resolve();
  }

  private _setupDrawing() {
    let sheet = Graphics.SpriteSheet.fromGrid({
      image: this._player.getCharSprite(true),
      grid: {
        rows: 1,
        columns: 10,
        spriteHeight: Config.PlayerSpriteHeight,
        spriteWidth: Config.PlayerSpriteWidth,
      },
    });
    let sprites = sheet.sprites;
    // let downSprite = sprites[0];
    // let upSprite = sprites[3];
    // let leftSprite = sprites[7];
    let rightSprite = sprites[9];

    // downSprite.origin?.setTo(0, 0.2);
    // upSprite.origin?.setTo(0, 0.2);
    // leftSprite.origin?.setTo(0, 0.2);
    rightSprite.origin?.setTo(0, 0.2);

    // this.graphics.add("down", downSprite);
    // this.graphics.add("up", upSprite);
    // this.graphics.add("left", leftSprite);
    this.graphics.add(rightSprite);
  }
}
