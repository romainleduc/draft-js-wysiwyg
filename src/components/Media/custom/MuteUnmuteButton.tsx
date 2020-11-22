import React, { forwardRef, useContext } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import clsx from 'clsx';
import {
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';
import MediaContext from './MediaContext';

export interface MuteUnmuteButtonProps
  extends Omit<IconButtonProps, 'children'> {
  volumeOffIcon?: React.ReactNode;
  volumeMuteIcon?: React.ReactNode;
  volumeDownIcon?: React.ReactNode;
  volumeUpIcon?: React.ReactNode;
  onChangeMute?: (muted: boolean) => void;
}

const defaultVolumeOffIcon = <VolumeOff />;
const defaultVolumeMuteIcon = <VolumeMute />;
const defaultVolumeDownIcon = <VolumeDown />;
const defaultVolumeUpIcon = <VolumeUp />;

export const MuteUnmuteButton = forwardRef<
  HTMLButtonElement,
  MuteUnmuteButtonProps
>(
  (
    {
      className,
      volumeOffIcon = defaultVolumeOffIcon,
      volumeMuteIcon = defaultVolumeMuteIcon,
      volumeDownIcon = defaultVolumeDownIcon,
      volumeUpIcon = defaultVolumeUpIcon,
      onChangeMute,
      ...other
    }: MuteUnmuteButtonProps,
    ref
  ): JSX.Element => {
    const { media } = useContext(MediaContext) || {};

    const handleClick = () => {
      if (media) {
        media.muted = !media.muted;
        onChangeMute?.(media.muted);
      }
    };

    const getIcon = () => {
      if (media) {
        const { volume, muted } = media;

        if (volume <= 0 || muted) {
          return volumeOffIcon;
        } else if (volume >= 0.5) {
          return volumeUpIcon;
        } else if (volume >= 0.3) {
          return volumeDownIcon;
        }
      }

      return volumeMuteIcon;
    };

    return (
      <IconButton
        ref={ref}
        className={clsx('media-mute', className)}
        onClick={handleClick}
        {...other}
      >
        {getIcon()}
      </IconButton>
    );
  }
);
