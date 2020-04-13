import Config from "./config";

interface Payload {
    date: string; // date
    commit: string;
    started: number; // time
    duration: number;
    reason: any;
}

export class Analytics {
    public static publish(payload: Payload) {
        return fetch(Config.AnalyticsEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    }
}