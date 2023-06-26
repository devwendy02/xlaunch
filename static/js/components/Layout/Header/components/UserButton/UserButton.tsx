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

import { impersonateAddressSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { LogoutButton } from '../../components/LogoutButton';

export const UserButton = (props: WithClassnameType) => {
  const { address } = useGetAccountInfo();
  const impersonatedAddress = useSelector(impersonateAddressSelector);
  const canImpersonate = services.impersonate.getHasImpersonateRights(address);

  const { className } = props;

  if (!address) {
    return null;
  }

  return (
    <div className={classNames('user-button', 'btn-group', className)}>
      {canImpersonate ? (
        <Link
          to={routeNames.account}
          className={classNames('btn', 'btn-dark', 'btn-account')}
        >
          <FontAwesomeIcon icon={faUserCircle} />
        </Link>
      ) : (
        <></>
      )}
      <Trim
        text={impersonatedAddress ?? address}
        className={`btn btn-dark user-button-trim ${
          impersonatedAddress ? 'text-success' : ''
        }`}
      />

      <LogoutButton className='btn btn-dark user-button-logout align-items-center justify-content-center' />
    </div>
  );
};
