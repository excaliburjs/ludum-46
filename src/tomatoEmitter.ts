import { Graphics, Scene, ParticleEmitter, EmitterType, vec } from "excalibur";
import Items from "./items";
import Config from "./config";

export class Tomatoes {
  private _emitter: ParticleEmitter;
  constructor(scene: Scene) {
    this._emitter = new ParticleEmitter({
      pos: vec(Config.GameWidth / 2, 100),
      emitterType: EmitterType.Circle,
      radius: 200,
      minVel: 417,
      maxVel: 589,
      minAngle: Math.PI,
      maxAngle: 0,
      isEmitting: false,
      emitRate: 5,
      opacity: 1,
      fadeFlag: true,
      particleLife: 1000,
      maxSize: 0.5,
      minSize: 0.5,
      // acceleration: vec(0, 460),
      sprite: Items.getIconSprite("tomato"),
      particleRotationalVelocity: Math.PI / 2,
      randomRotation: true,
    });

    scene.add(this._emitter);
  }

  public show() {
    this._emitter.isEmitting = true;
  }

  public hide() {
    this._emitter.isEmitting = false;
  }
}
