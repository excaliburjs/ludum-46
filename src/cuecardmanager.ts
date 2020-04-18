import { CueCard } from "./cuecard";
import { Scene, vec } from "excalibur";

export class CueCardManager {
  private numberOfCueCards: number = 3;
  private cueCards: Array<CueCard> = new Array<CueCard>();

  constructor(scene: Scene) {
    this.cueCards.push(
      new CueCard({
        lifeTime: 10,
        requiredCostume: {},
        requiredLocation: {},
        requiredProp: {},
        cueCardHeight: 100,
        cueCardWidth: 300,
        cueCardLoc: vec(0, 0),
      })
    );

    for(let card of this.cueCards) {
        scene.add(card);
    }
  }
}
