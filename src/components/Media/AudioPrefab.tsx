import React, { createRef, useEffect, useState } from 'react';

interface AudioPrefabProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | string[];
  audioProps: React.AudioHTMLAttributes<HTMLAudioElement>;
  customControls?: (audio: HTMLAudioElement) => JSX.Element;
}

export const AudioPrefab = ({
  src,
  audioProps,
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

  return (
    <div {...other}>
      <div>
        <audio
          ref={audioRef}
          controls={!customControls}
          {...audioProps}
          src={!Array.isArray(src) ? src : undefined}
        />
      </div>
      {audio && customControls && customControls(audio)}
    </div>
  );
};
