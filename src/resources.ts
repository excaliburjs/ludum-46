import sword from "../img/sword.png";
import stageLeft from "./assets/stage-left.png";
import stageRight from "./assets/stage-right.png";

import { Graphics, Resource } from "excalibur";

export const Resources: { [key: string]: Resource<any> } = {
  swordImage: new Graphics.RawImage(sword),
  stageLeftImage: new Graphics.RawImage(stageLeft),
  stageRightImage: new Graphics.RawImage(stageRight),
};
