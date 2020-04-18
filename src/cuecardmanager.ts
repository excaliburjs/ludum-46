import { CueCard, CueCardEvents } from "./cuecard";
import { GameEvent, Scene, vec, EventDispatcher } from "excalibur";

export class CueCardManager {
  private firstCueCard: CueCard;
  private secondCueCard: CueCard;
  private thirdCueCard: CueCard;
  private cardPadding: number = 20;
  private cardTopOffset: number = 10;
  private cueCardHeight: number = 100;
  private cueCardWidth: number = 300;
  private scene: Scene;
  private eventDispatcher: EventDispatcher;

  constructor(scene: Scene) {
    this.scene = scene;
    this.firstCueCard = this._GenerateCueCard(1);
    this.secondCueCard = this._GenerateCueCard(2);
    this.thirdCueCard = this._GenerateCueCard(3);
    this.scene.add(this.firstCueCard);
    this.scene.add(this.secondCueCard);
    this.scene.add(this.thirdCueCard);
    this.eventDispatcher = this.scene.eventDispatcher;
    this.SetUpEventHooks();
  }

  private _calculateCueCardPosition(cardNumber: number) {
    const padding = this.cardPadding * cardNumber;
    const cardWidth = this.cueCardWidth * (cardNumber - 1);
    return vec(padding + cardWidth, this.cardTopOffset);
  }

  private SetUpEventHooks(): void {
    this.eventDispatcher.on(CueCardEvents.CueCardExpired, this.CueCardExpired);
    this.eventDispatcher.on(CueCardEvents.CueCardSatisfied, this.CueCardSatisfied);
  }

  private _GenerateCueCard(num: number): CueCard {
    return new CueCard({
      lifeTime: 10,
      requiredCostume: {},
      requiredLocation: {},
      requiredProp: {},
      cueCardHeight: this.cueCardHeight,
      cueCardWidth: this.cueCardWidth,
      cueCardLoc: this._calculateCueCardPosition(num),
    });
  }

  private CueCardExpired(gameEvent: GameEvent<CueCard, false>){
    const target = gameEvent.target;
    switch(target){
      case this.firstCueCard:
        this.firstCueCard = this._GenerateCueCard(1);
        break;
      case this.secondCueCard:
        this.secondCueCard = this._GenerateCueCard(2);
        break;
      case this.thirdCueCard:
        this.thirdCueCard = this._GenerateCueCard(3);
        break;
      default:
        throw new Error();
    }
  }

  private CueCardSatisfied(gameEvent: GameEvent<CueCard, false>){
    switch(target){
      case this.firstCueCard:
        break;
      case this.secondCueCard:
        break;
      case this.thirdCueCard:
        break;
      default:
        throw new Error();
    }
  }
}
