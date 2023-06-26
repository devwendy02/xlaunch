import React, { useEffect, useState } from 'react';
import {
  faExclamationTriangle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useChangeAddress } from '@multiversx/sdk-dapp-kyc';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { PageState, StepperPageState } from 'components';
import { routeNames } from 'routes';

const RETRY_TIMEOUT = 60;

export const UpdateAddressEmail = () => {
  const { initChangeAddress } = useChangeAddress();
  const [emailSent, SetEmailSent] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [retryDisabled, setRetrydDisabled] = useState(false);
  const [retryDisabledSecondsLeft, setRetryDisabledSecondsLeft] = useState(0);

  const changeAddressClicked = async () => {
    const targetTime = moment.utc().add(RETRY_TIMEOUT, 'seconds');
    localStorage.setItem(
      'retryAddressChangeDisabledExpiration',
      targetTime.toString()
    );

    try {
      await initChangeAddress();
      SetEmailSent(true);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (retryDisabledSecondsLeft >= 0) {
      const now = moment.utc();
      const targetTime = moment.utc(
        localStorage.getItem('retryAddressChangeDisabledExpiration')
      );
      const secondsLeft = targetTime.diff(now, 'seconds').toString();
      if (parseInt(secondsLeft) > 0) {
        setRetrydDisabled(true);
        setTimeout(() => {
          setRetryDisabledSecondsLeft(parseInt(secondsLeft) - 1);
        }, 1000);
      } else {
        setRetrydDisabled(false);
      }
    }
  });

  if (retryDisabled || emailSent) {
    return (
      <div className='kyc-card'>
        <div className='card card-black'>
          <StepperPageState
            icon={faEnvelope as any}
            currentStep={2}
            totalSteps={5}
            iconClass='text-primary'
            iconBgClass='icon-state medium bg-primary-opaque'
            title='Change wallet address'
            subTitle='Change wallet address email confirmation'
            action={
              <>
                <div className='mb-spacer'>
                  Click the confirmation link you received in the email address
                  used when you created your account.
                </div>
                <div className='d-flex gap-3'>
                  <button
                    disabled={retryDisabled}
                    className='btn btn-dark flex-fill w-100'
                    onClick={() => {
                      changeAddressClicked();
                    }}
                  >
                    Resend Mail{' '}
                    {retryDisabledSecondsLeft !== 0 &&
                      `( ${moment
                        .utc(
                          moment
                            .duration(retryDisabledSecondsLeft, 'seconds')
                            .asMilliseconds()
                        )
                        .format('mm:ss')} )`}
                  </button>
                  <button
                    className='btn btn-primary flex-fill w-100'
                    onClick={() => {
                      navigate(routeNames.home);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <PageState
        icon={faTimes as any}
        iconClass='text-danger'
        iconBgClass='icon-state medium bg-danger-opaque'
        title='Something went wrong'
        description='Something went wrong, please try again later.'
      />
    );
  }

  return (
    <div className='kyc-card'>
      <div className='card card-black'>
        <StepperPageState
          icon={faExclamationTriangle as any}
          currentStep={1}
          totalSteps={5}
          iconClass='text-warning'
          iconBgClass='icon-state medium bg-warning-opaque'
          title='Change wallet address'
          subTitle='Before you begin please note:'
          action={
            <>
              <div className='mb-spacer'>
                <p>
                  A video identification will be performed in order to allow for
                  the address change.
                </p>
                <p className='mb-0'>
                  Also, once the change address process is started there is no
                  way to cancel or undo the wallet change.
                </p>
              </div>
              <div className='d-flex gap-3'>
                <button
                  className='btn btn-dark flex-fill w-100'
                  onClick={() => {
                    navigate(routeNames.home);
                  }}
                >
                  Back
                </button>
                <button
                  className='btn btn-primary flex-fill w-100'
                  onClick={changeAddressClicked}
                >
                  Continue
                </button>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};
