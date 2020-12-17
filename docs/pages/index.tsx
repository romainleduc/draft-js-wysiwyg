import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppFrame from '../src/modules/components/AppFrame';
import AppHead from '../src/modules/components/AppHead';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& p': {
      marginBottom: 30
    }
  },
  logo: {
    flexShrink: 0,
    width: 40,
    height: 40,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
      width: 35,
      height: 35,
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <AppFrame>
      <AppHead
        title=''
        description=''
      />
      <div className={classes.content}>
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
          variant='contained'
          color='primary'
        >
          Get started
        </Button>
      </div>
    </AppFrame>
  );
}

export default LandingPage;