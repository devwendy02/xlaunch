import * as React from 'react';
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce
} from 'react-particle-image';

const round = (n: number, step = 20) => Math.ceil(n / step) * step;

const STEP = 20;

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y);

    return pixel.r > 50 || pixel.g > 50 || pixel.b > 50;
  },

  color: ({ x, y, image }) => {
    const pixel = image.get(x, y);

    return `rgba(
      ${round(pixel.r, STEP)}, 
      ${round(pixel.g, STEP)}, 
      ${round(pixel.b, STEP)}, 
      ${round(pixel.a, STEP) / 255}
    )`;
  },
  radius: () => Math.random() * 1 + 0.5,
  mass: () => 20,
  friction: () => 0.55,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  }
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 5);
};

export const ImageParticles = () => {
  return (
    <div className='particle-wrapper'>
      <ParticleImage
        src={'/projects/particles/hatom-new.png'}
        scale={1}
        entropy={20}
        maxParticles={3000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        backgroundColor='transparent'
        className='particles-foreground'
      />
    </div>
  );
};
