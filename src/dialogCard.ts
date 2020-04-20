import { Actor, ActorArgs, Graphics, vec, Color } from "excalibur";
import { Resources } from "./resources";

export class DialogCard extends Actor {
  constructor(private text: string, options: ActorArgs) {
    super({ ...options, width: 837, height: 480 });
  }

  onInitialize() {
    const group = new Graphics.GraphicsGroup({
      members: [
        {
          graphic: Graphics.Sprite.from(Resources.titleCard),
          pos: vec(0, 0),
        },
        {
          graphic: new Graphics.Text({
            text: this.text,
            color: Color.White,
            font: new Graphics.Font({
              family: "Century, Georgia, serif",
              size: 36,
              textAlign: Graphics.TextAlign.Center,
            }),
          } as any),
          pos: vec(this.width / 2, this.height / 2),
        },
      ],
    });
    this.graphics.add(group);
  }
}
