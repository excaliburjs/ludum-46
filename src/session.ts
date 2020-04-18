import { Engine } from "excalibur";
import { Stats } from "./stats";

let gameStats: Stats;

// call this function to access and modify the game stats
export function stats() {
  return gameStats;
}

export function newgame(game: Engine) {
  // clear stats
  gameStats = new Stats();

  // begin main scene
  game.goToScene("main");
}

export function gameover(game: Engine) {
  // TODO publish stats
  // TODO bring up player score scene or popup
}
