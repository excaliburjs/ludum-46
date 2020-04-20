import { Actor, ActorArgs, Graphics, vec, Color, ExitTriggerEvent } from "excalibur";
import { Resources } from "./resources";

export class Button extends Actor {
  constructor(private text: string, options: ActorArgs) {
    super({ ...options });
  }

  onInitialize() {
    //sprite.destSize = { width: this.width, height: this.height };
    const group = new Graphics.GraphicsGroup({
      members: [
          {
              graphic: new Graphics.Rect({
                  width: 200,//this.width,
                  height: 100,//this.height,
                  color: Color.Red,
              }),
             pos: vec(200,100)
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
          pos: vec(0,0)
        },
      ],
    });
    this.graphics.add(group);
  }
}
