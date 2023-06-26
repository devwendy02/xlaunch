import React from 'react';

import { ContractStatus } from 'components';
import { ProjectAnnouncementPlaceholder } from 'components/Project/ProjectAnnouncement/ProjectAnnouncementPlaceholder';
import { environment, ProjectsEnum } from 'config';

import { AnnouncementTimeline } from './AnnouncementTimeline';

export const Announcement = ({ project }: { project: any }) => {
  const isStaging =
    process.env.REACT_APP_IS_STAGING && (environment as string) === 'mainnet';

  return (
    <>
      <div className='card project-announcement'>
        <div className='card-body p-3 p-xl-spacer'>
          {/* // TODO Remove once contract and/or KYC is ready  */}
          {isStaging && project?.link === ProjectsEnum.HATOM ? (
            <ProjectAnnouncementPlaceholder project={project} />
          ) : (
            <ContractStatus projectData={project} />
          )}
          <AnnouncementTimeline project={project} />
        </div>
      </div>
    </>
  );
};
