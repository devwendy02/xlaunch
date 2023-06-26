import React, { useEffect, useState } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useGetActiveTransactionsStatus,
  useGetAccountInfo
} from '@multiversx/sdk-dapp/hooks';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useKycAccount } from '@multiversx/sdk-dapp-kyc';
import { KycStatusStringEnum } from '@multiversx/sdk-dapp-kyc/constantsCollection';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ClaimModal, Countdown, CountdownStyle } from 'components';
import { useGetTier } from 'components/ContractStatus/helpers/useGetTiers';
import { TierType } from 'config';
import { updateRefetch } from 'redux/slices';
import { susAccounts } from 'susRejected';

export const WinnersCountdown = ({
  endDate,
  ticketsData,
  setTxSessionId
}: {
  endDate: string;
  ticketsData: any;
  setTxSessionId: (sessionId: SendTransactionReturnType) => void;
}) => {
  const [tier, setTier] = useState<TierType>();
  const [showModal, setShowModal] = React.useState(false);
  const { getTierByStakedAmoutn } = useGetTier();
  const [claimDisabled, setClaimDisabled] = useState(false);
  const dispatch = useDispatch();
  const [isAccountSuspicious, setIsAccountSuspicious] = React.useState(false);
  const { address } = useGetAccountInfo();
  const { kycStatusStr } = useKycAccount();
  React.useEffect(() => {
    for (const susAccount of susAccounts) {
      if (susAccount.address === address) {
        setIsAccountSuspicious(true);
        return;
      }
    }
  }, [address]);

  useEffect(() => {
    getTierData();
  }, [ticketsData]);

  const activeTransactions = useGetActiveTransactionsStatus();

  const [shouldRefetch, setShouldRefetch] = useState(false);
  useEffect(() => {
    if (activeTransactions) {
      if (shouldRefetch && !activeTransactions.pending) {
        setTimeout(() => {
          dispatch(updateRefetch());
        }, 1500);
        setShouldRefetch(false);
      }
      setClaimDisabled(activeTransactions.pending);
    }
  }, [activeTransactions]);

  useEffect(() => {
    if (activeTransactions?.pending) {
      setShouldRefetch(true);
    }
  });

  const getTierData = async () => {
    const tierStaked = await getTierByStakedAmoutn();
    setTier(tierStaked);
  };

  const getTicketEntriesIds = (ticketEntries: Array<string>): Array<string> => {
    const tickets: Array<string> = [];
    if (!ticketEntries[0] || !ticketEntries[ticketEntries.length - 1])
      return [];
    let from = parseInt(ticketEntries[0]);
    const to = parseInt(ticketEntries[ticketEntries.length - 1]);
    for (from; from <= to; from++) {
      tickets.push(from.toString());
    }
    return tickets;
  };

  const getUnconfirmedTickets = (
    ticketEntries: Array<string>
  ): Array<string> => {
    const resp = getTicketEntriesIds(ticketEntries);

    if (!ticketsData?.numConfirmedTickets) ticketsData.numConfirmedTickets = 0;

    return resp.splice(
      0,
      resp.length - parseInt(ticketsData.numConfirmedTickets)
    );
  };

  return (
    <div className='winners-countdown text-center text-secondary p-spacer'>
      <div className='pb-2'>
        <h5 className='mb-3'>Buying tickets ends in: </h5>
        <Countdown
          className={CountdownStyle.CONTRACT_STATUS}
          utcDate={endDate}
        />
      </div>

      {tier && kycStatusStr === KycStatusStringEnum.validated && (
        <>
          <div className='border-top pt-spacer mx-nspacer'></div>
          <div className='pb-spacer'>
            <h6 className='mb-spacer'>
              You qualify for{' '}
              <strong>
                {tier.number}
                {tier.suffix} tier
              </strong>
            </h6>
            <p className='mb-0 small'>
              <strong className='text-dark'>
                {tier.number}
                {tier.suffix} tier
              </strong>{' '}
              gives{' '}
              <strong className='text-dark'>
                {ticketsData.ticketEntries.length} tickets
              </strong>{' '}
              in the MultiversX Launchpad Lottery.
            </p>
          </div>
        </>
      )}

      {ticketsData && (
        <div className='mt-spacer'>
          {ticketsData.ticketEntries.length === 0 ? (
            <>
              <div className='icon-state medium bg-danger-opaque mx-auto '>
                <FontAwesomeIcon icon={faTimesCircle} className='text-danger' />
              </div>
              <h5 className='mb-0 '>
                You are not eligible to buy tickets.{' '}
                {kycStatusStr === KycStatusStringEnum.validated ? (
                  <>
                    {isAccountSuspicious ? (
                      <>Account rejected due to suspicious activity</>
                    ) : (
                      <>
                        <br />
                        You did not have staked EGLD when the snapshot was done.
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <br />
                    Your KYC was not accepted.
                  </>
                )}
              </h5>
            </>
          ) : (
            <>
              {ticketsData.numConfirmedTickets !== 0 && (
                <div className='text-start'>
                  <h6 className='mb-0 small'>
                    You have purchased{' '}
                    <strong>{ticketsData.numConfirmedTickets}</strong> out of{' '}
                    {getTicketEntriesIds(ticketsData.ticketEntries).length} ASH
                    token tickets.
                  </h6>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {ticketsData &&
        ticketsData.ticketEntries.length !== 0 &&
        parseInt(ticketsData.numConfirmedTickets) <
          getTicketEntriesIds(ticketsData.ticketEntries).length &&
        ticketsData.ticketEntries.length !== 0 && (
          <>
            <Button
              variant='primary'
              size='lg'
              disabled={claimDisabled}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Participate Now
            </Button>
          </>
        )}

      {showModal && ticketsData && (
        <ClaimModal
          showModal={showModal}
          setTxSessionId={setTxSessionId}
          winningTicketsIds={getUnconfirmedTickets(ticketsData.ticketEntries)}
          ticketsStatus={ticketsData.status}
          numConfirmedTickets={ticketsData.numConfirmedTickets}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};
