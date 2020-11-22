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

interface AudioPrefabProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | string[];
  audioProps: React.AudioHTMLAttributes<HTMLAudioElement>;
  sourceProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  customControls?: (audio: HTMLAudioElement) => JSX.Element;
}

export const AudioPrefab = ({
  src,
  audioProps,
  sourceProps,
  customControls,
  ...other
}: AudioPrefabProps): JSX.Element => {
  const audioRef = createRef<HTMLAudioElement>();
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const classes = useStyles();

  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      setAudio(currentAudio);
    }
  }, [audio]);

  const getSourceType = (src: string) => {
    let name = path.extname(src).substring(1);

    if (name === 'mp3') {
      name = 'mpeg';
    }

    return name;
  };

  return (
    <div {...other}>
      <div>
        <audio
          className={classes.media}
          ref={audioRef}
          controls={!customControls}
          {...audioProps}
          src={!Array.isArray(src) ? src : undefined}
        >
          {Array.isArray(src) &&
            src.map((srcAudio, key) => {
              const props = sourceProps?.[key];

              return (
                <source
                  src={srcAudio}
                  type={`audio/${getSourceType(srcAudio)}`}
                  {...props}
                />
              );
            })}
        </audio>
      </div>
      {audio && customControls && customControls(audio)}
    </div>
  );
};
