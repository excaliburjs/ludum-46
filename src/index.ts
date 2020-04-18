import { Engine, Loader } from "excalibur";
import { Theater } from "./theater-scene";
import { Resources } from "./resources";
import { CueCard, CueCardOptions } from "./cuecard";
import { newgame } from "./session";
import { Player } from "./player";
import Config from "./config";

Engine._useWebGL = true;
const game = new Engine({ height: Config.GameHeight, width: Config.GameWidth });
const loader = new Loader();
for (let r in Resources) {
  loader.addResource(Resources[r]);
}

const theater = new Theater(game);
game.addScene("main", theater);

const cueCard = new CueCard({lifeTime: 10, requiredCostume: {}, requiredLocation: {}, requiredProp:{}});

const player = new Player(Config.PlayerStart.x, Config.PlayerStart.y);
theater.add(cueCard);
theater.add(player);

game.start(loader).then(() => {
  newgame(game);
});

(window as any).game = game;
