import React, { useState, MouseEvent, Fragment } from 'react';
import { faPowerOff } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as Rocket } from 'assets/images/rocket.svg';
import { ReactComponent as XLaunchpadLogo } from 'assets/images/xlaunchpad-white.svg';
import { UnlockBtn } from 'components';
// import { multiversxApps } from 'config';
import { useLogout } from 'hooks';
import { routeNames } from 'routes';
import { UserAddress } from './components/UserAddress';
import { UserButton } from './components/UserButton';
import { navLinks } from './helpers/navLinks';

export const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [applicationsActive, setApplicationsActive] = useState(false);

  const { isLoggedIn } = useGetLoginInfo();
  const logout = useLogout();

  const onDisconnectClick = () => {
    logout(`${window.location.origin}${routeNames.home}`, routeNames.home);
  };

  const onMenuToggle = (event: MouseEvent) => {
    event.preventDefault();
    setMenuActive((active) => !active);

    if (applicationsActive) {
      setApplicationsActive(false);
    }
  };

  // const onApplicationsToggle = (event: MouseEvent) => {
  //   event.preventDefault();
  //   setApplicationsActive((active) => !active);

  //   if (menuActive) {
  //     setMenuActive(false);
  //   }
  // };

  const onItemClick = () => {
    document.body.click();
    setApplicationsActive(false);
    setMenuActive(false);
  };

  return (
    <Fragment>
      <header className='header'>
        <div className='container d-flex align-items-center'>
          <div className='header-main'>
            <Link to={routeNames.home} className='header-logo'>
              <XLaunchpadLogo className='main-logo' />
            </Link>
          </div>

          <div className='header-menu-items header-desktop-menu-items'>
            {navLinks.map((item) => (
              <Link
                key={item.route}
                to={item.route}
                onClick={onItemClick}
                className={classNames('header-menu-item', {
                  active: item.route === location.pathname
                })}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            className={`btn btn-dark btn-apply me-2 order-2 d-none ${
              isLoggedIn ? 'd-lg-inline-block' : 'd-md-inline-block'
            }`}
            href='https://form.typeform.com/to/TzeoE5SU'
            target='_blank'
            rel='noreferrer noopener nofollow'
          >
            <Rocket className='me-2 rocket-icon' />
            Startups Apply
          </a>

          <div
            className={classNames(
              'header-menu-wrapper',
              'header-navigation-wrapper'
            )}
          >
            <div
              onClick={onMenuToggle}
              className={classNames(
                'header-menu-trigger',
                'header-navigation-trigger'
              )}
            >
              <div
                className={classNames('header-navigation-bars', {
                  active: menuActive
                })}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <span
                    className='header-navigation-bar'
                    key={`bar-${index}`}
                  />
                ))}
              </div>
            </div>

            <div
              className={classNames(
                'header-menu-container',
                'header-navigation-container',
                { active: menuActive }
              )}
            >
              <div
                className={classNames('header-menu-items', 'header-navigation')}
              >
                {isLoggedIn ? (
                  <UserAddress className='header-mobile' />
                ) : (
                  <UnlockBtn className='mt-0 mb-3' />
                )}

                {navLinks.map((item) => (
                  <Fragment key={item.route}>
                    {item.header && (
                      <span className='header-menu-category'>
                        {item.header}
                      </span>
                    )}

                    <Link
                      to={item.route}
                      onClick={onItemClick}
                      className={classNames('header-menu-item', {
                        active: item.route === location.pathname
                      })}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className='header-menu-item-icon'
                      />

                      {item.label}
                    </Link>
                  </Fragment>
                ))}

                <a
                  className='btn btn-dark btn-apply mt-3'
                  href='https://form.typeform.com/to/TzeoE5SU'
                  target='_blank'
                  rel='noreferrer noopener nofollow'
                >
                  <Rocket className='me-2 rocket-icon' />
                  Startups Apply
                </a>

                {isLoggedIn && (
                  <button
                    type='button'
                    onClick={onDisconnectClick}
                    className='header-menu-disconnect btn-unstyled'
                  >
                    <FontAwesomeIcon icon={faPowerOff} size='xl' />
                  </button>
                )}
              </div>
            </div>
          </div>

          {!isLoggedIn && (
            <UnlockBtn className='order-2 d-none d-sm-inline-block' />
          )}

          {/* <div
            className={classNames(
              'header-menu-wrapper',
              'header-applications-wrapper'
            )}
          >
            <div
              tabIndex={0}
              onClick={onApplicationsToggle}
              onBlur={() => setTimeout(() => setApplicationsActive(false), 100)}
              className={classNames(
                'header-menu-trigger',
                'header-applications-trigger',
                { active: applicationsActive }
              )}
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <span
                  key={`header-matrix-${index}`}
                  className={classNames(
                    'header-matrix',
                    `header-matrix-${index}`
                  )}
                />
              ))}
            </div>

            <div
              className={classNames(
                'header-menu-container',
                'header-applications-container',
                'right',
                { active: applicationsActive }
              )}
            >
              <div className='header-menu-items'>
                {multiversxApps.map((application: any) => (
                  <a
                    key={application.id}
                    href={application.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={onItemClick}
                    className={classNames('header-menu-item', {
                      active: application.id === 'xlaunchpad'
                    })}
                  >
                    {application.name}
                  </a>
                ))}
              </div>
            </div>
          </div> */}

          <UserButton className='order-2 d-none d-sm-flex' />
        </div>
      </header>
    </Fragment>
  );
};
