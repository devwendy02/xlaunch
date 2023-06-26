import React from 'react';
import {
  faLock,
  faArrowUpRight,
  faCircleInfo
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

import { ReactComponent as EgldSmallLogo } from 'assets/images/logos/egld-small.svg';
import { TierType } from 'config';
import { getTicketsNumber } from 'helpers';
import { AnnouncementModal } from '../AnnouncementModal';

export const Tier = ({
  project,
  geoCode,
  tier
}: {
  project: any;
  geoCode: string;
  tier?: TierType;
}) => {
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);

  return (
    <>
      {loggedIn && (
        <div className='card project-announcement-card'>
          <div className='card-title'>
            <h6 className='mb-0'>
              <FontAwesomeIcon icon={faLock} className='icon' />
              Staking Eligibility
            </h6>
            <AnnouncementModal
              modalData={project?.announcement?.modal}
              geoCode={geoCode}
              btnText='View Tiers'
              className='btn btn-link-unstyled link'
              modalClassName='tier-modal'
            />
          </div>

          {tier ? (
            <div className='staking-tiers-wrapper'>
              <div className='staking-tier'>
                <div className='staking-column'>
                  <div className='tier-text'>Your Staking Tier</div>
                  <div className='tier-value'>Tier {tier.number}</div>
                </div>
                <div className='staking-column'>
                  <div className='ticket-value'>
                    {getTicketsNumber(tier.tickets, geoCode)}
                  </div>
                  <div className='ticket-text'>tickets</div>
                </div>
              </div>
              <div className='tiers-footer'>
                {/* <p className='mb-2 text-neutral-400'>
                  Stake at least <EgldSmallLogo className='egld-small-logo' />
                  <strong>{tier.egldNextTier} EGLD</strong> to qualify for next
                  tier
                </p> */}
                <a
                  href='https://wallet.multiversx.com/'
                  className='btn btn-sm btn-neutral-700'
                  target='_blank'
                  aria-label='Telegram'
                  rel='noreferrer noopener nofollow'
                >
                  How to stake EGLD
                  <FontAwesomeIcon icon={faArrowUpRight} className='ms-2' />
                </a>
              </div>
            </div>
          ) : (
            <div className='card-body text-neutral-400 d-flex flex-nowrap'>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className='desciption-icon text-neutral-700'
              />
              <div>
                <p>
                  Based on your <strong>staked EGLD amount</strong>, you’re not
                  eligible to purchase tickets.
                </p>
                <p className='mb-2'>Stake at least 1 EGLD to qualify.</p>
                <a
                  href='https://wallet.multiversx.com/'
                  className='btn btn-sm btn-neutral-700'
                  target='_blank'
                  aria-label='Telegram'
                  rel='noreferrer noopener nofollow'
                >
                  How to stake EGLD
                  <FontAwesomeIcon icon={faArrowUpRight} className='ms-2' />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
