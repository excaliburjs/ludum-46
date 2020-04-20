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
                    pos: vec(-this.width/4,0),
                },

            ],
        });
        group.width = this.width;
        group.height = this.height;
        this.graphics.add(group);
    }
}
