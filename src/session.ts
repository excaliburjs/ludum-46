import { Engine, PostUpdateEvent } from "excalibur";
import Config from "./config";
import { Stats } from "./stats";
import { Theater } from "./theater-scene";
import { Inventory } from "./inventory";
import { AudienceMeter } from "./audienceMeter";
import { GameOver } from "./gameover";

let gameStats: Stats;

// call this function to access and modify the game stats
export function stats() {
  return gameStats;
}

export function newgame(game: Engine) {
  // clear stats
  let inventory = new Inventory(
    game,
    Config.GameWidth / 2,
    Config.GameHeight - 40
  );
  gameStats = new Stats(inventory);
  const theater = new Theater(game);
  const gameOver = new GameOver();
  (window as any).gameOver = gameOver;
  theater.add(inventory);
  theater.add(gameOver);
  game.addScene("main", theater);
  game.goToScene("main");
  let triggered = false;
  game.on("postupdate", function checkGameOver(event: PostUpdateEvent) {
    if (triggered) return;
    if (gameStats.isGameOver) {
      gameOver.updateEndScreen();
      gameOver.show();
      triggered = true;
    }
  });
  // begin main scene
}

export function gameover(game: Engine) {
  game.stop();
  // TODO publish stats
  // TODO bring up player score scene or popup
}
