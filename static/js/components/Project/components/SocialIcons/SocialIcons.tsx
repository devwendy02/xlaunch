import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getIcon } from 'helpers';

export const SocialIcons = ({ icons }: { icons: any }) => {
  return (
    <div className='social-icons d-flex flex-wrap'>
      {icons.map((icon: any) => (
        <a
          target='_blank'
          className='icon d-flex align-items-center justify-content-center'
          href={icon.link}
          aria-label={icon.title}
          key={icon.title}
          rel='noreferrer nofollow'
        >
          <FontAwesomeIcon icon={getIcon(icon.icon)} />
        </a>
      ))}
    </div>
  );
};
