import React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { services } from '@multiversx/sdk-dapp-internal';
import { useKycAccount } from '@multiversx/sdk-dapp-kyc';
import { KycStatusStringEnum } from '@multiversx/sdk-dapp-kyc/constantsCollection';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { CopyButton, SignupStatus } from 'components';
import { kycEnd } from 'config';
import { useLogout } from 'hooks';
import { impersonateAddressSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { ChangeAddressBtn } from './components/ChangeAddressBtn';
import { ImpersonateForm } from './components/ImpersonateForm';

export const Account = () => {
  const { address } = useGetAccountInfo();
  const logout = useLogout();
  const loggedIn = Boolean(address);
  const canImpersonate = services.impersonate.getHasImpersonateRights(address);
  const impersonatedAddress = useSelector(impersonateAddressSelector);

  const { kycAccount, kycStatusStr } = useKycAccount();
  const onDisconnectClick = () => {
    logout(`${window.location.origin}${routeNames.home}`, routeNames.home);
  };

  if (!loggedIn) {
    return <Navigate to={routeNames.unlock} />;
  }

  return (
    <div className='account'>
      <div className='d-flex flex-wrap justify-content-between mb-2'>
        <label className='text-secondary mb-0'>Your wallet</label>
      </div>

      <div className='address-holder-container d-flex flex-row justify-content-between align-items-center border rounded px-3 py-2 mb-spacer'>
        <div className='address-holder trim-fs-sm text-primary'>
          <Trim
            text={impersonatedAddress ?? address}
            className={impersonatedAddress ? 'text-success' : ''}
          />
        </div>
        <div className='border-start ms-3 ps-3 text-secondary'>
          <CopyButton
            text={impersonatedAddress ?? address}
            className='align-end-flex'
          />
        </div>
      </div>
      {loggedIn && !kycEnd && <SignupStatus />}
      {canImpersonate ? (
        <div className='mt-4'>
          <ImpersonateForm />
        </div>
      ) : null}

      <div className='border-top mx-n4 pt-3 mt-5'>
        <div className='d-flex flex-wrap flex-sm-nowrap justify-content-between mx-4'>
          {loggedIn &&
          !kycEnd &&
          kycAccount &&
          kycAccount.email &&
          kycAccount.emailConfirmed &&
          kycStatusStr === KycStatusStringEnum.validated ? (
            <>
              <ChangeAddressBtn />
              <div className='w-50 p-1'>
                <button
                  className='btn btn-sm btn-primary d-flex mx-auto mt-3'
                  onClick={onDisconnectClick}
                >
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <div className='w-100 p-1'>
              <button
                className='btn btn-sm btn-primary d-flex mx-auto mt-3'
                onClick={onDisconnectClick}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
