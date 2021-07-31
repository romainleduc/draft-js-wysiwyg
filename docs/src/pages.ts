const pages = [
  {
    title: 'Getting Started',
    pathname: '/getting-started',
    children: [
      { pathname: '/installation', title: 'Installation' },
      { pathname: '/usage', title: 'Usage' },
    ]
  },
  {
    title: 'Components',
    pathname: '/components',
    children: [
      { pathname: '/toggle-button', title: 'Toggle button' },
      { pathname: '/button', title: 'Button' },
    ],
  },
];

export default pages;
