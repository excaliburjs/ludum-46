import { Engine, Loader } from "excalibur";
import { Resources } from "./resources";
import { newgame } from "./session";
import Config from "./config";

Engine._useWebGL = true;
const game = new Engine({ height: Config.GameHeight, width: Config.GameWidth });
const loader = new Loader();
for (let r in Resources) {
  loader.addResource((Resources as any)[r]);
}

game.start(loader).then(() => {
  newgame(game);
});

(window as any).game = game;
