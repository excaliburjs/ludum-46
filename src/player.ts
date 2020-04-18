import { Actor } from "excalibur";
import config from "./config";

export class Player extends Actor {
  constructor(x: number, y: number) {
    super(x, y, config.PlayerWidth, config.PlayerHeight);
  }
}
