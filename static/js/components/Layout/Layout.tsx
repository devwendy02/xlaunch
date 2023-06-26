import React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, matchPath } from 'react-router-dom';

import {
  currentProject as configProject,
  ProjectsEnum,
  ProjectsType
} from 'config';
import { useRefreshAccountInfo, useLogout, useApiRequests } from 'hooks';
import { launchpadOriginSelector } from 'redux/selectors';
import { setUsdValue } from 'redux/slices';
import routes, { routeNames } from 'routes';

import { Footer } from './Footer';
import { Header } from './Header';
import { TxSubmittedModal } from './TxSubmittedModal';
import { useBgPage } from './useBgPage';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useRefreshAccountInfo();

  const { BgPage, hideBgPage } = useBgPage();
  const { address } = useGetAccountInfo();
  const location = useLocation();
  const { search, pathname } = location;
  const { getUsdPrice } = useApiRequests();
  const dispatch = useDispatch();
  const logout = useLogout();
  const loggedIn = Boolean(address);
  const launchpadOrigin = useSelector(launchpadOriginSelector);

  const projectPathname = launchpadOrigin?.pathname ?? pathname;
  const linkProject: ProjectsType = projectPathname.split(
    '/'
  )[1] as ProjectsType;
  const currentProject =
    Object.values(ProjectsEnum).includes(linkProject as ProjectsEnum) &&
    linkProject
      ? linkProject
      : configProject;

  const bgProject = matchPath(
    (routeNames as any)[`${currentProject}-root`],
    launchpadOrigin.pathname
  );
  const bgProjectSection = matchPath(
    routeNames[currentProject],
    launchpadOrigin.pathname
  );

  const projectName =
    bgProjectSection?.pathname ?? bgProject?.pathname ?? currentProject;
  const displayName = projectName.split('/')[1];

  const fetchUsdValue = () => {
    getUsdPrice().then(({ data, success }) => {
      if (success) {
        dispatch(setUsdValue(data.price));
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fetchUsdValue, [address]);

  React.useEffect(() => {
    const receiveMessage = (ev: StorageEvent) => {
      if (ev.key !== 'logoutEvent' || !ev.newValue) return;
      try {
        const { data } = JSON.parse(ev.newValue);
        if (data === address) {
          logout();
        }
      } catch (err) {
        return;
      }
    };

    if (address) {
      window.addEventListener('storage', receiveMessage);
    }

    return () => {
      window.removeEventListener('storage', receiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <div className={`layout flex-fill ${displayName}`}>
        <Header />
        <main className='main-content d-flex flex-column flex-fill'>
          <>
            <AuthenticatedRoutesWrapper
              routes={routes}
              unlockRoute={`${routeNames.unlock}${search}`}
            >
              {!hideBgPage && <>{BgPage}</>}
              {children}
              {loggedIn && (
                <>
                  <TxSubmittedModal />
                </>
              )}
            </AuthenticatedRoutesWrapper>
          </>
        </main>
        <Footer />
      </div>
    </>
  );
};
