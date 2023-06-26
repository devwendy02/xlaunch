import React from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';

import { ReactComponent as XLaunchpadLogo } from 'assets/images/xlaunchpad-white.svg';
import { ProjectSections } from 'components';
import { ProjectSectionType } from 'components/Project/ProjectSections';
import {
  ProjectsType,
  ProjectsEnum,
  currentProject as configProject
} from 'config';
import { getProjectPages } from 'helpers';
import { routeNames } from 'routes';

export const Faq = ({
  project
}: {
  project: { faq: Array<ProjectSectionType> };
}) => {
  const linkProject: ProjectsType = location.pathname.split(
    '/'
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;
  const { links } = getProjectPages(project);

  return (
    <div className='col-lg-12 mt-spacer mt-lg-0 faq'>
      <div className='card card-black border-0 shadow'>
        <div className='sections card-body py-0'>
          <div className='text-center'>
            <XLaunchpadLogo className='xlaunchpad-logo mt-5' />
          </div>
          <ProjectSections data={project.faq} />
        </div>

        <div className='card-footer text-center'>
          {links.length > 0 && (
            <Link
              className='btn btn-lg btn-primary px-5 d-inline-flex mx-auto'
              to={generatePath(routeNames[currentProject], {
                section: ''
              })}
            >
              Back to project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
