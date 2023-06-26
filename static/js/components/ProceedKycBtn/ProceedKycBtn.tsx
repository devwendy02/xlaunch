import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { kycEnd } from 'config';
// import { routeNames } from "routes";

export const ProceedKycBtn = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const startKYC = async () => {
    navigate('/kyc-section');
  };

  return (
    <>
      {!kycEnd && (
        <Button
          onClick={startKYC}
          variant='primary'
          size='sm'
          className={className ?? ''}
        >
          Proceed with KYC
          <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
        </Button>
      )}
    </>
  );
};
