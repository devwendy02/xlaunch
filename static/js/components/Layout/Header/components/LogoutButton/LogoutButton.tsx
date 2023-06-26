import React from 'react';
import {
  faArrowRightFromBracket,
  faPowerOff
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import classNames from 'classnames';

import { useLogout } from 'hooks';
import { routeNames } from 'routes';

export interface LogoutButtonPropsType {
  className?: string;
  withText?: boolean;
}

export const LogoutButton = ({
  className,
  withText
}: LogoutButtonPropsType) => {
  const { address } = useGetAccountInfo();
  const logout = useLogout();

  const onDisconnectClick = () => {
    logout(`${window.location.origin}${routeNames.home}`, routeNames.home);
  };

  if (!address) {
    return null;
  }

  if (withText) {
    return (
      <button
        type='button'
        onClick={onDisconnectClick}
        className={classNames('btn', 'btn-dark', className)}
      >
        Disconnect
        <FontAwesomeIcon
          className='ms-2'
          icon={faArrowRightFromBracket}
        ></FontAwesomeIcon>
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={onDisconnectClick}
      className={className ?? classNames('p-0', 'd-flex', 'btn-unstyled')}
    >
      <FontAwesomeIcon icon={faPowerOff} />
    </button>
  );
};
