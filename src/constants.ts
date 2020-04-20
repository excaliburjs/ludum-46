// BEWARE THE ORDER MATTERS HERE
// THIS IS THE ORDER ON THE SCREEN
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
  sword = "sword",
}

export enum Costumes {
  vikingHat = "vikingHat",
  jesterHat = "jesterHat",
  topHat = "topHat",
  sherifHat = "sherifHat",
  magicianHat = "magicianHat",
  bunnyEars = "bunnyEars",
}

export const IconPosition: { [key: string]: number } = {
  rubberChicken: 0,
  trumpet: 1,
  umbrella: 2,
  toiletPaper: 3,
  tomato: 4,
  sword: 5,
  vikingHat: 10,
  jesterHat: 11,
  topHat: 12,
  sherifHat: 13,
  magicianHat: 14,
  bunnyEars: 15,
  stageCenter: 25,
  stageLeft: 26,
  stageRight: 27,
  redCheck: 28,
};
