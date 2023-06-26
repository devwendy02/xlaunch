import { RestrictedCountriesEnum, restrictedCountriesMaxTickets } from 'config';

export const getTicketsNumber = (ticketsNumber: number, geoCode: string) => {
  if (geoCode && Object.keys(RestrictedCountriesEnum).includes(geoCode)) {
    if (ticketsNumber > restrictedCountriesMaxTickets)
      return restrictedCountriesMaxTickets;
  }

  return ticketsNumber;
};
