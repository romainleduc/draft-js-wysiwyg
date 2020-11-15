import React, { useContext, forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import MediaContext from './MediaContext';

export interface PlayIconButtonProps extends IconButtonProps {
  onChangePlaying?: (playing: boolean) => void;
}

export const PlayIconButton = forwardRef<
  HTMLButtonElement,
  PlayIconButtonProps
>(
  (
    { children, onChangePlaying, ...other }: PlayIconButtonProps,
    ref
  ): JSX.Element => {
    const { media } = useContext(MediaContext) || {};

    const handleClick = () => {
      if (media) {
        if (media.paused) {
          media.play();
        } else {
          media.pause();
        }

        onChangePlaying?.(!media.paused);
      }
    };

    return (
      <IconButton
        ref={ref}
        className="media-play"
        onClick={handleClick}
        {...other}
      >
        {children}
      </IconButton>
    );
  }
);
