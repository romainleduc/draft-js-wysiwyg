import React, { forwardRef } from 'react';
import AtomicButton, { AtomicButtonProps } from './AtomicButton';

export interface AtomicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export interface AtomicImageButtonProps extends Omit<AtomicButtonProps, 'mediaType' | 'atomicAudioProps' | 'atomicVideoProps'> {
  atomicImageProps?: AtomicImageProps;
}

const AtomicImageButton = forwardRef<HTMLButtonElement, AtomicImageButtonProps>(
  (
    {
      children,
      ...other
    }: AtomicImageButtonProps,
    ref
  ) => {
    return (
      <AtomicButton
        ref={ref}
        mediaType='video'
        {...other}
      >
        {children}
      </AtomicButton>
    );
  }
);

export default AtomicImageButton;
