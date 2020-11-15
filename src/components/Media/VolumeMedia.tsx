import React, { useState, useEffect, useContext, forwardRef } from 'react';
import {
  makeStyles,
  Slider,
  IconButton,
  SliderProps,
  IconButtonProps,
} from '@material-ui/core';
import MediaContext from './MediaContext';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
});

export interface VolumeMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  iconButtonProps?: IconButtonProps;
  sliderProps?: SliderProps;
  onChangeVolume?: (volume: number) => void;
}

export const VolumeMedia = forwardRef<HTMLDivElement, VolumeMediaProps>(
  (
    {
      className,
      children,
      onChangeVolume,
      iconButtonProps,
      sliderProps,
      ...other
    }: VolumeMediaProps,
    ref
  ): JSX.Element => {
    const [volume, setVolume] = useState<number>(100);
    const { media } = useContext(MediaContext) || {};
    const [isMuted, setIsMuted] = useState(media?.muted || false);
    const classes = useStyles();

    useEffect(() => {
      if (media) {
        if (isMuted) {
          media.volume = 0;
        } else {
          media.volume = volume / 100;
        }

        onChangeVolume?.(media.volume);
      }
    }, [isMuted]);

    useEffect(() => {
      if (media && !isMuted) {
        media.volume = volume / 100;
        onChangeVolume?.(media.volume);
      }
    }, [volume]);

    const handleChange = (e: any, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) {
        setVolume(newValue);
      }
    };

    const handleClick = () => {
      setIsMuted(!isMuted);
    };

    return (
      <div ref={ref} className={clsx(classes.root, className)} {...other}>
        <IconButton {...iconButtonProps} onClick={handleClick}>
          {children}
        </IconButton>
        <Slider value={volume} onChange={handleChange} {...sliderProps} />
      </div>
    );
  }
);
