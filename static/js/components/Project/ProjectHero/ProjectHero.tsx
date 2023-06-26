import * as React from 'react';

import { SocialIcons, Image } from 'components';
import { ProjectStatisticsCards } from 'components/Project/ProjectStatisticsCards';

export const ProjectHero = ({
  project,
  title
}: {
  project: any;
  title?: string;
}) => (
  <div className='card project-hero'>
    <div className='card-header p-3 p-md-5'>
      {project.projectHero.logo && (
        <Image data={project.projectHero.logo} className='logo mb-spacer' />
      )}
      {(title || project.projectHero.content.title) && (
        <h1 className='h1 description mb-spacer'>
          {title ? title : project.projectHero.content.title}
        </h1>
      )}
      {project.projectHero.social && (
        <SocialIcons icons={project.projectHero.social} />
      )}
    </div>
    <div className='card-footer p-3 p-md-5'>
      <ProjectStatisticsCards project={project} className='mt-sm-spacer' />
    </div>
  </div>
);
