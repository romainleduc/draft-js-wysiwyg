import React from 'react';
import { Container, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6.5, 0),
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#24292e',
    borderRadius: 15,
    padding: theme.spacing(0.8, 0.4),
    '& img': {
      width: 28,
      height: 22,
    },
  },
  list: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    alignItems: 'center',
  },
}));

const AppFooter = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="md">
        <footer className={classes.footer}>
          <ul className={classes.list}>
            <li>
              <Link
                color="primary"
                href="https://github.com/romainleduc/draft-js-wysiwyg"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                className={classes.logo}
                variant="body2"
                href="https://draft-js-wysiwyg.com/"
              >
                <img src="/static/logo.svg" alt="Draft-js-wysiwyg logo" />
              </Link>
            </li>
            <li>
              <Link
                color="primary"
                href="https://github.com/romainleduc/draft-js-wysiwyg"
              >
                About
              </Link>
            </li>
          </ul>
        </footer>
      </Container>
    </div>
  );
};

export default AppFooter;
