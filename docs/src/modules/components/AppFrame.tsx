import React, { useState, ReactNode } from 'react';
import { IconButton, AppBar, Toolbar, makeStyles, Container } from '@material-ui/core';
import { Menu as MenuIcon, GitHub as GithubIcon } from '@material-ui/icons';
import AppDrawer from './AppDrawer';
import AppFooter from './AppFooter';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    width: 'calc(100% - 0px)',
  },
  content: {
    flex: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 76,
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: 96,
    },
  },
  mainWidth: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 48,
      paddingRight: 48,
    },
  },
}));

interface AppFrameProps {
  children: ReactNode;
  className?: string;
}

const AppFrame = ({ children, className }: AppFrameProps): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const classes = useStyles();

  return (
    <div className={clsx(className)}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <div>
            <IconButton
              component="a"
              color="inherit"
              href="https://github.com/romainleduc/draft-js-wysiwyg"
              edge="end"
            >
              <GithubIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppDrawer
        className={classes.drawer}
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      />
      <Container
        component="main"
        maxWidth="md"
        className={clsx(classes.main, classes.mainWidth)}
      >
        {children as any}
      </Container>
      <AppFooter />
    </div>
  );
};

export default AppFrame;
