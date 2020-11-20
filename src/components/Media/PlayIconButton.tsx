import React, { forwardRef, useState, useEffect } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';

export interface PlayIconButtonProps extends Omit<IconButtonProps, 'children'> {
  media: HTMLMediaElement;
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  onChangePlaying?: (playing: boolean) => void;
}

const defaultPlayIcon = <PlayArrow />;
const defaultPauseIcon = <Pause />;

export const PlayIconButton = forwardRef<
  HTMLButtonElement,
  PlayIconButtonProps
>(
  (
    {
      media,
      playIcon = defaultPlayIcon,
      pauseIcon = defaultPauseIcon,
      onChangePlaying,
      ...other
    }: PlayIconButtonProps,
    ref
  ): JSX.Element => {
    const [playing, setPlaying] = useState(!media.paused);

    useEffect(() => {
      onChangePlaying?.(!media.paused);
    }, [playing]);

    const handleClick = () => {
      if (media.paused) {
        media.play();
      } else {
        media.pause();
      }

      setPlaying(!media.paused);
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
