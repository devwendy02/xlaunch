import React from 'react';
import {
  faPersonCircleCheck,
  IconDefinition
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';

import { currentProject, kycEnd } from 'config';
import { defaultFaqLink } from 'helpers/interface/getProjectPages';
import { routeNames } from 'routes';

export const SignupStatusCard = ({
  children,
  project,
  title,
  description,
  icon,
  iconClassName
}: {
  children?: React.ReactNode;
  project?: any;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: IconDefinition;
  iconClassName?: string;
}) => {
  if (kycEnd) {
    return null;
  }
  const hasFaq = project?.faq && project?.faq.length > 0;

  return (
    <div className='card project-announcement-card'>
      <div className='card-title'>
        <h6 className='mb-0'>
          <FontAwesomeIcon icon={faPersonCircleCheck} className='icon' />
          KYC Status
        </h6>
        {hasFaq && (
          <Link
            data-testid='kycGuideLink'
            className='link'
            to={generatePath(routeNames[currentProject], {
              section: defaultFaqLink
            })}
          >
            View KYC Guide
          </Link>
        )}
      </div>
      <div className='card-body'>
        <div className='signup-status'>
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={`desciption-icon ${iconClassName ?? ''}`}
            />
          )}
          <div className='status'>
            {title && <div className='title'>{title}</div>}
            {description && <div className='description'>{description}</div>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
