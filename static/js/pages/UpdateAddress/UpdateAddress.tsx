import React, { useEffect } from 'react';
import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { useRefreshAccount } from '@multiversx/sdk-dapp-kyc';
import { KYC_ROUTES } from '@multiversx/sdk-dapp-kyc/constantsCollection';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { StepperPageState } from 'components';
import { useApiRequests } from 'hooks/useApiRequests';
import { Unlock } from 'pages/Unlock';

export const UpdateAddress = () => {
  const { address } = useGetAccountInfo();
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();
  const token = localStorage.getItem('updateAddressToken');
  const { refreshAccount } = useRefreshAccount();
  let tokenPayload: any;
  if (token) {
    tokenPayload = jwtDecode(token);
  }

  useEffect(() => {
    if (
      isLoggedIn &&
      token &&
      tokenPayload &&
      tokenLogin?.nativeAuthToken &&
      address !== tokenPayload.address
    ) {
      localStorage.removeItem('updateAddressToken');
      changeAddress(token);
    }
  }, [isLoggedIn, tokenLogin?.nativeAuthToken]);

  const { updateAccountAddress } = useApiRequests();
  const navigate = useNavigate();

  const changeAddress = async (newToken: string) => {
    const result = await updateAccountAddress(newToken);

    if (result.success) {
      refreshAccount();
      return;
    }
  };

  if (!isLoggedIn && tokenPayload) {
    return (
      <div className='kyc-card'>
        <div className='card card-black'>
          <StepperPageState
            currentStep={3}
            totalSteps={5}
            iconClass='text-success'
            iconBgClass='icon-state medium bg-success-opaque'
            title='Change wallet address'
            subTitle='Connect with the new wallet.'
            action={
              <>
                <div>
                  <Unlock plainForm={true} tutorialInfo={true} />
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className='kyc-card'>
      <div className='card card-black'>
        <StepperPageState
          currentStep={4}
          totalSteps={5}
          iconClass='text-success'
          iconBgClass='icon-state medium bg-success-opaque'
          title='Change wallet address'
          subTitle='Identity confirmation'
          action={
            <>
              <div className='mb-spacer'>
                Proceed with the video identification to complete your wallet
                address change request.
              </div>
              <div className='d-flex'>
                <button
                  className='btn btn-primary mx-auto'
                  onClick={() => {
                    navigate(KYC_ROUTES.identityVerification.path);
                  }}
                >
                  Confirm Identity
                </button>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};
