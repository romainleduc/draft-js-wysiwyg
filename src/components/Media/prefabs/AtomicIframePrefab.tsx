import React from 'react';
import { AtomicIframeProps } from '../AtomicIframeButton';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  media: {
    display: 'block',
    margin: '0 auto',
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
});

const AtomicIframePrefab = ({
  children,
  className,
  ...other
}: AtomicIframeProps): JSX.Element => {
  const classes = useStyles();

  return (
    <iframe className={clsx(className, classes.media)} {...other}>
      {children}
    </iframe>
  );
};

export default AtomicIframePrefab;
