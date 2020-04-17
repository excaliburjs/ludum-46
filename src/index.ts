import { Engine, vec, ParticleEmitter, Color, Loader, Graphics, EmitterType } from "excalibur";
import sword from '../img/sword.png';

Engine._useWebGL = true;
const game = new Engine();
const loader = new Loader();

const image = new Graphics.RawImage(sword);
const sprite = Graphics.Sprite.from(image);
sprite.origin = vec(.5, .5);

const emitter = new ParticleEmitter({
    pos: vec(game.halfDrawWidth, game.halfDrawHeight),
    emitterType: EmitterType.Circle,
    radius: 1,
    minVel: 417,
    maxVel: 589,
    minAngle: Math.PI,
    maxAngle: Math.PI * 2,
    isEmitting: false,
    emitRate: 10,
    opacity: 1,
    fadeFlag: true,
    particleLife: 2465,
    maxSize: 1.5,
    minSize: 0.5,
    acceleration: vec(0, 460),
    sprite: sprite,
    particleRotationalVelocity: Math.PI,
    randomRotation: true
  });

emitter.isEmitting = true;
game.add(emitter);

loader.addResource(image);

game.start(loader);

(window as any).game = game;