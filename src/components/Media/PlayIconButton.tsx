import React, { useContext, forwardRef, useState } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import MediaContext from './MediaContext';
import { Pause, PlayArrow } from '@material-ui/icons';

export interface PlayIconButtonProps
  extends Omit<IconButtonProps, 'children'> {
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
}

const defaultPlayIcon = <PlayArrow />;
const defaultPauseIcon = <Pause />;

export const PlayIconButton = forwardRef<
  HTMLButtonElement,
  PlayIconButtonProps
>(
  (
    {
      playIcon = defaultPlayIcon,
      pauseIcon = defaultPauseIcon,
      ...other
    }: PlayIconButtonProps,
    ref
  ): JSX.Element => {
    const { media } = useContext(MediaContext) || {};
    const [playing, setPlaying] = useState(false);

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
