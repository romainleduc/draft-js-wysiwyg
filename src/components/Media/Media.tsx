import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ContentState, ContentBlock } from 'draft-js';
import { AudioPrefab } from './AudioPrefab';

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
    atomicVideoProps,
    atomicAudioProps,
    atomicImageProps,
  } = entity.getData();
  const type = entity.getType();

  console.log(atomicAudioProps);

  return (
    <>
      {type === 'audio' && atomicAudioProps && (
        <AudioPrefab
          className={classes.media}
          atomicAudioProps={atomicAudioProps}
        />
      )}
      {type === 'image' && (
        <img className={classes.media} {...atomicImageProps} />
      )}
      {type === 'video' && (
        <video
          className={classes.media}
          controls
          {...atomicVideoProps.videoProps}
        >
          {atomicVideoProps.sourcesProps?.map(
            (
              sourceProps: React.SourceHTMLAttributes<HTMLSourceElement>,
              key: number
            ) => (
              <source key={`mediaVideoSource-${key}`} {...sourceProps} />
            )
          )}
        </video>
      )}
      {/* {type === 'embedded_link' && (
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
