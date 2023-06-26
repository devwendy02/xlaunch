import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';

export const useIsAuthenticated = () => {
  const { isLoggedIn } = useGetLoginInfo();

  return isLoggedIn;
};
