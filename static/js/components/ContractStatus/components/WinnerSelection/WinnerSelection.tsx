import React from 'react';
import { faTrophyAlt } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Countdown, CountdownStyle } from 'components';

export const WinnerSelection = (endDate: any) => {
  return (
    <div className='py-spacer px-3 text-center description'>
      <div className='icon-state medium bg-warning-opaque mx-auto mb-spacer'>
        <FontAwesomeIcon icon={faTrophyAlt} className='text-warning' />
      </div>
      <h5 className='text-center'>Winner selection in progress.</h5>
      <p>Winning tickets & remaining EGLD can be claimed in:</p>

      <div>
        <Countdown
          className={CountdownStyle.CONTRACT_STATUS}
          utcDate={endDate.endDate}
        />
      </div>
      <p className='text-neutral-400'> 🍀 Good luck!</p>
    </div>
  );
};
