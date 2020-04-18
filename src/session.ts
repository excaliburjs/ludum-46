import { Engine, vec } from "excalibur";
import { Stats } from "./stats";
import { Theater } from "./theater-scene";
import { CueCard } from "./cuecard";
import { Player } from "./player";
import Config from "./config";
import { CueCardManager } from "./cuecardmanager";

let gameStats: Stats;

// call this function to access and modify the game stats
export function stats() {
  return gameStats;
}

export function newgame(game: Engine) {
  // clear stats
  gameStats = new Stats();

  const theater = new Theater(game);
  const cueCardManager = new CueCardManager(theater);

  const player = new Player(Config.GameWidth / 2, Config.GameHeight / 2);
  theater.add(player);
  game.addScene("main", theater);
  game.goToScene("main");
  // begin main scene
}

export function gameover(game: Engine) {
  // TODO publish stats
  // TODO bring up player score scene or popup
}
