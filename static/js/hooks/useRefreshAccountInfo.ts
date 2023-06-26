import React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { useSelector } from 'react-redux';
import { refetchOriginSelector } from 'redux/selectors';

export const useRefreshAccountInfo = () => {
  const refetch = useSelector(refetchOriginSelector);
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);

  React.useEffect(() => {
    if (loggedIn) {
      refreshAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, loggedIn]);
};
