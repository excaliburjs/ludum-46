import { CueCard } from "./cuecard";
import { Scene, vec } from "excalibur";

export class CueCardManager {
  private firstCueCard: CueCard;
  private secondCueCard: CueCard;
  private thirdCueCard: CueCard;
  private cardPadding: number = 20;
  private cardTopOffset: number = 10;
  private cueCardHeight: number = 100;
  private cueCardWidth: number = 300;
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.firstCueCard = new CueCard({
      lifeTime: 10,
      requiredCostume: {},
      requiredLocation: {},
      requiredProp: {},
      cueCardHeight: this.cueCardHeight,
      cueCardWidth: this.cueCardWidth,
      cueCardLoc: this._calculateCueCardPosition(1),
    });
    this.secondCueCard = new CueCard({
      lifeTime: 10,
      requiredCostume: {},
      requiredLocation: {},
      requiredProp: {},
      cueCardHeight: this.cueCardHeight,
      cueCardWidth: this.cueCardWidth,
      cueCardLoc: this._calculateCueCardPosition(2),
    });
    this.thirdCueCard = new CueCard({
      lifeTime: 10,
      requiredCostume: {},
      requiredLocation: {},
      requiredProp: {},
      cueCardHeight: this.cueCardHeight,
      cueCardWidth: this.cueCardWidth,
      cueCardLoc: this._calculateCueCardPosition(3),
    });
    this.scene.add(this.firstCueCard);
    this.scene.add(this.secondCueCard);
    this.scene.add(this.thirdCueCard);
  }

  private _calculateCueCardPosition(cardNumber: number) {
    const padding = this.cardPadding * cardNumber;
    const cardWidth = this.cueCardWidth * (cardNumber - 1);
    return vec(padding + cardWidth, this.cardTopOffset);
  }
}
