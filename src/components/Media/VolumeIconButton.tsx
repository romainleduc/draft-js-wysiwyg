import React, { useContext, forwardRef } from 'react';
import {
  IconButton,
  IconButtonProps,
} from '@material-ui/core';
import MediaContext from './MediaContext';
import clsx from 'clsx';
import { VolumeDown, VolumeMute, VolumeOff, VolumeUp } from '@material-ui/icons';

export interface VolumeIconButtonProps
  extends Omit<IconButtonProps, 'children'> {
  volumeOffIcon?: React.ReactNode;
  volumeMuteIcon?: React.ReactNode;
  volumeDownIcon?: React.ReactNode;
  volumeUpIcon?: React.ReactNode;
}

const defaultVolumeOffIcon = <VolumeOff />;
const defaultVolumeMuteIcon = <VolumeMute />;
const defaultVolumeDownIcon = <VolumeDown />;
const defaultVolumeUpIcon = <VolumeUp />;

export const VolumeIconButton = forwardRef<HTMLButtonElement, VolumeIconButtonProps>(
  (
    {
      className,
      volumeOffIcon = defaultVolumeOffIcon,
      volumeMuteIcon = defaultVolumeMuteIcon,
      volumeDownIcon = defaultVolumeDownIcon,
      volumeUpIcon = defaultVolumeUpIcon,
      ...other
    }: VolumeIconButtonProps,
    ref
  ): JSX.Element => {
    const { media } = useContext(MediaContext) || {};

    const handleClick = () => {
      if (media) {
        media.muted = !media.muted;
      }
    };

    const getIcon = () => {
      if (!media) {
        return volumeOffIcon;
      }

      const { volume, muted } = media;

      if (muted || volume <= 0) {
        return volumeOffIcon;
      } else if (volume >= 0.5) {
        return volumeUpIcon;
      } else if (volume >= 0.3) {
        return volumeDownIcon;
      }

      return volumeMuteIcon;
    }

    return (
      <IconButton
        ref={ref}
        className={clsx('volume-button', className)}
        onClick={handleClick}
        {...other}
      >
        {getIcon()}
      </IconButton>
    );
  }
);
