import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppFrame from '../src/modules/components/AppFrame';
import AppHead from '../src/modules/components/AppHead';
import LandingExample from '../src/examples/LandingExample';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& p': {
      marginBottom: 30
    },
    padding: '50px 0px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.only('xs')]: {
      padding: '25px 0px',
    },
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '2.2rem',
    },
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
    display: 'flex',
    alignItems: 'center',
  },
  test2: {
    padding: '50px 0px',
    [theme.breakpoints.up('md')]: {
      padding: '50px 100px',
    },
  },
  createIcon: {
    marginRight: 16,
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <AppFrame disablePermanent>
      <AppHead
        title=''
        description=''
      />
      <div className={classes.heading}>
        <img src="/static/logo.svg" alt="" className={classes.logo} />
        <Typography className={classes.title} variant='h1'>
          Draft-js-wysiwyg
        </Typography>
        <Box mt={2}>
          <Typography
            variant='h5'
            component='p'
            align='center'
          >
            A WYSIWYG editor for React built on Draft.js and Material-UI for faster and easier web development.
        </Typography>
        </Box>
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
          <CreateIcon className={classes.createIcon} color='primary' />
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