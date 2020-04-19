import { Vector, vec } from "excalibur";

export default {
  AnalyticsEndpoint: "https://ludum46stats.azurewebsites.net/api/LD46Stats",
  RandomSeed: 12345, // classic

  PlayerWidth: 35,
  PlayerHeight: 35,
  PlayerVel: 100,
  PlayerSpriteHeight: 45,
  PlayerSpriteWidth: 45,

  GameWidth: 1280,
  GameHeight: 720,

  CueCardPadding: 80, // how much space is between each any two cue cards
  CueCardTopOffset: 100, // how far from the top of the game window the cue cards are placed
  CueCardHeight: 75,
  CueCardWidth: 300,
  CueCardLifeMinSeconds: 15,
  CueCardLifeMaxSeconds: 35,

  AudienceMeterMaxWidth: 600,
  AudienceMeterStartingWidth: 400,
  AudienceMeterHeight: 50,

  SoundVolume: 1,
  CueCardExpiredVolume: 0.1,
  BackgroundVolume: 0.6,
};
