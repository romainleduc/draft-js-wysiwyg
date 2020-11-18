import React, { useState, useEffect, forwardRef } from 'react';
import {
  Slider,
  SliderProps,
} from '@material-ui/core';
import clsx from 'clsx';

export interface VolumeSliderProps extends SliderProps {
  media: HTMLMediaElement;
  onChangeVolume?: (volume: number) => void;
}

export const VolumeSlider = forwardRef<HTMLDivElement, VolumeSliderProps>(
  (
    {
      className,
      media,
      onChangeVolume,
      ...other
    }: VolumeSliderProps,
    ref
  ): JSX.Element => {
    const [volume, setVolume] = useState(media?.volume * 100 || 100);
  
    useEffect(() => {
      if (media) {
        media.volume = volume / 100;
        onChangeVolume?.(media.volume);
      }
    }, [volume]);

    const handleChange = (e: any, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) {
        setVolume(newValue);
      }
    };

    return (
      <Slider
        ref={ref}
        className={clsx('media-volume', className)}
        value={volume}
        onChange={handleChange}
        {...other}
      />
    );
  }
);
