import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { NetworkType } from '@multiversx/sdk-dapp/types';
import moment from 'moment';
import { allApps } from './sharedConfig';

export * from './sharedConfig';
export const environment = 'mainnet';

export const launchpadApiAddress = 'https://api.xlaunchpad.com';
export const kycServiceApi = 'https://tools.multiversx.com/kyc-new';
export const strapiCMSAddress = '';
export const mediaAddress = 'https://media.xlaunchpad.com';
export const geoCodeApi = 'https://misc-api.multiversx.com/country';
export const walletConnectV2ProjectId = '99d914ebc34558cf1d979203b6b4a25e';
export const gtmId = 'G-71PEREHS4E';

export const network: NetworkType & { maiarIdApi: string; extrasApi: string } =
  {
    ...fallbackNetworkConfigurations.mainnet,
    maiarIdApi: 'https://id-api.multiversx.com/api/v1',
    extrasApi: 'https://extras-api.multiversx.com',
    apiAddress: 'https://internal-api.multiversx.com'
  };

export const kycEnd = moment().utc().isAfter(moment.utc('2022-10-21 11:00:00'));
export const snapshotCountdownEnd = '2021-09-30 08:00:00';
export const useCMS = false;

export const whitelist: string[] = [];
export const contractShards: Record<string, number> = {};

export enum ProjectsEnum {
  ITHEUM = 'itheum',
  HOLORIDE = 'holoride',
  CANTINA = 'cantina-royale',
  ASHSWAP = 'ashswap',
  HATOM = 'hatom'
}

export const currentProject = ProjectsEnum.HATOM;

export type ProjectsType = `${ProjectsEnum}`;

export const allProjects = [
  {
    name: ProjectsEnum.HOLORIDE
  },
  {
    name: ProjectsEnum.ITHEUM
  },
  {
    name: ProjectsEnum.CANTINA
  },
  {
    name: ProjectsEnum.ASHSWAP
  },
  {
    name: ProjectsEnum.HATOM
  }
];

export interface TierType {
  minimumStaked: number;
  tickets: number;
  number: number;
  suffix: string;
  egldNextTier: number;
}
export const tiers: Array<TierType> = [
  {
    minimumStaked: 500,
    tickets: 64,
    number: 1,
    suffix: 'st',
    egldNextTier: 0
  },
  {
    minimumStaked: 100,
    tickets: 32,
    number: 2,
    suffix: 'nd',
    egldNextTier: 0
  },
  { minimumStaked: 25, tickets: 16, number: 3, suffix: 'rd', egldNextTier: 0 },
  { minimumStaked: 5, tickets: 8, number: 4, suffix: 'th', egldNextTier: 0 },
  { minimumStaked: 1, tickets: 4, number: 5, suffix: 'th', egldNextTier: 0 }
];
export const energyTiers: any = {
  Edison: {
    tickets: 1,
    name: 'Edison'
  },
  Faraday: {
    tickets: 2,
    name: 'Faraday'
  },
  Ohm: {
    tickets: 4,
    name: 'Ohm'
  },
  Newton: {
    tickets: 8,
    name: 'Newton'
  },
  Tesla: {
    tickets: 16,
    name: 'Tesla'
  }
};

export const pricePerTicket = 1.06;
export const ticketCurrencyLabel = 'EGLD';

export enum RestrictedCountriesEnum {
  AE = 'United Arab Emirates',
  UA = 'Ukraine',
  TR = 'Turkey',
  IN = 'India'
}
export const restrictedCountriesMaxTickets = 31;

export const multiversxApps = allApps([
  {
    id: 'wallet',
    name: 'Wallet', // navbar title
    url: 'https://wallet.multiversx.com'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    url: 'http://explorer.multiversx.com'
  }
]);
