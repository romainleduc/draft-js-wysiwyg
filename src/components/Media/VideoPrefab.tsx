import React, { createRef, useEffect, useState } from 'react';

interface VideoPrefabProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | string[];
  videoProps: React.VideoHTMLAttributes<HTMLVideoElement>;
  customControls?: (audio: HTMLAudioElement) => JSX.Element;
}

export const VideoPrefab = ({
  src,
  videoProps,
  customControls,
  ...other
}: VideoPrefabProps): JSX.Element => {
  const videoRef = createRef<HTMLVideoElement>();
  const [video, setVideo] = useState<HTMLVideoElement>();

  useEffect(() => {
    const currentVideo = videoRef.current;

    if (currentVideo) {
      setVideo(currentVideo);
    }
  }, [video]);

  return (
    <div {...other}>
      <div>
        <video
          ref={videoRef}
          controls={!customControls}
          {...videoProps}
          src={!Array.isArray(src) ? src : undefined}
        />
      </div>
      {video && customControls && customControls(video)}
    </div>
  );
};
