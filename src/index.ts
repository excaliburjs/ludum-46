import { Engine, Loader, Color } from "excalibur";
import { Resources } from "./resources";
import { newgame } from "./session";
import Config from "./config";
import { SoundManager } from "./soundManager";

Engine._useWebGL = true;
const game = new Engine({
  canvasElementId: "game",
  height: Config.GameHeight,
  width: Config.GameWidth,
  backgroundColor: Color.fromHex("#333333"),
});
const loader = new Loader();
loader.backgroundColor = "#333333";

for (let r in Resources) {
  loader.addResource((Resources as any)[r]);
}

SoundManager.init();

game.start(loader).then(() => {
  newgame(game);
});

(window as any).game = game;
