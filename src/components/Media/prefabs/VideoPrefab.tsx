import { makeStyles } from '@material-ui/core';
import React, { createRef, useEffect, useState } from 'react';
const path = require('path');

const useStyles = makeStyles({
  media: {
    display: 'block',
    margin: '0 auto',
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
});

interface VideoPrefabProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | string[];
  videoProps: React.VideoHTMLAttributes<HTMLVideoElement>;
  sourceProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  customControls?: (audio: HTMLAudioElement) => JSX.Element;
}

export const VideoPrefab = ({
  src,
  videoProps,
  sourceProps,
  customControls,
  ...other
}: VideoPrefabProps): JSX.Element => {
  const videoRef = createRef<HTMLVideoElement>();
  const [video, setVideo] = useState<HTMLVideoElement>();
  const classes = useStyles();

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
          className={classes.media}
          ref={videoRef}
          controls={!customControls}
          {...videoProps}
          src={!Array.isArray(src) ? src : undefined}
        >
          {Array.isArray(src) &&
            src.map((srcVideo, key) => {
              const props = sourceProps?.[key];

              return (
                <source
                  src={srcVideo}
                  type={`video/${path.extname(src).substring(1)}`}
                  {...props}
                />
              );
            })}
        </video>
      </div>
      {video && customControls && customControls(video)}
    </div>
  );
};
