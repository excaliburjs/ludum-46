import { CueCard, CueCardEvents, CueCardExpiredEvent } from "./cuecard";
import { GameEvent, Scene, vec, EventDispatcher } from "excalibur";
import { Locations, StageProps, Costumes } from "./constants";
export class CueCardManager {
  private firstCueCard: CueCard;
  private secondCueCard: CueCard;
  private thirdCueCard: CueCard;
  private cardPadding: number = 80;
  private cardTopOffset: number = 10;
  private cueCardHeight: number = 75;
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
    this.eventDispatcher.on(
      CueCardEvents.CueCardExpired,
      this.CueCardExpired.bind(this) as any
    );
    this.eventDispatcher.on(
      CueCardEvents.CueCardSatisfied,
      this.CueCardExpired.bind(this) as any
    );
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

  private _GenerateCueCard(num: number): CueCard {
    return new CueCard({
      lifeTime: Math.random() * 5 + 1,
      requiredCostume: this.randomEnum(Costumes),
      requiredLocation: <Locations>Object.keys(Locations)[num - 1],
      requiredProp: this.randomEnum(StageProps),
      cueCardHeight: this.cueCardHeight,
      cueCardWidth: this.cueCardWidth,
      cueCardLoc: this._calculateCueCardPosition(num),
    });
  }

  private CueCardExpired(cueCardEvent: CueCardExpiredEvent) {
    const target = cueCardEvent.cueCard;
    if (target == this.firstCueCard) {
      this.firstCueCard = this._GenerateCueCard(1);
      this.scene.add(this.firstCueCard);
    } else if (target == this.secondCueCard) {
      this.secondCueCard = this._GenerateCueCard(2);
      this.scene.add(this.secondCueCard);
    } else if (target == this.thirdCueCard) {
      this.thirdCueCard = this._GenerateCueCard(3);
      this.scene.add(this.thirdCueCard);
    } else {
      throw new Error();
    }
  }
}
