import sword from "../img/sword.png";
import stageLeft from "./assets/stage-left.png";
import stageRight from "./assets/stage-right.png";
import player1 from "../img/char-sprites/player-1.png";
import player2 from "../img/char-sprites/player-2.png";
import player3 from "../img/char-sprites/player-3.png";
import player4 from "../img/char-sprites/player-4.png";
import player5 from "../img/char-sprites/player-5.png";
import player1long from "../img/char-sprites/player-1-long.png";
import player2long from "../img/char-sprites/player-2-long.png";
import player3long from "../img/char-sprites/player-3-long.png";
import player4long from "../img/char-sprites/player-4-long.png";
import player5long from "../img/char-sprites/player-5-long.png";

import { Graphics, Resource } from "excalibur";

export const Resources: { [key: string]: Resource<any> } = {
  swordImage: new Graphics.RawImage(sword),
  stageLeftImage: new Graphics.RawImage(stageLeft),
  stageRightImage: new Graphics.RawImage(stageRight),
  charSheet1: new Graphics.RawImage(player1),
  charSheet2: new Graphics.RawImage(player2),
  charSheet3: new Graphics.RawImage(player3),
  charSheet4: new Graphics.RawImage(player4),
  charSheet5: new Graphics.RawImage(player5),
  charSheet6: new Graphics.RawImage(player1long),
  charSheet7: new Graphics.RawImage(player2long),
  charSheet8: new Graphics.RawImage(player3long),
  charSheet9: new Graphics.RawImage(player4long),
  charSheet10: new Graphics.RawImage(player5long),
};
