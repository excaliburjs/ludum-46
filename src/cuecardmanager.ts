import { CueCard } from "./cuecard";
import { Scene, vec } from "excalibur";

export class CueCardManager {
  private numberOfCueCards: number = 3;
  private cueCards: Array<CueCard> = new Array<CueCard>();
  private cueCardHeight: number = 100;
  private cueCardWidth: number = 300;

  constructor(scene: Scene) {
    this.cueCards.push(
      new CueCard({
        lifeTime: 10,
        requiredCostume: {},
        requiredLocation: {},
        requiredProp: {},
        cueCardHeight: this.cueCardHeight,
        cueCardWidth: this.cueCardWidth,
        cueCardLoc: vec(10, 10),
      }),
      new CueCard({
        lifeTime: 10,
        requiredCostume: {},
        requiredLocation: {},
        requiredProp: {},
        cueCardHeight: this.cueCardHeight,
        cueCardWidth: this.cueCardWidth,
        cueCardLoc: vec(this.cueCardWidth * 2, 10),
      }),
      new CueCard({
        lifeTime: 10,
        requiredCostume: {},
        requiredLocation: {},
        requiredProp: {},
        cueCardHeight: this.cueCardHeight,
        cueCardWidth: this.cueCardWidth,
        cueCardLoc: vec(this.cueCardWidth * 3, 10),
      })
    );

    for (let card of this.cueCards) {
      scene.add(card);
    }
  }
}
