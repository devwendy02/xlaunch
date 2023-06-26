import * as React from 'react';

import { AdditionalContent, Content, Timeline } from 'components';
import { ProjectRoadmapDataType } from 'components/Project/components/Timeline';
import { CMSSectionContent } from 'helpers/types';

export const SectionRoadmap = ({
  data
}: {
  data: { content: CMSSectionContent; roadmap: Array<ProjectRoadmapDataType> };
}) => {
  return (
    <div
      className={`section-roadmap my-5 ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, '')
          : ''
      }`}
    >
      {data.content && <Content content={data.content} />}
      {data.roadmap && <Timeline timeline={data.roadmap} />}
      {data.content && <AdditionalContent content={data.content} />}
    </div>
  );
};
