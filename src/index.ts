import { Engine, Loader } from "excalibur";
import { Theater } from "./theater-scene";
import { Resources } from "./resources";
import { CueCard } from "./cuecard";

Engine._useWebGL = true;
const game = new Engine();
const loader = new Loader();
for (let r in Resources) {
  loader.addResource(Resources[r]);
}

const theater = new Theater(game);
game.addScene('main', theater);

const cueCard = new CueCard();
theater.add(cueCard);

game.start(loader).then(() => {
  game.goToScene('main');
});

(window as any).game = game;