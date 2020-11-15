import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Slider, IconButton, SliderProps } from '@material-ui/core';
import MediaContext from './MediaContext';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export interface MediaVolumeProps extends React.HTMLAttributes<HTMLDivElement> {
  sliderProps?: SliderProps;
  onChangeVolume?: (volume: number) => void;
}

export const MediaVolume = ({
  className,
  children,
  onChangeVolume,
  sliderProps,
  ...other
}: MediaVolumeProps): JSX.Element => {
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
    <div className={clsx(classes.root, className)} {...other}>
      <IconButton onClick={handleClick}>{children}</IconButton>
      <Slider value={volume} onChange={handleChange} {...sliderProps} />
    </div>
  );
};
