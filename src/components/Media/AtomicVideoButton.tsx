import React, { forwardRef } from 'react';
import AtomicButton, { AtomicButtonProps } from './AtomicButton';
import { AtomicMediaProps } from './AtomicMediaButton';

export interface AtomicVideoProps
  extends AtomicMediaProps,
    React.VideoHTMLAttributes<HTMLVideoElement> {}

export interface AtomicVideoButtonProps
  extends Omit<AtomicButtonProps, 'mediaType' | 'atomicAudioProps'> {
  atomicVideoProps?: AtomicVideoProps;
}

const AtomicVideoButton = forwardRef<HTMLButtonElement, AtomicVideoButtonProps>(
  ({ children, ...other }: AtomicVideoButtonProps, ref) => {
    return (
      <AtomicButton ref={ref} mediaType="video" {...other}>
        {children}
      </AtomicButton>
    );
  }
);

export default AtomicVideoButton;
