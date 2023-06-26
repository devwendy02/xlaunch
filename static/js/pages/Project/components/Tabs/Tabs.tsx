import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Tab, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { ProjectSections, UnlockBtn } from 'components';
import {
  ProjectsType,
  ProjectsEnum,
  currentProject as configProject
} from 'config';
import { getIcon, getProjectPages, scrollToTab } from 'helpers';

export const Tabs = ({
  project,
  activeSection
}: {
  project: any;
  activeSection: string;
}) => {
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);
  const navigate = useNavigate();
  const location = useLocation();
  const linkProject: ProjectsType = location.pathname.split(
    '/'
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;

  const { pages, links } = getProjectPages(project);
  const [activeKey, setActiveKey] = useState(activeSection ?? links[0]);

  useEffect(() => {
    if (activeSection) {
      setActiveKey(activeSection);
    }
  }, [activeSection]);

  return (
    <Tab.Container
      id='project-details'
      defaultActiveKey={activeKey}
      onSelect={(selectedKey) => {
        selectedKey ? setActiveKey(selectedKey) : null;
      }}
      activeKey={activeKey}
    >
      <div className='project-tabs-wrapper'>
        <div className='tabs'>
          {pages.map((page) => {
            if (!page) {
              return null;
            }
            return (
              <Nav.Link
                key={page.title}
                eventKey={page.link}
                className={`${page.link} tab ${
                  activeKey === page.link ? 'active' : ''
                }`}
                onClick={(e) => {
                  // Here be dragons
                  if (window.matchMedia('(max-width: 576px)')?.matches) {
                    scrollToTab(page.link);
                    if (e?.currentTarget) {
                      e.currentTarget.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start'
                      });
                    }
                  }

                  navigate(`/${currentProject}/${page.link}`);
                }}
              >
                {page.icon && (
                  <FontAwesomeIcon
                    icon={getIcon(page.icon)}
                    className='me-2'
                    size='lg'
                  />
                )}
                {page.title}
                {
                  page.title === 'NFT Mystery Box'
                    ? ' 🔥'
                    : '' /* hacky stuff until strapi fixes emojis */
                }
              </Nav.Link>
            );
          })}
        </div>
      </div>
      <Tab.Content>
        {pages.map((page) => {
          if (!page || !project[page.page]) {
            return null;
          }

          return (
            <Tab.Pane
              eventKey={page.link}
              className={page.link}
              key={`${page.title}-tab`}
            >
              <div
                className={`sections py-spacer pt-sm-5 project-${page.link}`}
              >
                <ProjectSections data={project[page.page]} />
              </div>
            </Tab.Pane>
          );
        })}

        {pages.length > 0 && (
          <div className='card-footer m-spacer text-center'>
            {activeKey === pages[0].link ? (
              <Link
                className='btn btn-lg btn-primary px-5 d-inline-flex mx-auto'
                to={`/${currentProject}/${pages[1].link}`}
                onClick={() => {
                  scrollToTab(pages[1].link);
                  setActiveKey(pages[1].link);
                }}
              >
                Show {pages[1].title}
              </Link>
            ) : loggedIn ? (
              <Link
                className='btn btn-lg btn-primary px-5 d-inline-flex mx-auto'
                to={`/${currentProject}/${pages[0].link}`}
                onClick={() => {
                  scrollToTab(pages[0].link);
                  setActiveKey(pages[0].link);
                }}
              >
                Read {pages[0].title}
              </Link>
            ) : (
              <UnlockBtn
                large={true}
                className='px-5 d-inline-flex mx-auto'
                text='Register Now'
              />
            )}
          </div>
        )}
      </Tab.Content>
    </Tab.Container>
  );
};
