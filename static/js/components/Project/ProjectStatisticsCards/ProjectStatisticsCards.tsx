import * as React from 'react';
import { Link } from 'react-router-dom';

export const ProjectStatisticsCards = ({
  project,
  className = '',
  showButton = false
}: {
  project: any;
  className?: string;
  showButton?: boolean;
}) => {
  if (project.statistics.length === 0) {
    return null;
  }

  return (
    <div className={`project-statistics-cards ${className}`}>
      {project.statistics.map((statistic: any) => (
        <div className='project-statistic' key={statistic.title}>
          <h3 className='statistic-title text-neutral-400'>
            {statistic.title}
          </h3>
          <h4 className='statistic-data h3'>{statistic.data}</h4>
        </div>
      ))}
      {showButton && (
        <div className='statistics-button d-flex justify-content-center justify-content-lg-end'>
          {project.link && project.name && (
            <Link
              data-testid='homeLink'
              className='btn btn-primary btn-lg mt-auto'
              to={project.link}
            >
              {project?.hero?.btnText
                ? project.hero.btnText
                : `Enter ${project.name}`}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
