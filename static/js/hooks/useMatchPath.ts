import { matchPath, useLocation } from 'react-router-dom';

export const useMatchPath = () => {
  const { pathname } = useLocation();

  return (path: string) =>
    matchPath(
      {
        path
      },
      pathname
    ) !== null;
};
