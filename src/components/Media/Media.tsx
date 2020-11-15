import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { ContentState, ContentBlock } from 'draft-js';
import { AudioContainer } from './AudioContainer';
import { VolumeMedia } from './VolumeMedia';
import { PlayIconButton } from './PlayIconButton';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeDown,
  VolumeMute,
  VolumeOff,
} from '@material-ui/icons';

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
    audioProps,
    imgProps,
    videoProps,
    iframeProps,
    sourcesProps,
    customControls,
  } = entity.getData();
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [mediaVolume, setMediaVolume] = useState(
    audioProps?.muted || videoProps?.muted ? 0 : 1
  );
  const type = entity.getType();

  const handleChangeMediaPlaying = (playing: boolean) => {
    setMediaPlaying(playing);
  };

  const handleChangeMediaVolume = (volume: number) => {
    setMediaVolume(volume);
  };

  return (
    <>
      {type === 'audio' && (
        <AudioContainer
          className={classes.media}
          audioProps={audioProps}
          customControls={customControls}
        >
          <PlayIconButton onChangePlaying={handleChangeMediaPlaying}>
            {mediaPlaying ? <Pause /> : <PlayArrow />}
          </PlayIconButton>
          <VolumeMedia onChangeVolume={handleChangeMediaVolume}>
            {mediaVolume >= 0.5 ? (
              <VolumeUp />
            ) : mediaVolume >= 0.3 ? (
              <VolumeDown />
            ) : mediaVolume > 0 ? (
              <VolumeMute />
            ) : (
              <VolumeOff />
            )}
          </VolumeMedia>
        </AudioContainer>
      )}
      {type === 'image' && <img className={classes.media} {...imgProps} />}
      {type === 'video' && (
        <video className={classes.media} controls {...videoProps}>
          {sourcesProps?.map(
            (
              sourceProps: React.SourceHTMLAttributes<HTMLSourceElement>,
              key: number
            ) => (
              <source key={`mediaVideoSource-${key}`} {...sourceProps} />
            )
          )}
        </video>
      )}
      {type === 'embedded_link' && (
        <iframe
          frameBorder="0"
          allowFullScreen
          title="Wysiwyg Embedded Content"
          {...iframeProps}
        />
      )}
    </>
  );
};
