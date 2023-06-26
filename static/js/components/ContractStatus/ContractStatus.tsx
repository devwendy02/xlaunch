import React, { useEffect, useState } from 'react';

import {
  useGetAccountInfo,
  useTrackTransactionStatus
} from '@multiversx/sdk-dapp/hooks';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  useNavigate,
  useLocation
  // RouteComponentProps,
} from 'react-router-dom';
import { ProjectAnnouncement, Loader } from 'components';
import { allProjects, ProjectsType } from 'config';
import { withRouter } from 'helpers/withRouter';
import { useApiRequests } from 'hooks';
import { refetchOriginSelector } from 'redux/selectors';
import { SnapshotCountdown } from './components/SnapshotCountdown';
import { UserBlacklisted } from './components/UserBlacklisted';
import { WinnersCountdown } from './components/WinnersCountdown';
import { WinnerSelection } from './components/WinnerSelection';
import { WinnersSelected } from './components/WinnersSelected';

const addedSeconds = 11;
export enum PhaseEnum {
  setup = 'setup',
  confirm = 'confirm',
  winnerSelection = 'winnerSelection',
  claim = 'claim'
}

enum ContractState {
  SNAPSHOT_COUNTDOWN = 'snapshotCountdown',
  WINNERS_COUNTDOWN = 'winnersCountdown',
  WINNERS_SELECTED = 'winnersSelected',
  WINNERS_SELECTION_IN_PROGRESS = 'winnersSelectionInProgress',
  USER_BLACKLISTED = 'userBlacklisted'
}

export const ContractStatusComponent = ({ projectData }: any) => {
  const [contractState, setContractState] = useState('');
  const [winnersCanClaim, setWinnersCanClaim] = useState(false);
  const { getChainStats, getContractStats } = useApiRequests();
  const [countdownDate, setCountdownDate] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);
  const [txSessionId, setTxSessionId] = useState<any>();

  const { getTicketsData, getMysteryBoxData, getFlagsData } = useApiRequests();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [ticketsInfo, setTicketsInfo] = useState<any>(null);
  const [mysteryBoxInfo, setMysteryBoxInfo] = useState<any>(null);
  const [flagsInfo, setFlagsInfo] = useState<any>(null);
  const refetch = useSelector(refetchOriginSelector);

  const currentProject: ProjectsType = pathname.split('/')[1] as ProjectsType;

  const project = allProjects.find((searchedProject) => {
    if (searchedProject.name === currentProject) {
      return searchedProject;
    }
  });

  const setTickets = async () => {
    if (!loggedIn || !project) return;
    const flags = await getFlagsData(project.name);
    const mysteryBox = await getMysteryBoxData(project.name);
    const tickets = await getTicketsData(project.name);

    if (flags.success) {
      setFlagsInfo(flags.data);
    }
    if (mysteryBox.success) {
      setMysteryBoxInfo(mysteryBox.data);
    }

    if (tickets.success) {
      setTicketsInfo(tickets.data);
      return { tickets: tickets.data, flags: flags.data };
    }
  };

  const transactionStatus = useTrackTransactionStatus({
    transactionId: txSessionId
  });

  useEffect(() => {
    setTxSessionId(localStorage.getItem('txSessionId'));
  }, []);

  useEffect(() => {
    if (transactionStatus && transactionStatus.isSuccessful && txSessionId) {
      setTickets();
      setTxSessionId(null);
      localStorage.removeItem('txSessionId');
    }
  }, [transactionStatus, txSessionId]);

  useEffect(() => {
    setDataFetched(false);
  }, [refetch]);

  useEffect(() => {
    if (new URLSearchParams(search).get('status') === 'success') {
      setDataFetched(false);
      navigate(`${pathname}`, { replace: true });
    }
  }, [search]);

  useEffect(() => {
    if (!dataFetched) {
      getContractState();
    }
  }, [contractState, dataFetched]);

  const getContractState = async () => {
    if (!loggedIn) {
      setDataFetched(true);
      return;
    }

    const ticketsData = await setTickets();

    const now = moment.utc();
    try {
      if (!project) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const chainStats = (await getChainStats()).data;

      const { currentPhase, secondsLeft } = (
        await getContractStats(project.name)
      ).data;

      setDataFetched(true);

      if (ticketsData?.tickets?.isUserBlacklisted) {
        setContractState(ContractState.USER_BLACKLISTED);
        return;
      }

      setCountdownDate(
        moment(now)
          .add(parseInt(secondsLeft) + addedSeconds, 'seconds')
          .toString()
      );

      //time until confirmation can start confirmationStartEpoch - users can only watch countdown and see the tier
      if (currentPhase === PhaseEnum.setup) {
        setContractState(ContractState.SNAPSHOT_COUNTDOWN);
        return;
      }

      //time until the winners are slected winnerSelectionStartEpoch - users can confirm tickets
      if (currentPhase === PhaseEnum.confirm) {
        setContractState(ContractState.WINNERS_COUNTDOWN);
        return;
      }

      if (currentPhase === PhaseEnum.winnerSelection) {
        setContractState(ContractState.WINNERS_SELECTION_IN_PROGRESS);
        return;
      }

      if (currentPhase === PhaseEnum.claim && secondsLeft !== 0) {
        setContractState(ContractState.WINNERS_SELECTED);
        return;
      } else {
        setContractState(ContractState.WINNERS_SELECTED);
        setWinnersCanClaim(true);
        return;
      }
    } catch (error) {
      setDataFetched(true);
    }
  };

  if (!dataFetched)
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <Loader noText={true} />
      </div>
    );

  switch (contractState) {
    case ContractState.SNAPSHOT_COUNTDOWN:
      return <SnapshotCountdown endDate={countdownDate} project={project} />;

    case ContractState.WINNERS_SELECTION_IN_PROGRESS:
      return <WinnerSelection endDate={countdownDate} />;

    case ContractState.WINNERS_COUNTDOWN:
      return (
        <WinnersCountdown
          setTxSessionId={setTxSessionId}
          ticketsData={ticketsInfo}
          endDate={countdownDate}
        />
      );

    case ContractState.WINNERS_SELECTED:
      return (
        <WinnersSelected
          setTxSessionId={setTxSessionId}
          ticketsData={ticketsInfo}
          mysteryBoxData={mysteryBoxInfo}
          canClaim={winnersCanClaim}
          endDate={countdownDate}
          hasMysteryBox={flagsInfo.hasMysteryBox}
        />
      );

    case ContractState.USER_BLACKLISTED:
      return <UserBlacklisted />;

    default:
      return <ProjectAnnouncement project={projectData} />;
  }
};

export const ContractStatus = withRouter(ContractStatusComponent);
