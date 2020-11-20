import React, { forwardRef } from 'react';
import AtomicButton, { AtomicButtonProps } from './AtomicButton';
import { AtomicMediaProps } from './AtomicMediaButton';

export interface AtomicAudioProps
  extends AtomicMediaProps,
    React.AudioHTMLAttributes<HTMLAudioElement> {}

export interface AtomicAudioButtonProps
  extends Omit<AtomicButtonProps, 'mediaType' | 'atomicVideoProps'> {
  atomicAudioProps?: AtomicAudioProps;
}

const AtomicAudioButton = forwardRef<HTMLButtonElement, AtomicAudioButtonProps>(
  ({ children, ...other }: AtomicAudioButtonProps, ref) => {
    return (
      <AtomicButton ref={ref} mediaType="audio" {...other}>
        {children}
      </AtomicButton>
    );
  }
);

export default AtomicAudioButton;
