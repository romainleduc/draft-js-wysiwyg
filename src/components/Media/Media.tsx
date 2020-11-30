import React from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import ReactPlayer from 'react-player';
import { AtomicImageProps } from './AtomicImageButton';
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

export interface MediaData {
  title?: string;
  src: string;
  alt?: string;
}

export type MediaType = 'image' | 'video' | 'audio' | 'embedded_link';

export interface MediaProps {
  contentState: ContentState;
  block: ContentBlock;
}

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

export const Media = (props: MediaProps): JSX.Element => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { atomicMediaProps, atomicImageProps } = entity.getData();

  return (
    <>
      {atomicImageProps ? (
        <AtomicImagePrefab {...atomicImageProps} />
      ) : (
        <ReactPlayer {...atomicMediaProps} />
      )}
    </>
  );
};
