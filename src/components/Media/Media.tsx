import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ContentState, ContentBlock } from 'draft-js';
import { AudioPrefab } from './AudioPrefab';
import { VideoPrefab } from './VideoPrefab';
import { ImagePrefab } from './ImagePrefab';

export interface MediaData {
  title?: string;
  src: string;
  alt?: string;
}

export type MediaType = 'image' | 'video' | 'audio' | 'embedded_link';

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

export interface MediaProps {
  contentState: ContentState;
  block: ContentBlock;
}

export const Media = (props: MediaProps): JSX.Element => {
  const classes = useStyles();
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const {
    mediaType,
    src,
    mediaProps,
    customControls,
    sourceProps,
  } = entity.getData();

  return (
    <>
      {mediaType === 'image' && (
        <ImagePrefab
          src={src}
          className={classes.media}
          sourceProps={sourceProps}
          {...mediaProps}
        />
      )}
      {mediaType === 'audio' && (
        <AudioPrefab
          src={src}
          className={classes.media}
          audioProps={mediaProps}
          customControls={customControls}
          sourceProps={sourceProps}
        />
      )}
      {mediaType === 'video' && (
        <VideoPrefab
          src={src}
          className={classes.media}
          videoProps={mediaProps}
          customControls={customControls}
          sourceProps={sourceProps}
        />
      )}
      {/*         
      {type === 'embedded_link' && (
        <iframe
          frameBorder="0"
          allowFullScreen
          title="Wysiwyg Embedded Content"
          {...iframeProps}
        />
      )} */}
    </>
  );
};