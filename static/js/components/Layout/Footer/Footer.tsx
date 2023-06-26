import * as React from 'react';
import {
  faTwitter,
  faTelegram,
  faFacebookSquare,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Logo } from 'components';
import { routeNames } from 'routes';

export const Footer = () => {
  const year = moment().format('YYYY');
  const launchpadVersion = process.env.REACT_APP_CACHE_BUST;

  return (
    <footer>
      <div className='footer pb-2'>
        <div className='spacer'></div>
        <div className='container'>
          <div className='row justify-content-md-between'>
            <div className='col-12 col-md-4 mt-3'>
              <div className='d-flex flex-column'>
                <Logo />
                <span className='tagline small text-secondary mt-3'>
                  The strategic launchpad for projects with a high chance of
                  making a lasting impact on the world using MultiversX, the
                  internet-scale blockchain technology.
                </span>
                <div className='social mt-4'>
                  <a
                    target='_blank'
                    className='me-spacer mb-2'
                    href='https://twitter.com/multiversx'
                    aria-label='Twitter'
                    rel='noreferrer noopener nofollow'
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    target='_blank'
                    className='me-spacer mb-2'
                    href='https://t.me/xLaunchpadApp'
                    aria-label='Telegram'
                    rel='noreferrer noopener nofollow'
                  >
                    <FontAwesomeIcon icon={faTelegram} />
                  </a>
                  <a
                    target='_blank'
                    className='me-spacer mb-2'
                    href='https://www.facebook.com/MultiversX/'
                    aria-label='Facebook'
                    rel='noreferrer noopener nofollow'
                  >
                    <FontAwesomeIcon icon={faFacebookSquare} />
                  </a>
                  <a
                    target='_blank'
                    className='me-spacer mb-2'
                    href='https://mt.linkedin.com/company/multiversx'
                    aria-label='LinkedIn'
                    rel='noreferrer noopener nofollow'
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='row'>
                <div className='col-md-4 mt-3'>
                  <p className='font-weight-normal'>Launchpad</p>
                  <ul className='list-unstyled footer-column'>
                    <li>
                      <Link to={routeNames.history}>Projects</Link>
                    </li>
                    <li>
                      <a
                        href='https://multiversx.com/blog'
                        rel='noreferrer noopener nofollow'
                        target='_blank'
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-md-4 mt-3'>
                  <p className='font-weight-normal'>Legal</p>
                  <ul className='list-unstyled footer-column'>
                    <li>
                      <a
                        href='/xLaunchpad - Privacy Policy.pdf'
                        rel='noreferrer noopener nofollow'
                        target='_blank'
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href='/xLaunchpad T&Cs.pdf'
                        rel='noreferrer noopener nofollow'
                        target='_blank'
                      >
                        Terms & conditions
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-md-4 mt-3'>
                  <p className='font-weight-normal'>Support</p>
                  <ul className='list-unstyled footer-column'>
                    <li>
                      <a
                        href='https://form.typeform.com/to/TzeoE5SU'
                        rel='noreferrer noopener nofollow'
                        target='_blank'
                      >
                        Startups Apply
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex flex-column mt-2 mb-4 text-center'>
            <div className='small text-secondary'>
              &copy; {year} xLaunchpad. All rights reserved.
            </div>
            {launchpadVersion && (
              <small className='text-secondary version mt-1'>
                Build {launchpadVersion}
              </small>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
