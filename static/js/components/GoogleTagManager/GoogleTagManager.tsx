import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { gtmId } from 'config';

export const GoogleTagManager = ({
  children
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    TagManager.initialize({ gtmId });
  }, []);

  return <>{children}</>;
};
