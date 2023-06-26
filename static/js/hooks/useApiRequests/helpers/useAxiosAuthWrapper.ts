import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import defaultAxios, { AxiosInstance, AxiosError } from 'axios';
import { useSelector } from 'react-redux';

import { useLogout } from 'hooks';
import { impersonateAddressSelector } from 'redux/selectors';

const isTest = process.env.NODE_ENV === 'test';

export const useAxiosAuthWrapper = () => {
  const { address } = useGetAccountInfo();
  const { tokenLogin } = useGetLoginInfo();
  const logOut = useLogout();
  const impersonatedAddress = useSelector(impersonateAddressSelector);

  return async (): Promise<AxiosInstance> => {
    if (isTest || address === '') {
      return defaultAxios;
    } else {
      const authInstance = defaultAxios.create();

      authInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.response?.status === 403) {
            logOut();
          }
          return Promise.reject(error);
        }
      );

      try {
        authInstance.interceptors.request.use((config) => {
          if (config?.headers) {
            config.headers.Authorization = tokenLogin
              ? `Bearer ${tokenLogin?.nativeAuthToken}`
              : '';
            if (Boolean(impersonatedAddress) && impersonatedAddress) {
              config.headers['impersonate-address'] = impersonatedAddress;
            }
          }
          return config;
        });
      } catch {}

      return authInstance;
    }
  };
};
