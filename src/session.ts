import { Engine, vec, Actor, CollisionType } from "excalibur";
import { Stats } from "./stats";
import { Theater } from "./theater-scene";
import { CueCard } from "./cuecard";
import { Player } from "./player";
import Config from "./config";
import { CueCardManager } from "./cuecardmanager";
import { Inventory } from "./inventory";
import { StageCenterTrigger } from "./stageCenterTrigger";

let gameStats: Stats;

// call this function to access and modify the game stats
export function stats() {
  return gameStats;
}

export function newgame(game: Engine) {
  // clear stats
  gameStats = new Stats();
  let inventory = new Inventory(game, Config.GameWidth / 2, Config.GameHeight);
  gameStats.inventory = inventory;

  const theater = new Theater(game);
  const cuecardmanager = new CueCardManager(theater);
  const player = new Player(Config.GameWidth / 2, Config.GameHeight / 2);
  theater.add(player);
  player.body.collider.type = CollisionType.Active;
  const stageCenterTrigger = new StageCenterTrigger(player, cuecardmanager);
  theater.add(stageCenterTrigger);

  theater.add(inventory);
  game.addScene("main", theater);
  game.goToScene("main");
  // begin main scene
}

export function gameover(game: Engine) {
  // TODO publish stats
  // TODO bring up player score scene or popup
}
