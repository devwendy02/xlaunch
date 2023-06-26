import React from 'react';
import {
  faCrown,
  faBatteryBolt,
  faArrowUpRight,
  faCircleInfo
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

import { getTicketsNumber } from 'helpers';
import { AnnouncementModal } from '../AnnouncementModal';

export const EnergyTier = ({
  project,
  geoCode,
  energyTier
}: {
  project: any;
  geoCode: string;
  energyTier?: any;
}) => {
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);

  return (
    <>
      {loggedIn && (
        <>
          {energyTier ? (
            <div className='border border-primary rounded d-flex flex-column'>
              <div className='bg-primary p-3'>
                <h6 className='mb-0 text-white'>
                  Based on your energy, you are in{' '}
                  <strong>{energyTier.name}</strong> league.
                  <FontAwesomeIcon icon={faCrown} className='ms-3' />
                </h6>
              </div>
              <div className='p-3 text-secondary'>
                <p className='mb-0'>
                  This league gives you{' '}
                  <strong className='text-neutral-400'>
                    {getTicketsNumber(energyTier.tickets, geoCode)} Tickets
                  </strong>{' '}
                  in the MultiversX Launchpad Lottery.
                </p>
                {/* {tier.egldNextTier > 0 && (
                <p className="mt-3 mb-0">
                  <strong className="text-primary">
                    Stake {tier.egldNextTier} more EGLD
                  </strong>{" "}
                  to qualify for next tier
                </p>
              )} */}
              </div>
            </div>
          ) : (
            <div className='card project-announcement-card'>
              <div className='card-title'>
                <h6 className='mb-0'>
                  <FontAwesomeIcon icon={faBatteryBolt} className='icon' />
                  Energy Eligibility
                </h6>
                <AnnouncementModal
                  modalData={project?.announcement?.modal1}
                  geoCode={geoCode}
                  btnText='View Tiers'
                  className='btn btn-link-unstyled link'
                  modalClassName='tier-modal'
                />
              </div>
              <div className='card-body text-neutral-400 d-flex flex-nowrap'>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className='desciption-icon text-neutral-700'
                />
                <div>
                  <p>
                    Based on your <strong>xExchange energy league</strong>,
                    you’re not eligible to purchase tickets.
                  </p>
                  <p className='mb-2'>Increase your energy to qualify.</p>
                  <a
                    href='https://xexchange.com/'
                    className='btn btn-sm btn-neutral-700'
                    target='_blank'
                    aria-label='Telegram'
                    rel='noreferrer noopener nofollow'
                  >
                    Go to xExchange
                    <FontAwesomeIcon icon={faArrowUpRight} className='ms-2' />
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
