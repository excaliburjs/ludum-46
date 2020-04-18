import { Actor, Color, Graphics } from "excalibur";

export class CueCard extends Actor {
    constructor() {
        super();
        let prop = {};
        let costume = {};
        let location = {};
        let timer = {};
        const rect = new Graphics.Rect({
            width:100,
            height:100,
            color: Color.White
        });
        this.graphics.add(rect);
    }
}