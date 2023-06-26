import {
  DIGITS as digits,
  DECIMALS as decimals
} from '@multiversx/sdk-dapp/constants';
import { formatAmount } from '@multiversx/sdk-dapp/utils';

import { TicketsDataType } from 'components/ContractStatus/components/Tickets';
import { energyTiers, tiers, TierType } from 'config';
import { useApiRequests } from 'hooks';

export const useGetTier = () => {
  const { getStakedAmount, getEnergy } = useApiRequests();

  const getTierByTicketData = (
    ticketsData: TicketsDataType
  ): TierType | undefined => {
    const tickets = [];
    let from = parseInt(ticketsData.ticketEntries[0]);
    const to = parseInt(ticketsData.ticketEntries[1]);
    for (from; from <= to; from++) {
      tickets.push(from);
    }

    for (const tier of tiers) {
      if (tickets.length === tier.tickets) return tier;
    }
  };

  const getTierByEnergy = async () => {
    const energyResponse = await getEnergy();
    if (energyResponse?.success) {
      return energyTiers[energyResponse?.data.league];
    }

    return undefined;
  };
  const getTierByStakedAmoutn = async () => {
    const totalStakedResponse = await getStakedAmount();
    let stakedAmount = '0';
    if (totalStakedResponse?.success) {
      stakedAmount = totalStakedResponse?.data.stake;
    }

    const denominatedStakedAmount = formatAmount({
      input: stakedAmount,
      digits,
      decimals,
      showLastNonZeroDecimal: true,
      addCommas: false
    });

    for (const tier of tiers) {
      if (parseFloat(denominatedStakedAmount) >= tier.minimumStaked) {
        if (tier.number !== 1) {
          const nextTier = tiers[tier.number - 2];
          tier.egldNextTier = parseFloat(
            (
              nextTier.minimumStaked - parseFloat(denominatedStakedAmount)
            ).toFixed(2)
          );
        }
        return tier;
      }
    }
  };

  return { getTierByStakedAmoutn, getTierByTicketData, getTierByEnergy };
};
