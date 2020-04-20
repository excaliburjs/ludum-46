import sword from "../img/sword.png";
import icons from "../img/icons.png";
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
import cuecardBase from "../img/cuecard-base.png";
import cuecardTimer from "../img/cuecard-timer.png";
import background from "../img/background.png";
import titleCard from "../img/silent-card-template.png";
import playAgainButton from "../img/play-again-button.png";

import { Graphics, Sound } from "excalibur";
import { TiledResource } from "excalibur-tiled";

export const Resources = {
  swordImage: new Graphics.RawImage(sword),
  icons: new Graphics.RawImage(icons),
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
  cuecardBaseImage: new Graphics.RawImage(cuecardBase),
  cuecardTimerSheet: new Graphics.RawImage(cuecardTimer),
  map: new TiledResource("./map/map.json"),
  background: new Graphics.RawImage(background),
  titleCard: new Graphics.RawImage(titleCard),
  playAgainButton: new Graphics.RawImage(playAgainButton),

  music: new Sound("./mp3/background.mp3"),
  sndDoorOpen: new Sound("./wav/doorOpen.wav"),
  sndCardExpired: new Sound("./wav/cardExpired.wav"),
  sndCardSuccess: new Sound("./wav/cardSuccess.wav"),
  sndPickupItem: new Sound("./wav/pickupItem.wav"),
  sndNope: new Sound("./wav/nope2.wav"),
};
