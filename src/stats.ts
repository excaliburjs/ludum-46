import Config from "./config";
import { Inventory } from "./inventory";

interface Payload {
  date: string; // the current date
  commit: string; // the current commit of the game
  started: number; // the time
  duration: number; // the duration of the game session
  numLinesDelivered: number;
  numPropsused: number;
  numCostumeChanges: number;
}

export class Analytics {
  public static publish(payload: Payload) {
    return fetch(Config.AnalyticsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
}

export class Stats {
  protected startTime = Date.now();
  constructor(private _inventory: Inventory) {}

  public get start() {
    return this.startTime;
  }
  public get duration() {
    return Date.now() - this.startTime;
  }

  public set inventory(inventory: Inventory) {
    this._inventory = inventory;
  }

  public get inventory(): Inventory {
    return this._inventory;
  }

  public reduceAudienceMeter(amount: number) {
    if (amount < this.currentAudienceScore) {
      this.currentAudienceScore -= amount; //TODO don't reduce this all at once, add some sort of animation of fast reduction of points to the audience meter
    } else {
      this.currentAudienceScore = 0;
    }
  }

  public increaseAudienceMeter(amount: number) {
    if (amount < this.currentAudienceScore + Config.AudienceMeterMaxWidth) {
      this.currentAudienceScore += amount;
    } else {
      this.currentAudienceScore = Config.AudienceMeterMaxWidth;
    }
  }

  public publishStats() {
    const commit = document.getElementById("commitRef")?.innerText;
    return Analytics.publish({
      commit: commit as string,
      date: new Date().toISOString(),
      started: this.start,
      duration: this.duration,
      numPropsused: this.numPropsUsed,
      numCostumeChanges: this.numCostumeChanges,
      numLinesDelivered: this.numLinesDelivered,
    });
  }

  public isGameOver = false;
  public numLinesDelivered = 0;
  public numPropsUsed = 0;
  public numCostumeChanges = 0;
  public currentAudienceScore = Config.AudienceMeterStartingWidth;
}
