import { Engine } from "excalibur";
import Config from "./config";
import { Stats } from "./stats";
import { Theater } from "./theater-scene";
import { Inventory } from "./inventory";

let gameStats: Stats;

// call this function to access and modify the game stats
export function stats() {
  return gameStats;
}

export function newgame(game: Engine) {
  // clear stats
  gameStats = new Stats();
  gameStats.inventory = new Inventory(
    game,
    Config.GameWidth / 2,
    Config.GameHeight
  );

  const theater = new Theater(game);

  game.addScene("main", theater);
  game.goToScene("main");
  // begin main scene
}

export function gameover(game: Engine) {
  // TODO publish stats
  // TODO bring up player score scene or popup
}
