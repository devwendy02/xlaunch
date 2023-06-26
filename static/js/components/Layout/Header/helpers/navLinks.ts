import {
  IconDefinition,
  faRectangleHistory,
  faSignsPost
} from '@fortawesome/pro-solid-svg-icons';
import { generatePath } from 'react-router';

import { currentProject } from 'config';
import { defaultFaqLink } from 'helpers/interface/getProjectPages';
import { routeNames } from 'routes';

export interface NavLink {
  route: string;
  label: string;
  icon: IconDefinition;
  disabled?: boolean;
  header?: string;
}

export const navLinks: NavLink[] = [
  {
    route: routeNames.history,
    label: 'Projects',
    icon: faRectangleHistory
  },
  {
    route: generatePath(routeNames[currentProject], {
      section: defaultFaqLink
    }),
    label: 'KYC Guide',
    icon: faSignsPost
  }
];
