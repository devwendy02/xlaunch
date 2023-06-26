import * as React from 'react';
import {
  faArrowRight,
  faWarning,
  faCheck,
  faCircleXmark,
  faFileCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { faHourglassClock } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useKycAccount } from '@multiversx/sdk-dapp-kyc';
import {
  KycStatusStringEnum,
  KYC_ROUTES
} from '@multiversx/sdk-dapp-kyc/constantsCollection';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ProceedKycBtn, Countdown, CountdownStyle } from 'components';
import { kycEnd } from 'config';
import { susAccounts } from 'susRejected';
import { SignupStatusCard } from './components/SignupStatusCard';

export const SignupStatus = ({ project }: { project?: any }): any => {
  const [isAccountSuspicious, setIsAccountSuspicious] = React.useState(false);
  const { address } = useGetAccountInfo();
  const navigate = useNavigate();
  React.useEffect(() => {
    for (const susAccount of susAccounts) {
      if (susAccount.address === address) {
        setIsAccountSuspicious(true);
        return;
      }
    }
  }, [address]);

  const { kycAccount, kycStatusStr } = useKycAccount();

  switch (kycStatusStr) {
    case KycStatusStringEnum.notStarted:
      return (
        <SignupStatusCard
          project={project}
          title='Not Started'
          description='You must complete the entire KYC process in order to participate
              in this launchpad lottery.'
          icon={faWarning}
          iconClassName='text-amber-500'
        >
          {!kycEnd && <ProceedKycBtn className='mt-3' />}
        </SignupStatusCard>
      );
    case KycStatusStringEnum.inProgress:
      return (
        <SignupStatusCard
          project={project}
          title='Not Completed'
          description='You must complete the entire KYC process in order to participate
              in this launchpad lottery.'
          icon={faWarning}
          iconClassName='text-amber-500'
        >
          {!kycEnd && <ProceedKycBtn className='mt-3' />}
        </SignupStatusCard>
      );
    case KycStatusStringEnum.awaitVerification:
      return (
        <SignupStatusCard
          project={project}
          title='Awaitning Verification'
          description='User actions complete, provider verification can take up to 72
              hours!'
          icon={faFileCircleCheck}
          iconClassName='text-success'
        />
      );
    case KycStatusStringEnum.rejected:
      return (
        <SignupStatusCard
          project={project}
          title='Rejected'
          description='You must complete the entire KYC process in order to participate
              in this launchpad lottery.'
          icon={faCircleXmark}
          iconClassName='text-danger'
        >
          {!kycEnd && <ProceedKycBtn className='mt-3' />}
        </SignupStatusCard>
      );
    case KycStatusStringEnum.finalRejected:
      return (
        <SignupStatusCard
          project={project}
          title='Rejected'
          description='Not able to re-submit'
          icon={faCircleXmark}
          iconClassName='text-danger'
        />
      );

    case KycStatusStringEnum.validated: {
      if (isAccountSuspicious) {
        return (
          <SignupStatusCard
            project={project}
            title='Rejected'
            description='Account rejected due to suspicious activity'
            icon={faCircleXmark}
            iconClassName='text-danger'
          />
        );
      }

      return (
        <SignupStatusCard
          project={project}
          title={<span className='text-success'>KYC Completed</span>}
          icon={faCheck}
          iconClassName='text-success small-top'
        />
      );
    }

    case KycStatusStringEnum.identityValidationRequired ||
      KycStatusStringEnum.awaitVerification:
      const cooldown = kycAccount.kycInfo?.identityValidationCooldownInSeconds;
      return (
        <SignupStatusCard
          project={project}
          title={
            Boolean(cooldown)
              ? 'Identity Validation Cooldown'
              : 'Identity Validation Required'
          }
          description={
            Boolean(cooldown)
              ? 'Verify your identity to complete the KYC process once the timer ends'
              : 'Verify your identity to complete the KYC process'
          }
          icon={faHourglassClock}
          iconClassName='text-amber-500'
        >
          {Boolean(cooldown) && (
            <Countdown
              utcDate={moment.utc().add(cooldown, 'seconds').toString()}
              className={CountdownStyle.IDENTITY_VERIFICATION}
            ></Countdown>
          )}
          {!kycEnd && (
            <Button
              disabled={Boolean(
                kycAccount.kycInfo?.identityValidationCooldownInSeconds
              )}
              onClick={() => {
                navigate(KYC_ROUTES.identityVerification.path);
              }}
              variant='primary'
              size='sm'
              className='mt-3'
            >
              Confirm Identity{' '}
              <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
            </Button>
          )}
        </SignupStatusCard>
      );

    case KycStatusStringEnum.identityValidationInProgress:
      return (
        <SignupStatusCard
          project={project}
          title='Identity Validation In Progress'
          icon={faHourglassClock}
          iconClassName='text-amber-500'
        />
      );

    default: {
      return null;
    }
  }
};
