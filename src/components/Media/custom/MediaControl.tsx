import React, { forwardRef } from 'react';
import MediaContext from './MediaContext';
import clsx from 'clsx';

export interface MediaControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  media: HTMLAudioElement | HTMLVideoElement | HTMLMediaElement;
}

const MediaControl = forwardRef<HTMLDivElement, MediaControlProps>(
  (
    { className, children, media, ...other }: MediaControlProps,
    ref
  ): JSX.Element => {
    return (
      <MediaContext.Provider value={{ media }}>
        <div className={clsx('media-control', className)} ref={ref} {...other}>
          {children}
        </div>
      </MediaContext.Provider>
    );
  }
);

export default MediaControl;
