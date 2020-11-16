import React, { useState, useEffect, useContext, forwardRef } from 'react';
import {
  Slider,
  SliderProps,
} from '@material-ui/core';
import MediaContext from './MediaContext';
import clsx from 'clsx';

export interface VolumeSliderProps extends SliderProps {}

export const VolumeSlider = forwardRef<HTMLDivElement, VolumeSliderProps>(
  (
    {
      className,
      ...other
    }: VolumeSliderProps,
    ref
  ): JSX.Element => {
    const { media } = useContext(MediaContext) || {};
    const [volume, setVolume] = useState(media?.volume || 100);

    useEffect(() => {
      if (media) {
        media.volume = volume / 100;
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
        className={clsx('volume-slider', className)}
        value={volume}
        onChange={handleChange}
        {...other}
      />
    );
  }
);
