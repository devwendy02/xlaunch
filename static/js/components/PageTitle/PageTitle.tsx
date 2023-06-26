import React, { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { defaultFaqLink } from 'helpers/interface/getProjectPages';
import { useMatchPath } from 'hooks';
import { launchpadOriginSelector } from 'redux/selectors';
import { projectsRoutes } from 'routes';

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const matchPath = useMatchPath();
  const { state, pathname } = useLocation();
  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const from = state && 'from' in (state as any) ? (state as any).from : '';

  const blacklistedProjectRoutes: string[] = [];
  for (const project of Object.keys(projectsRoutes)) {
    const projectSubPath = projectsRoutes?.[project]?.path;
    if (
      projectSubPath &&
      !blacklistedProjectRoutes.includes(projectSubPath) &&
      projectSubPath.includes(':section')
    ) {
      blacklistedProjectRoutes.push(projectSubPath);
    }
  }

  const blacklist: string[] = [
    launchpadOrigin.pathname,
    ...blacklistedProjectRoutes
  ];
  const scrollTop = () => {
    const preventScroll = blacklist.some(
      (page) =>
        (matchPath(page) || from === page) && !pathname.includes(defaultFaqLink)
    );
    if (!preventScroll) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  };

  useEffect(scrollTop, [pathname]);

  return <>{children}</>;
};

export const withPageTitle =
  (title: string, Component: React.ComponentType) => () => {
    const Memoized = memo(() => (
      <ScrollToTop>
        <Component />
      </ScrollToTop>
    ));

    useEffect(() => {
      document.title = title;
    }, []);
    return <Memoized />;
  };
