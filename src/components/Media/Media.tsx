import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { ContentState, ContentBlock } from 'draft-js';
import { AudioContainer } from './AudioContainer';
import { MediaVolume } from './MediaVolume';
import { MediaPlay } from './MediaPlay';
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
    mediaType,
  } = entity.getData();
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [mediaVolume, setMediaVolume] = useState(
    audioProps?.muted || videoProps?.muted ? 0 : 1
  );
  const type = entity.getType();
  let mediaIcons: { [key: string]: string[] };
  let mediaProps;
  let otherMediaProps;

  if (mediaType === 'audio') {
    mediaProps = audioProps;
  } else if (mediaType === 'video') {
    mediaProps = videoProps;
  }

  if (mediaProps) {
    const {
      playIcon,
      pauseIcon,
      volumeOffIcon,
      volumeMuteIcon,
      volumeDownIcon,
      volumeUpIcon,
      ...restMediaProps
    } = mediaProps;
    otherMediaProps = restMediaProps;

    mediaIcons = {
      playIcon: [playIcon, <PlayArrow />],
      pauseIcon: [pauseIcon, <Pause />],
      volumeOffIcon: [volumeOffIcon, <VolumeOff />],
      volumeMuteIcon: [volumeMuteIcon, <VolumeMute />],
      volumeDownIcon: [volumeDownIcon, <VolumeDown />],
      volumeUpIcon: [volumeUpIcon, <VolumeUp />],
    };
  }

  const handleChangeMediaPlaying = (playing: boolean) => {
    setMediaPlaying(playing);
  };

  const handleChangeMediaVolume = (volume: number) => {
    setMediaVolume(volume);
  };

  const getIcon = (name: string) => {
    const icon = mediaIcons[name];

    if (icon) {
      return icon[0] || icon[1];
    }

    return undefined;
  };

  return (
    <>
      {type === 'audio' && (
        <AudioContainer
          className={classes.media}
          audioProps={...otherMediaProps}
        >
          <MediaPlay onChangePlaying={handleChangeMediaPlaying}>
            {mediaPlaying ? getIcon('pauseIcon') : getIcon('playIcon')}
          </MediaPlay>
          <MediaVolume
            {...otherMediaProps.volumeProps}
            onChangeVolume={handleChangeMediaVolume}
          >
            {mediaVolume >= 0.5
              ? getIcon('volumeUpIcon')
              : mediaVolume >= 0.3
              ? getIcon('volumeDownIcon')
              : mediaVolume > 0
              ? getIcon('volumeMuteIcon')
              : getIcon('volumeOffIcon')}
          </MediaVolume>
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
