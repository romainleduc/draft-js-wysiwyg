import React, { forwardRef } from 'react';
import { SlideProps } from '@material-ui/core';
import AtomicButton, { AtomicButtonProps } from './AtomicButton';

export interface AtomicMediaProps {
  customControls?: (audio: HTMLMediaElement) => JSX.Element;
  sourcesProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  volumeOffIcon?: React.ReactNode;
  volumeMuteIcon?: React.ReactNode;
  volumeDownIcon?: React.ReactNode;
  volumeUpIcon?: React.ReactNode;
  sliderProps?: SlideProps;
}

export interface AtomicMediaButtonProps extends AtomicButtonProps {}

const AtomicMediaButton = forwardRef<HTMLButtonElement, AtomicMediaButtonProps>(
  (
    {
      children,
      ...other
    }: AtomicMediaButtonProps,
    ref
  ) => {
    return (
      <AtomicButton
        ref={ref}
        {...other}
      >
        {children}
      </AtomicButton>
    );
  }
);

export default AtomicMediaButton;
