import { logout } from '@multiversx/sdk-dapp/utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateImpersonateAddress } from 'redux/slices';
import { routeNames } from 'routes';
import { storage } from 'storage';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return async (callbackUrl?: string, pathname?: string) => {
    try {
      dispatch(updateImpersonateAddress(undefined));
      await logout(callbackUrl, () => {
        navigate(pathname ? pathname : routeNames.home);
      });

      const walletconnectV2Keys = storage.local.getKeys('wc@2');
      storage.local.clear(['updateAddressToken', ...walletconnectV2Keys]);
    } catch (err) {
      console.error('Unable to logout from dapp', err);
    }
  };
};
