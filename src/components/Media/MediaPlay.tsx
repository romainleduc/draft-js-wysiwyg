import React, { useContext } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import MediaContext from './MediaContext';

export interface MediaPlayProps extends IconButtonProps {
  onChangePlaying?: (playing: boolean) => void;
}

export const MediaPlay = ({
  children,
  onChangePlaying,
  ...other
}: MediaPlayProps): JSX.Element => {
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
    <IconButton className="media-play" onClick={handleClick} {...other}>
      {children}
    </IconButton>
  );
};
