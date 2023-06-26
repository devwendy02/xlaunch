import React from 'react';

import { Countdown, CountdownStyle, SignupStatus } from 'components';
import { kycEnd } from 'config';

export const SnapshotCountdown = ({
  endDate,
  project
}: {
  endDate: string;
  project?: any;
}) => {
  return (
    <div className='snapshot-countdown text-center text-secondary pt-spacer px-spacer'>
      <div className='pb-2'>
        <h5 className='mb-0'>
          Contract setup in progress. <br /> <br />
        </h5>
        <div>
          Users with verified KYC will be able to purchase lottery tickets in:
        </div>
        <Countdown
          className={CountdownStyle.CONTRACT_STATUS}
          utcDate={endDate}
        />

        {!kycEnd && <SignupStatus project={project} />}
      </div>
    </div>
  );
};
