import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useMatch, matchPath } from 'react-router-dom';

import { ProjectHero, Loader } from 'components';
import {
  ProjectsType,
  ProjectsEnum,
  useCMS,
  currentProject as configProject
} from 'config';
import { getContent, getProjectPages } from 'helpers';
import { defaultFaqLink } from 'helpers/interface/getProjectPages';
import { useApiRequests } from 'hooks';
import { launchpadOriginSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { Announcement } from './components/Announcement';
import { Faq } from './components/Faq';
import { Tabs } from './components/Tabs';

export const Project = () => {
  const ref = React.useRef(null);

  const { getCMSData } = useApiRequests();
  const location = useLocation();
  const linkProject: ProjectsType = location.pathname.split(
    '/'
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;

  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const match = useMatch(routeNames[linkProject] || routeNames.home);

  const [project, setProject] = useState<any>();
  const [projectFetched, setProjectFetched] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (ref.current !== null && !projectFetched) {
      if (useCMS) {
        fetchProjectData();
      } else {
        const data = getContent(currentProject);
        if (data) {
          handleProjectData(data);
        }
      }
    }
  }, []);

  const fetchProjectData = async () => {
    const cmsResult = await getCMSData();

    if (cmsResult.success && cmsResult.data[0].atributes) {
      handleProjectData(cmsResult.data[0].atributes);
    }
  };

  const handleProjectData = (data: any) => {
    setProjectFetched(true);
    setProject(data);
  };

  useEffect(() => {
    if (project) {
      const { links } = getProjectPages(project);
      const bgSectionSection = matchPath(
        routeNames[currentProject],
        launchpadOrigin.pathname
      );
      const currentActiveSection =
        match?.params.section && links.includes(match?.params.section)
          ? match.params.section
          : bgSectionSection?.params?.section ?? links[0];

      setActiveSection(currentActiveSection);
    }
  }, [match, project, launchpadOrigin, currentProject]);

  return (
    <div
      className={`project flex-fill pb-spacer ${
        activeSection === defaultFaqLink ? defaultFaqLink : ''
      }`}
      ref={ref}
    >
      <div className='container d-flex flex-column flex-fill h-100'>
        <div className='row h-100'>
          {projectFetched && project && activeSection ? (
            <>
              {activeSection === defaultFaqLink ? (
                <Faq project={project} />
              ) : (
                <>
                  <div className='col-12'>
                    {project.projectHero && <ProjectHero project={project} />}
                  </div>
                  <div className='project-wrapper-card col-12'>
                    <div className='card-wrapper row'>
                      <div className='col-lg-4 order-lg-last announcement-column'>
                        <Announcement project={project} />
                      </div>
                      <div className='col-lg-8 mt-3 mt-lg-0 content-column'>
                        <div className='ps-lg-4 pe-lg-5'>
                          <Tabs
                            project={project}
                            activeSection={activeSection}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className='d-flex align-items-center justify-content-center mx-auto flex-fill'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
