import React from 'react';
import { Link } from 'react-router-dom';

import { getGlobalContent } from 'helpers';
import { ImageParticles } from './components/ImageParticles';
import { Particles } from './components/Particles';

import { ReactComponent as Rocket } from '../../assets/images/rocket.svg';

export const Hero = ({ project }: { project?: any }) => {
  const { statistics } = getGlobalContent();

  return (
    <section className='home-hero'>
      <div className='home-hero-particles'>
        <Particles />
        <ImageParticles />
      </div>

      <div className='home-hero-top'>
        <h1 className='home-hero-title text-start'>
          Build a community, raise funds,
          <br />
          <span className='text-neutral-500'>
            {' '}
            deliver a technology that improves the world.
          </span>
        </h1>
      </div>
      <div className='home-hero-bottom'>
        {/* <div className='home-hero-buttons'>
          {project.link && project.name ? (
            <Link
              data-testid='homeLink'
              className='btn btn-primary btn-lg mt-auto'
              to={project.link}
            >
              {project?.hero?.btnText
                ? project.hero.btnText
                : `Enter ${project.name}`}
            </Link>
          ) : (
            <a
              className='btn btn-primary'
              href='https://form.typeform.com/to/TzeoE5SU'
              target='_blank'
              rel='noreferrer noopener nofollow'
            >
              <Rocket
                className='me-3'
                style={{ width: '1rem', height: '1rem', fill: '#FFF' }}
              />
              Apply Now
            </a>
          )}
        </div> */}
        {statistics && statistics.length > 0 && (
          <div className='home-hero-cards'>
            {statistics.map((card) => (
              <div className='home-hero-card text-start' key={card.title}>
                <h2 className='home-hero-card-title text-start text-neutral-400'>
                  {card.title}
                </h2>
                <h3 className='home-hero-card-data h1 text-primary'>
                  {card.data}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
