import { CueCard, CueCardEvents, CueCardExpiredEvent } from "./cuecard";
import { Scene, vec, EventDispatcher, Vector } from "excalibur";
import { Locations, StageProps, Costumes } from "./constants";
import Config from "./config";
import { stats } from "./session";
import { Player } from "./player";
import { Inventory } from "inventory";
export class CueCardManager {
  private stageLeftCueCard: CueCard;
  private stageCenterCueCard: CueCard;
  private stageRightCueCard: CueCard;
  private cardPadding: number = Config.CueCardPadding;
  private cardTopOffset: number = Config.CueCardTopOffset;
  private cueCardHeight: number = Config.CueCardHeight;
  private cueCardWidth: number = Config.CueCardWidth;
  private scene: Scene;
  private eventDispatcher: EventDispatcher;

  constructor(scene: Scene) {
    this.scene = scene;
    this.stageLeftCueCard = this._GenerateCueCard(1);
    this.stageCenterCueCard = this._GenerateCueCard(2);
    this.stageRightCueCard = this._GenerateCueCard(3);
    this.scene.add(this.stageLeftCueCard);
    this.scene.add(this.stageCenterCueCard);
    this.scene.add(this.stageRightCueCard);
    this.eventDispatcher = this.scene.eventDispatcher;
    this.SetUpEventHooks();
  }

  private _calculateCueCardPosition(cardNumber: number): Vector {
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

  private randomEnum<T extends Record<string, string>>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue as T[keyof T];
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
    if (target == this.stageLeftCueCard) {
      this.stageLeftCueCard = this._GenerateCueCard(1);
      this.scene.add(this.stageLeftCueCard);
    } else if (target == this.stageCenterCueCard) {
      this.stageCenterCueCard = this._GenerateCueCard(2);
      this.scene.add(this.stageCenterCueCard);
    } else if (target == this.stageRightCueCard) {
      this.stageRightCueCard = this._GenerateCueCard(3);
      this.scene.add(this.stageRightCueCard);
    } else {
      throw new Error();
    }
  }

  private _trySatisfyCueCard(inventory: Inventory, cueCard: CueCard): number {
    return inventory.getQueueCardScore(cueCard);
  }

  public SatisfyStageLeft(inventory: Inventory): number {
    const score =  this._trySatisfyCueCard(inventory, this.stageLeftCueCard);
    this.stageLeftCueCard.kill();
    return score;
  }

  public SatisfyStageCenter(inventory: Inventory): number {
    const score = this._trySatisfyCueCard(inventory, this.stageCenterCueCard);
    this.stageCenterCueCard.kill();
    return score;
  }

  public SatisfyStageRight(inventory: Inventory): number {
    const score = this._trySatisfyCueCard(inventory, this.stageRightCueCard);
    this.stageRightCueCard.kill();
    return score;
  }
}
