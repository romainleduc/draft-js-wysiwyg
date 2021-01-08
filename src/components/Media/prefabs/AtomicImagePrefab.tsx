import React from 'react';
import { AtomicImageProps } from '../AtomicImageButton';
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

const AtomicImagePrefab = ({
  src,
  sourcesProps,
  className,
  ...other
}: AtomicImageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      {!sourcesProps ? (
        <img className={clsx(classes.media, className)} src={src} {...other} />
      ) : (
        <picture>
          {sourcesProps.map((sourceProps, key) => (
            <source key={`${src}-${key}`} {...sourceProps} />
          ))}
          <img
            className={clsx(classes.media, className)}
            src={src}
            {...other}
          />
        </picture>
      )}
    </>
  );
};

export default AtomicImagePrefab;
