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
                    graphic: Graphics.Sprite.from(Resources.playAgainButton),
                    pos: vec(-this.width / 2, -this.height / 2 + 15),
                },
            ],
        });
        this.graphics.add(group);
    }
}
