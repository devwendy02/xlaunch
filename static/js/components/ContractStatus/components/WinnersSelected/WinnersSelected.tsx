import React, { useEffect, useState } from 'react';
import { faTrophyAlt, faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { Button } from 'react-bootstrap';

import { Countdown, CountdownStyle } from 'components';
import { allProjects, ProjectsType } from 'config';
import { useApiRequests } from 'hooks';

import LooserMysteryBoxIcon from './assets/looser_mystery_box.svg';
import LooserTicketsIcon from './assets/looser_tickets.svg';
import WinnerMysteryBoxIcon from './assets/winner_mystery_box.svg';
import { Tickets } from '../Tickets';

export const WinnersSelected = ({
  endDate,
  canClaim,
  ticketsData,
  mysteryBoxData,
  setTxSessionId,
  hasMysteryBox
}: {
  endDate: string;
  canClaim: boolean;
  ticketsData: any;
  mysteryBoxData: any;
  setTxSessionId: (sessionId: SendTransactionReturnType) => void;
  hasMysteryBox: boolean;
}) => {
  const currentProject: ProjectsType = location.pathname.split(
    '/'
  )[1] as ProjectsType;

  const { getClaimTicketsTx } = useApiRequests();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const project = allProjects.find((searchedProject) => {
    if (searchedProject.name === currentProject) {
      return searchedProject;
    }
  });

  const [claimDisabled, setClaimDisabled] = useState(false);

  const activeTransactions = useGetActiveTransactionsStatus();

  useEffect(() => {
    if (activeTransactions) {
      setClaimDisabled(activeTransactions.pending);
    }
  }, [activeTransactions]);

  const claimTicketTransaction = async () => {
    const claimTx: any = await getClaimTicketsTx(currentProject);
    const { value, data, receiver, gasLimit } = claimTx.data;
    if (!claimTx) {
      return;
    }
    setClaimDisabled(true);
    const claimTransaction = {
      value,
      data,
      receiver,
      gasLimit
    };
    await refreshAccount();
    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claim tokens transaction',
        errorMessage: 'An error has occured during claim tokens',
        successMessage: 'Claim tokens transaction successful',
        transactionDuration: 10000
      }
    });
    setTxSessionId(sessionId);
    if (sessionId) localStorage.setItem('txSessionId', sessionId);
  };

  if (ticketsData?.hasUserClaimedTokens)
    return (
      <div className='p-spacer'>
        <div className='icon-state medium bg-success-opaque mx-auto mb-spacer'>
          <FontAwesomeIcon icon={faCheck} className='text-success' />
        </div>
        <h5 className='mb-0 text-center'>
          You have claimed your tokens. Check your wallet!
        </h5>
      </div>
    );

  return (
    <>
      <div className='winners-selected text-center text-secondary p-spacer'>
        {ticketsData && ticketsData.winningTicketsIds.length !== 0 ? (
          <div>
            <div className='icon-state medium bg-warning-opaque mb-3 mx-auto  mt-0'>
              <FontAwesomeIcon icon={faTrophyAlt} className='text-warning' />
            </div>
            <h5 className='mb-0'>Congratulations, You Won!</h5>
          </div>
        ) : (
          <div>
            <div className='icon-state medium mx-auto mt-0 mb-4'>
              <img src={LooserTicketsIcon} />
            </div>
            <h5 className='mb-0'>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {ticketsData.ticketEntries.length !== 0 ? (
                <>You didn&apos;t win any tickets. Better luck next time!</>
              ) : (
                'You have not bought any tickets.'
              )}
            </h5>
          </div>
        )}

        {ticketsData.ticketEntries.length !== 0 && (
          <div className='mt-spacer w-100 d-flex mb-3 justify-content-between'>
            <div className='w-50 d-flex'>
              <div className='d-flex flex-column h-100  justify-content-center'>
                <div
                  style={{ width: '10px', height: '10px', borderRadius: '50%' }}
                  className='bg-primary'
                ></div>
              </div>
              &nbsp; Bought tickets
            </div>

            <div className='w-50 d-flex'>
              <div className='d-flex ms-2 flex-column h-100 justify-content-center'>
                <div
                  style={{ width: '10px', height: '10px', borderRadius: '50%' }}
                  className='bg-success'
                ></div>
              </div>
              &nbsp; Winning tickets
            </div>
          </div>
        )}

        <Tickets />
        {hasMysteryBox && (
          <>
            {mysteryBoxData && mysteryBoxData.hasWonNft ? (
              <div className='mt-spacer shadow-sm rounded border p-4'>
                <div>
                  <img src={WinnerMysteryBoxIcon} />
                </div>
                <div>
                  <h5 className='mb-0 mt-spacer'>
                    You also won a Mystery Box Ticket
                  </h5>
                </div>
              </div>
            ) : (
              <>
                {mysteryBoxData && mysteryBoxData?.hasConfirmedNft ? (
                  <div className='mt-spacer shadow-sm rounded border p-4'>
                    <div>
                      <img src={LooserMysteryBoxIcon} />
                    </div>
                    <div>
                      <h5 className='mb-0 mt-spacer'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Unfortunately, you didn't win the Mystery Box Ticket.
                      </h5>
                    </div>
                  </div>
                ) : (
                  <div className='mt-spacer shadow-sm rounded border p-4'>
                    <div>
                      <img src={LooserMysteryBoxIcon} />
                    </div>
                    <div>
                      <h5 className='mb-0 mt-spacer'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        You didn't buy the Mystery Box Ticket.
                      </h5>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {ticketsData &&
          (ticketsData.winningTicketsIds.length !== 0 ||
            ticketsData.ticketEntries.length > 0) && (
            <>
              <div className='border-top mt-spacer pt-spacer mx-nspacer'></div>
              <div className='pb-2'>
                {canClaim ? (
                  <Button
                    variant='primary'
                    disabled={claimDisabled}
                    size='lg'
                    onClick={() => {
                      claimTicketTransaction();
                    }}
                  >
                    Claim Tokens
                  </Button>
                ) : (
                  <>
                    <h5 className='mb-0'>Claim tokens in: </h5>
                    <Countdown
                      className={CountdownStyle.CONTRACT_STATUS}
                      utcDate={endDate}
                    />
                  </>
                )}
              </div>
            </>
          )}
      </div>
    </>
  );
};
