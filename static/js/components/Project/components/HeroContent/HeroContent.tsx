import React from 'react';
import { Link } from 'react-router-dom';

import { Image } from 'components';
import { ProjectStatisticsCards } from 'components/Project/ProjectStatisticsCards';

export const HeroContent = ({ project }: { project: any }) => {
  const heroContent = project?.hero?.content;

  return (
    <>
      {heroContent?.image ? (
        <div className={`hero-content ${project?.link}`}>
          <div className='hero-image position-relative'>
            <Image
              data={heroContent.image}
              fluid={false}
              className='bg-image'
            />
            {project.hero?.logo && (
              <Image
                data={project.hero.logo}
                className='logo position-absolute'
              />
            )}

            <div className='project-details'>
              {project?.hero?.text && (
                <h1 className='project-title'>{project.hero.text}</h1>
              )}
              <ProjectStatisticsCards project={project} showButton={true} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {project.link && project.name && (
            <Link
              data-testid='homeLink'
              className='btn btn-primary btn-lg position-absolute'
              to={project.link}
            >
              Enter {project.name}
            </Link>
          )}
        </>
      )}
    </>
  );
};
