import React, { forwardRef, useState, useEffect, useContext } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
import MediaContext from './MediaContext';

export interface PlayPauseButtonProps
  extends Omit<IconButtonProps, 'children'> {
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  onChangePlaying?: (playing: boolean) => void;
}

const defaultPlayIcon = <PlayArrow />;
const defaultPauseIcon = <Pause />;

export const PlayPauseButton = forwardRef<
  HTMLButtonElement,
  PlayPauseButtonProps
>(
  (
    {
      playIcon = defaultPlayIcon,
      pauseIcon = defaultPauseIcon,
      onChangePlaying,
      ...other
    }: PlayPauseButtonProps,
    ref
  ): JSX.Element => {
    const { media } = useContext(MediaContext) || {};
    const [playing, setPlaying] = useState(!media?.paused || false);

    useEffect(() => {
      if (media) {
        onChangePlaying?.(!media.paused);
      }
    }, [playing]);

    const handleClick = () => {
      if (media) {
        if (media.paused) {
          media.play();
        } else {
          media.pause();
        }

        setPlaying(!media.paused);
      }
    };

    return (
      <IconButton
        ref={ref}
        className="media-play"
        onClick={handleClick}
        {...other}
      >
        {playing && pauseIcon}
        {!playing && playIcon}
      </IconButton>
    );
  }
);
