export const allApps = (props: { id: string; name: string; url: string }[]) => [
  {
    id: 'main-site',
    name: 'Main site',
    url: 'https://multiversx.com/'
  },
  ...props,
  {
    id: 'xexchange',
    name: 'xExchange',
    url: 'https://xexchange.com/'
  },
  {
    id: 'xlaunchpad',
    name: 'xLaunchpad',
    url: 'https://xlaunchpad.com/'
  },
  {
    id: 'bridge',
    name: 'Bridge',
    url: 'https://bridge.multiversx.com/'
  },
  {
    id: 'docs',
    name: 'Docs',
    url: 'https://docs.multiversx.com/'
  }
];
