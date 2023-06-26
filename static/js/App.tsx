import * as React from 'react';
import {
  useGetLoginInfo,
  useGetAccountInfo
} from '@multiversx/sdk-dapp/hooks/';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import {
  kycRouter,
  KYC_PROVIDERS,
  KycProvider
} from '@multiversx/sdk-dapp-kyc';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { GoogleTagManager, Layout, PageNotFound } from 'components';
import {
  currentProject,
  environment,
  kycEnd,
  kycServiceApi,
  network,
  walletConnectV2ProjectId
} from 'config';
import { AxiosInterceptors } from 'helpers/AxiosInterceptors';
import { persistor, store } from 'redux/store';
import routes from 'routes';

import 'assets/sass/theme.scss';

export const App = () => {
  return (
    <GoogleTagManager>
      <Router basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <AxiosInterceptors>
              <DappProvider
                environment={environment}
                customNetworkConfig={{
                  walletConnectBridgeAddresses:
                    network.walletConnectBridgeAddresses,
                  apiAddress: network.apiAddress,
                  walletConnectV2ProjectId
                }}
                dappConfig={{ shouldUseWebViewProvider: true }}
              >
                <Layout>
                  {/* <KycProvider
                    consumerHandlers={{
                      useGetLoginInfo,
                      useGetAccountInfo
                    }}
                    config={{
                      project: currentProject,
                      kycProvider: KYC_PROVIDERS.onfido,
                      kycActive: !kycEnd,
                      forceKycSignup: true,
                      kycServiceApi: kycServiceApi
                    }}
                  > */}
                  <TransactionsToastList />
                  <NotificationModal />
                  <SignTransactionsModals className='custom-class-for-modals' />
                  <Routes>
                    {routes.map((route, i) => {
                      return (
                        <Route
                          path={route.path}
                          key={route.path + i}
                          element={<route.component />}
                        />
                      );
                    })}
                    {kycRouter()}
                    <Route path='*' element={<PageNotFound />} />
                  </Routes>
                  {/* </KycProvider> */}
                </Layout>
              </DappProvider>
            </AxiosInterceptors>
          </PersistGate>
        </Provider>
      </Router>
    </GoogleTagManager>
  );
};
