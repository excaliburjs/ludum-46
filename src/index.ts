import { Engine } from "excalibur";

Engine._useWebGL = true;
const game = new Engine();

game.start();

window.game = game;