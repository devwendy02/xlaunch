import React, { useState } from 'react';
import { faAngleUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimateHeight from 'react-animate-height';

import { Timeline } from 'components';

export const AnnouncementTimeline = ({ project }: { project: any }) => {
  const announcement = project.announcement;
  const [height, setHeight] = useState<'auto' | number | `${number}%`>(
    window.matchMedia('(max-width: 576px)')?.matches ? 240 : 'auto'
  );
  const collapsed = height === 240;

  return (
    <div className='announcement-timeline'>
      <AnimateHeight
        duration={500}
        height={height}
        className='position-relative'
      >
        {announcement && (announcement.timeline1 || announcement.timeline2) && (
          <div className='project-announcement-timeline mt-spacer mt-lg-5'>
            <div className='timeline'>
              {announcement.content.title && (
                <h5 className='text-start text-neutral-300 mb-3'>
                  {announcement.content.title}
                </h5>
              )}
              {announcement.timelineTitle1 && (
                <div className='phase'>
                  <p>{announcement.timelineTitle1}</p>
                </div>
              )}
              {announcement.timeline1 && (
                <Timeline timeline={announcement.timeline1} />
              )}
              {announcement.timelineTitle2 && (
                <div className='phase'>
                  <p className='mt-spacer pt-3 border-top'>
                    {announcement.timelineTitle2}
                  </p>
                </div>
              )}
              {announcement.timeline2 && announcement.timeline2.length > 0 && (
                <Timeline timeline={announcement.timeline2} />
              )}
            </div>
          </div>
        )}
      </AnimateHeight>
      <button
        aria-expanded={height !== 240}
        aria-controls='example-panel'
        onClick={() => setHeight(collapsed ? 'auto' : 240)}
        className={`btn btn-sm btn-dark d-flex d-sm-none mx-auto px-3 mt-3 align-items-center text-nowrap ${
          collapsed ? 'collapsed' : ''
        }`}
      >
        {collapsed ? 'View full timeline' : 'Collapse'}
        <FontAwesomeIcon icon={faAngleUp} className='ms-2' size='lg' />
      </button>
    </div>
  );
};
