import { Engine, Loader } from "excalibur";
import { Theater } from "./theater-scene";
import { Resources } from "./resources";

Engine._useWebGL = true;
const game = new Engine();
const loader = new Loader();
for (let r in Resources) {
  loader.addResource(Resources[r]);
}

const theater = new Theater(game);
game.addScene('main', theater);

game.start(loader).then(() => {
  game.goToScene('main');
});

(window as any).game = game;