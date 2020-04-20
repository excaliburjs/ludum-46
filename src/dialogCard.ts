import { Actor, ActorArgs, Graphics, vec, Color } from "excalibur";
import { Resources } from "./resources";

export class DialogCard extends Actor {
  constructor(private text: string[], options: ActorArgs) {
    super({ ...options, width: 837, height: 480 });
  }

  onInitialize() {
    let graphicsMember: Graphics.GraphicsGrouping[] = [];
    graphicsMember.push({
        graphic: Graphics.Sprite.from(Resources.titleCard),
        pos: vec(0, 0)
    });
    for (let index = 0; index < this.text.length; index++) {
      graphicsMember.push({
        graphic: new Graphics.Text({
          text: this.text[index],
          color: Color.White,
          font: new Graphics.Font({
            family: "Century, Georgia, serif",
            size: 36,
            textAlign: Graphics.TextAlign.Center,
          }),
        } as any),
        pos: vec(this.width / 2, this.height * ((index + 1) / (this.text.length + 1))),
      });
    }
    const group = new Graphics.GraphicsGroup({
      members: graphicsMember,
    });
    this.graphics.add(group);
  }
}
