import React, { createRef, useEffect, useState } from 'react';
const path = require('path');

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
