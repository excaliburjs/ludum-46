import Config from "./config";
import Inventory from "./inventory";

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
  private _inventory = new Inventory();
  protected startTime = Date.now();
  public get start() {
    return this.startTime;
  }
  public get duration() {
    return Date.now() - this.startTime;
  }

  public get inventory() {
    return this._inventory;
  }
  public numLinesDelivered = 0;
  public numPropsUsed = 0;
  public numCostumeChanges = 0;
}
