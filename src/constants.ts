export enum Locations {
  stageLeft = "stageLeft",
  stageCenter = "stageCenter",
  stageRight = "stageRight",
}

export enum StageProps {
  rubberChicken = "rubberChicken",
  trumpet = "trumpet",
  umbrella = "umbrella",
  toiletPaper = "toiletPaper",
  tomato = "tomato",
}

export enum Costumes {
  vikingHat = "vikingHat",
  jesterHat = "jesterHat",
  topHat = "topHat",
  sherifHat = "sherifHat",
}

export const IconPosition: { [key: string]: number } = {
  rubberChicken: 0,
  trumpet: 1,
  umbrella: 2,
  toiletPaper: 3,
  tomato: 4,
  vikingHat: 10,
  jesterHat: 11,
  topHat: 12,
  sherifHat: 13,
  stageCenter: 25,
  stageLeft: 26,
  stageRight: 27,
};
