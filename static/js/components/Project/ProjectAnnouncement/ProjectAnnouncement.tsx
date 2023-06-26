import React, { useEffect, useState } from 'react';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';

import { UnlockBtn, SignupStatus, Loader } from 'components';
import { useGetTier } from 'components/ContractStatus/helpers/useGetTiers';
import { TierType, currentProject } from 'config';
import { defaultFaqLink } from 'helpers/interface/getProjectPages';
import { useApiRequests } from 'hooks';
import { routeNames } from 'routes';

import { AnnouncementModal } from './components/AnnouncementModal';
import { EnergyTier } from './components/EnergyTier';
import { SnapshotsModal } from './components/SnapshotsModal';
import { Tier } from './components/Tier';

export const ProjectAnnouncement = ({ project }: { project: any }) => {
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);

  const { getTierByStakedAmoutn, getTierByEnergy } = useGetTier();
  const [tier, setTier] = useState<TierType | undefined>();
  const [energyTier, setEnergyTier] = useState<any | undefined>();
  const [geoCode, setGeoCode] = useState<string>('');
  const [tiersLoading, setTiersLoading] = useState<boolean>(true);
  const { getGeoCode } = useApiRequests();

  useEffect(() => {
    if (loggedIn) {
      fetchTier();
    }
  }, [loggedIn]);

  const fetchTier = async () => {
    const geoCodeResponse = await getGeoCode();
    if (geoCodeResponse.success) {
      setGeoCode(geoCodeResponse.data.country);
    }
    setTiersLoading(true);
    setTier(await getTierByStakedAmoutn());
    setEnergyTier(await getTierByEnergy());
    setTiersLoading(false);
  };

  const hasFaq = project.faq.length > 0;

  return (
    <>
      <div className='d-flex flex-column gap-2'>
        {!tiersLoading && (
          <h5 className='text-start text-neutral-300 mb-3'>
            Participate in the launch
          </h5>
        )}

        {loggedIn ? (
          <>
            {tiersLoading ? (
              <Loader title='' />
            ) : (
              <>
                <SignupStatus project={project} />
                <Tier project={project} tier={tier} geoCode={geoCode} />
                <EnergyTier
                  project={project}
                  energyTier={energyTier}
                  geoCode={geoCode}
                />
                <SnapshotsModal />
              </>
            )}
          </>
        ) : (
          <>
            <AnnouncementModal
              modalData={project.announcement?.modal}
              secondTabData={project.announcement?.modal1}
              geoCode={geoCode}
            />
            {hasFaq && (
              <Link
                data-testid='kycGuideLink'
                className='btn btn-dark btn-lg w-100'
                to={generatePath(routeNames[currentProject], {
                  section: defaultFaqLink
                })}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className='me-2' />
                KYC Guide
              </Link>
            )}
            <UnlockBtn large={true} className='m-0' />
          </>
        )}
      </div>
    </>
  );
};
