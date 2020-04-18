import { Engine } from "excalibur";
import { Stats } from "./stats";

let stats: Stats;

export function getStats() {
  return stats;
}

export function newgame(game: Engine) {
  // clear stats
  // TODO

  // begin main scene
  game.goToScene("main");
}

export function gameover(game: Engine) {
  // TODO publish stats
  // TODO bring up player score scene or popup
}
