import React, { useEffect, useState } from 'react';
import { Loader, HeroContent, Hero } from 'components';
import { useCMS, currentProject } from 'config';
import { getContent } from 'helpers';
import { useApiRequests } from 'hooks';

export const Home = () => {
  const ref = React.useRef(null);

  const { getCMSData } = useApiRequests();

  const [project, setProject] = useState<any>();
  const [projectFetched, setProjectFetched] = useState(false);

  useEffect(() => {
    if (ref.current !== null && !projectFetched) {
      if (useCMS) {
        fetchProjectData();
      } else {
        const data = getContent(currentProject);
        setProjectFetched(true);
        setProject(data);
      }
    }
  }, []);

  const fetchProjectData = async () => {
    const cmsResult = await getCMSData();

    if (cmsResult.success) {
      setProjectFetched(true);
      setProject(cmsResult.data[0].atributes);
    }
  };

  return (
    <div
      className='home d-flex justify-content-center flex-fill pb-spacer'
      ref={ref}
    >
      <div className='container d-flex flex-column flex-grow-1'>
        {projectFetched && project ? (
          <div className='w-100 text-center d-flex flex-column'>
            <Hero project={project} />
            <h1 className='my-spacer text-start ms-md-spacer'>
              Featured Project
            </h1>
            <HeroContent project={project} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
