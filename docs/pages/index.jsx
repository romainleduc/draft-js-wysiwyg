import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppFrame from '../src/modules/components/AppFrame';
import AppHead from '../src/modules/components/AppHead';
import LandingExample from '../src/examples/LandingExample';

const useStyles = makeStyles(theme => ({
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& div': {
      marginBottom: 15,
    },
    padding: '50px 0px',
    [theme.breakpoints.only('xs')]: {
      padding: '25px 0px',
    },
    marginBottom: 30,
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '2.2rem',
    },
  },
  description: {
    maxWidth: 700,
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
            className={classes.description}
            variant='h5'
            component='div'
            align='center'
            color="textSecondary"
          >
            Beautiful React web editor built on Draft.js and Material-UI for faster and easier development.
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
      <LandingExample />
    </AppFrame>
  );
}

export default LandingPage;