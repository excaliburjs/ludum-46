import { Actor, Engine, ActorArgs, Graphics, vec } from "excalibur";
import Config from "./config";
import { Player } from "./player";
import { DialogCard } from "./dialogCard";

export class DirectorNPC extends Actor {
  private _engine!: Engine;

  constructor(private _player: Player, options: ActorArgs) {
    super(options);
  }

  onInitialize(engine: Engine) {
    this._engine = engine;
    this._setupDrawing();
  }

  public playGreetingSequence() {
    /* TODO: Remove until this is done */
    const cardPos = vec(
      this._engine.halfCanvasWidth,
      this._engine.halfCanvasHeight
    );
    const card1 = new DialogCard(["You're late! The audience is waiting..."], {
      pos: cardPos,
    });
    const card2 = new DialogCard(["Get dressed and get out there!"], {
      pos: cardPos,
    });
    const card3 = new DialogCard(["Use the arrow keys or WASD keys to move!"], {
      pos: cardPos,
    });

    this.scene.add(card1);

    return this.actions
      .delay(4000)
      .callMethod(() => {
        card1.kill();
        this.scene.add(card2);
      })
      .delay(4000)
      .callMethod(() => {
        card2.kill();
        this.scene.add(card3);
      })
      .delay(4000)
      .callMethod(() => {
        card3.kill();
        this._player.AllowUserControl();
      })
      .asPromise();
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
