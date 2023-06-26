import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as BlueTicket } from './assets/blue_ticket.svg';
import { ReactComponent as DefaultTicket } from './assets/default_ticket.svg';
import { ReactComponent as GreenTicket } from './assets/green_ticket.svg';
import { ReactComponent as LightBlueTicket } from './assets/light_blue_ticket.svg';

export const Ticket = ({
  ticketId,
  selected,
  isBought,
  isWinner,
  icon,
  isGuaranteed
}: {
  ticketId: string;
  selected: boolean;
  isBought?: boolean;
  isWinner?: boolean;
  icon?: any;
  isGuaranteed?: boolean;
}) => {
  return (
    <div
      style={{
        position: 'relative',
        cursor: isBought || ticketId === 'Free' ? '' : 'pointer'
      }}
    >
      {ticketId === 'Free' ? (
        <div
          style={{
            padding: '3px',
            background: 'rgb(31, 161, 112, 0.1)',
            borderRadius: '5px',
            color: '#1FA170'
          }}
        >
          <div
            style={{
              position: 'absolute',
              fontSize: '13px',
              top: '50%',
              left: '30px',
              transform: 'translateX(-50%) translateY(-50%)',
              fontWeight: 'bold',
              color: `${isBought ? '#fff' : '#1FA170'}`
            }}
          >
            {icon && (
              <>
                <FontAwesomeIcon icon={icon} />
              </>
            )}
          </div>
          {isBought ? <GreenTicket /> : <DefaultTicket />}
          &nbsp;{ticketId}! &nbsp;
        </div>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              fontSize: '13px',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              fontWeight: 'bold',
              //color of the number
              color: `${
                isBought
                  ? '#fff'
                  : selected
                  ? '#F2542D'
                  : isGuaranteed
                  ? '#1FA170'
                  : '#748092'
              }`
            }}
          >
            {ticketId}
            {isGuaranteed && (
              <>
                <span style={{ color: isBought ? '#fff' : '#1FA170' }}>*</span>
              </>
            )}
          </div>
          {isBought ? (
            <>{isGuaranteed || isWinner ? <GreenTicket /> : <BlueTicket />}</>
          ) : selected ? (
            <LightBlueTicket />
          ) : (
            <DefaultTicket />
          )}
        </>
      )}
    </div>
  );
};
