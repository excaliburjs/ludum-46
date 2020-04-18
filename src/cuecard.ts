import { Actor, Color, Engine, Graphics } from "excalibur";

export class CueCard extends Actor {
    constructor() {
        super();
        const rect = new Graphics.Rect({
            width:100,
            height:100,
            color: Color.White
        });

        this.graphics.add(rect);

        //Background (grey)
        const background = this.graphics.createLayer({name: 'background', order:-1});
        background.show(rect);
        //Timer (white)
        this.graphics.createLayer({name: 'timer', order:1});

        //Symbol Loc1
        //Symbol Loc2
        //Symbol Loc3
        this.graphics.createLayer({name:'goals', order:2});


        this.graphics.getLayer('background')?.graphic
    }

    public onInitialize(engine: Engine) {
        let prop = {};
        let costume = {};
        let location = {};
        let timer = {};
    }

    public update(engine: Engine, delta: number) {

    }
}