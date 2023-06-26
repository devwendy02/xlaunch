import React, { useState } from 'react';
import { faArrowRight, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { ExtensionLoginButton } from '@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton';
import { LedgerLoginButton } from '@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton';
import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton';
import { WebWalletLoginButton } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ReactComponent as DeFiWallet } from 'assets/images/extension-defi-wallet.svg';
import { ReactComponent as LedgerWallet } from 'assets/images/ledger-wallet.svg';
import { ReactComponent as MobileWallet } from 'assets/images/mobile-wallet.svg';
import { ReactComponent as WebWallet } from 'assets/images/web-wallet.svg';

import { ModalContainer } from 'components';
import { network, walletConnectV2ProjectId } from 'config';
import { launchpadOriginSelector } from 'redux/selectors';
import { routeNames } from 'routes';

declare global {
  interface Window {
    elrondWallet: { extensionId: string };
  }
}

enum LoginContainersTypesEnum {
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  none = 'none'
}

export const UnlockTitle = (
  <div className='unlock-title d-flex align-items-center mb-2'>
    Connect to a wallet
    <OverlayTrigger
      placement='top'
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id='connect-to-wallet-tooltip' {...props}>
          Connect securely using one of the provided options
        </Tooltip>
      )}
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        className='i-icon text-neutral-400 ms-2 mt-1'
      />
    </OverlayTrigger>
  </div>
);

export const Unlock = ({
  plainForm,
  tutorialInfo
}: {
  plainForm?: boolean;
  tutorialInfo?: boolean;
}) => {
  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const { isLoggedIn } = useGetLoginInfo();
  const [openedLoginContainerType, setOpenedContainerType] = useState(
    LoginContainersTypesEnum.none
  );

  // TODO check how to get walletConnectBridge in dapp-core
  // this flag needs to be taken into account for disabled flag for maiar login btn
  // const { walletConnectBridge } = Dapp.useContext();

  const loginParams = {
    callbackRoute: launchpadOrigin.pathname,
    logoutRoute: routeNames.home,
    redirectAfterLogin: false,
    wrapContentInsideModal: false,
    hideButtonWhenModalOpens: true,
    shouldRenderDefaultCss: false,
    className: 'login-btn',
    nativeAuth: true
  };

  function handleOpenWalletConnect() {
    setOpenedContainerType(LoginContainersTypesEnum.walletConnect);
  }

  function handleOpenLedgerLogin() {
    setOpenedContainerType(LoginContainersTypesEnum.ledger);
  }

  function getLoginTitle() {
    switch (openedLoginContainerType) {
      case LoginContainersTypesEnum.walletConnect:
        return 'xPortal Login';
      case LoginContainersTypesEnum.ledger:
        return 'Login with Ledger';
      default:
        return UnlockTitle;
    }
  }

  function renderLoginButton(
    content: React.ReactNode,
    containerType = LoginContainersTypesEnum.none
  ) {
    const shouldRender =
      openedLoginContainerType == LoginContainersTypesEnum.none ||
      containerType === openedLoginContainerType;
    return shouldRender ? content : null;
  }

  if (isLoggedIn) {
    return <Navigate to={routeNames.home} />;
  }

  const getLoginForm = () => {
    return (
      <div className='unlock-page'>
        {renderLoginButton(
          <ExtensionLoginButton {...loginParams}>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex flex-row method'>
                <div className='title d-flex align-items-center'>
                  <DeFiWallet
                    className='app-icon me-2'
                    height='20'
                    style={{ width: '1.8rem' }}
                  />
                  MultiversX DeFi Wallet
                </div>
              </div>

              <FontAwesomeIcon icon={faArrowRight} className='arrow' />
            </div>
          </ExtensionLoginButton>
        )}

        {renderLoginButton(
          <WalletConnectLoginButton
            onModalOpens={handleOpenWalletConnect}
            title=''
            {...(walletConnectV2ProjectId
              ? {
                  isWalletConnectV2: true
                }
              : {})}
            {...loginParams}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex flex-row method'>
                <div className='title d-flex align-items-center'>
                  <MobileWallet
                    className='app-icon xportal-app me-2'
                    height='20'
                    style={{ width: '1.8rem' }}
                  />
                  xPortal App
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className='arrow' />
            </div>
          </WalletConnectLoginButton>,
          LoginContainersTypesEnum.walletConnect
        )}

        {renderLoginButton(
          <LedgerLoginButton
            loginButtonText={''}
            onModalOpens={handleOpenLedgerLogin}
            innerLedgerComponentsClasses={{
              ledgerProgressBarClassNames: {
                ledgerProgressBarThumbClassName: 'ledger-progressbar-thumb',
                ledgerProgressBarTrackClassName: 'ledger-progressbar-track'
              },
              addressTableClassNames: {
                ledgerModalTableItemClassName: 'ledger-address-row',
                ledgerModalTableSelectedItemClassName:
                  'ledger-address-row-selected',
                ledgerModalTableHeadClassName: 'ledger-address-header',
                ledgerModalTableNavigationButtonClassName:
                  'ledger-address-navigation-button'
              },
              ledgerConnectClassNames: {
                ledgerModalButtonClassName: 'ledger-connect-button',
                ledgerModalIconClassName: 'ledger-connect-icon'
              },
              confirmAddressClassNames: {
                ledgerModalConfirmDescriptionClassName:
                  'ledger-confirm-address-description',
                ledgerModalConfirmFooterClassName:
                  'ledger-confirm-address-footer',
                ledgerModalConfirmDataClassName: 'ledger-confirm-address-data'
              }
            }}
            {...loginParams}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex flex-row method'>
                <div className='title d-flex align-items-center'>
                  <LedgerWallet
                    className='ledger-icon  me-2'
                    height='20'
                    style={{ width: '1.8rem' }}
                  />
                  Ledger
                </div>
              </div>

              <FontAwesomeIcon icon={faArrowRight} className='arrow' />
            </div>
          </LedgerLoginButton>,
          LoginContainersTypesEnum.ledger
        )}

        {renderLoginButton(
          <>
            <WebWalletLoginButton {...loginParams}>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-row method'>
                  <div className='title d-flex align-items-center'>
                    <WebWallet
                      className='wallet-icon me-2'
                      height='20'
                      style={{ width: '1.8rem' }}
                    />
                    MultiversX Web Wallet
                  </div>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className='arrow' />
              </div>
            </WebWalletLoginButton>
            {!tutorialInfo && (
              <>
                <div className='mt-spacer text-center'>
                  <span className='text-secondary'>New to MultiversX?</span>
                </div>
                <div className='mt-1 text-center'>
                  <a
                    className='link-style'
                    href={`${network.walletAddress}/create`}
                    {...{ target: '_blank' }}
                  >
                    Learn How to setup a wallet
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  };
  if (plainForm) {
    return <>{getLoginForm()}</>;
  }
  return (
    <ModalContainer title={getLoginTitle()}>{getLoginForm()}</ModalContainer>
  );
};
