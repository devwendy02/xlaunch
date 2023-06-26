import React from 'react';
import { faUserCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Trim } from '@multiversx/sdk-dapp/UI/Trim';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import { services } from '@multiversx/sdk-dapp-internal';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CopyButton, Overlay } from 'components';
import { impersonateAddressSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { LogoutButton } from '../../components/LogoutButton';

export const UserAddress = (props: WithClassnameType) => {
  const { address } = useGetAccountInfo();
  const impersonatedAddress = useSelector(impersonateAddressSelector);
  const canImpersonate = services.impersonate.getHasImpersonateRights(address);

  const { className } = props;

  if (!address) {
    return null;
  }

  return (
    <div className={classNames('header-user-address', className)}>
      {canImpersonate && (
        <div className={classNames('header-user-account', 'header-account')}>
          <Link to={routeNames.account}>
            <FontAwesomeIcon icon={faUserCircle} />
          </Link>
        </div>
      )}

      <Trim
        text={impersonatedAddress ?? address}
        className={`header-user-address-trim ${
          impersonatedAddress ? 'text-success' : ''
        }`}
      />

      <CopyButton
        className={classNames('header-user-address-icon', 'header-copy')}
        text={impersonatedAddress ?? address}
      />

      <Overlay
        title='Disconnect'
        placement='bottom'
        className={classNames('header-user-address-icon', 'header-logout')}
      >
        <LogoutButton />
      </Overlay>
    </div>
  );
};
