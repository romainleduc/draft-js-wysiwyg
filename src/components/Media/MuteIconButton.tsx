import React, { forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import clsx from 'clsx';
import {
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';

export interface MuteIconButtonProps extends Omit<IconButtonProps, 'children'> {
  volumeOffIcon?: React.ReactNode;
  volumeMuteIcon?: React.ReactNode;
  volumeDownIcon?: React.ReactNode;
  volumeUpIcon?: React.ReactNode;
  media: HTMLMediaElement;
  onChangeMute?: (muted: boolean) => void;
}

const defaultVolumeOffIcon = <VolumeOff />;
const defaultVolumeMuteIcon = <VolumeMute />;
const defaultVolumeDownIcon = <VolumeDown />;
const defaultVolumeUpIcon = <VolumeUp />;

export const MuteIconButton = forwardRef<
  HTMLButtonElement,
  MuteIconButtonProps
>(
  (
    {
      className,
      media,
      volumeOffIcon = defaultVolumeOffIcon,
      volumeMuteIcon = defaultVolumeMuteIcon,
      volumeDownIcon = defaultVolumeDownIcon,
      volumeUpIcon = defaultVolumeUpIcon,
      onChangeMute,
      ...other
    }: MuteIconButtonProps,
    ref
  ): JSX.Element => {
    const handleClick = () => {
      media.muted = !media.muted;
      onChangeMute?.(media.muted);
    };

    const getIcon = () => {
      const { volume, muted } = media;

      if (volume <= 0 || muted) {
        return volumeOffIcon;
      } else if (volume >= 0.5) {
        return volumeUpIcon;
      } else if (volume >= 0.3) {
        return volumeDownIcon;
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
