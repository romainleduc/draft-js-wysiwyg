import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppFrame from '../src/modules/components/AppFrame';
import AppHead from '../src/modules/components/AppHead';
import LandingExample from '../src/examples/LandingExample';
import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles(theme => ({
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& p': {
      marginBottom: 30
    },
    paddingTop: 50,
    paddingBottom: 50,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  logo: {
    flexShrink: 0,
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
    },
  },
  subtitle1: {
    margin: '16px 0px',
  },
  test: {
    display: 'flex'
  },
  test2: {
    padding: '0px 100px'
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <AppFrame>
      <AppHead
        title=''
        description=''
      />
      <div className={classes.heading}>
        <img src="/static/logo.svg" alt="" className={classes.logo} />
        <Typography variant='h1'>
          Draft-js-wysiwyg
        </Typography>
        <Typography
          variant='h5'
          component='p'
          align='center'
        >
          A WYSIWYG editor for React built on Draft.js and Material-UI for faster and easier web development.
        </Typography>
        <Button
          component='a'
          href='https://www.npmjs.com/package/draft-js-wysiwyg'
          variant='outlined'
          color='primary'
        >
          Get started
        </Button>
      </div>
      <div className={classes.test2}>
        <div className={classes.test}>
          <BuildIcon color='primary' />
          <Typography variant='h6' component='h2'>
            Try it out!
          </Typography>
        </div>
        <Typography
          className={classes.subtitle1}
          variant='subtitle1'
          component='p'
        >
          Here's a simple example of a rich text editor built in Draft.js.
        </Typography>
        <LandingExample />
      </div>
    </AppFrame>
  );
}

export default LandingPage;