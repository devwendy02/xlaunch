import * as React from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';

import { ReactComponent as XLaunchpadLogo } from '../../assets/images/xlaunchpad-white.svg';

export const Logo = () => {
  return (
    <Link
      className='d-flex align-items-center navbar-brand me-0'
      to={routeNames.home}
    >
      <XLaunchpadLogo className='main-logo flex-shrink-0 d-xs-block' />
    </Link>
  );
};
