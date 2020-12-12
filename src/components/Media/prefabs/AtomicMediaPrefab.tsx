import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { AtomicMediaProps } from '../AtomicMediaButton';
import { getMediaType } from '../patterns';

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

const AtomicMediaPrefab = ({
  height,
  poster,
  src,
  sourcesProps,
  className,
  ...other
}: AtomicMediaProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      {getMediaType(src) === 'audio' &&
        <audio
          className={clsx(classes.media, className)}
          src={!sourcesProps && src}
          {...other}
        >
          {sourcesProps?.map((sourceProps, key) => (
            <source key={`${src}-${key}`} {...sourceProps} />
          ))}
        </audio>
      }
      {getMediaType(src) === 'video' &&
        <video
          className={clsx(classes.media, className)}
          src={!sourcesProps && src}
          poster={poster}
          height={height}
          {...other}
        >
          {sourcesProps?.map((sourceProps, key) => (
            <source key={`${src}-${key}`} {...sourceProps} />
          ))}
        </video>
      }
    </>
  );
};

export default AtomicMediaPrefab;