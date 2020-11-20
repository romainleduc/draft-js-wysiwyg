import React, { createRef, useEffect, useState } from 'react';
import { AtomicAudioProps } from './AtomicAudioButton';
import { MuteIconButton } from './MuteIconButton';
import { PlayIconButton } from './PlayIconButton';
import { VolumeSlider } from './VolumeSlider';

interface AudioPrefabProps extends React.HTMLAttributes<HTMLDivElement> {
  atomicAudioProps: AtomicAudioProps;
}

export const AudioPrefab = ({
  atomicAudioProps: {
    customControls,
    playIcon,
    pauseIcon,
    volumeOffIcon,
    volumeMuteIcon,
    volumeDownIcon,
    volumeUpIcon,
    ...audioProps
  },
  ...other
}: AudioPrefabProps): JSX.Element => {
  const audioRef = createRef<HTMLAudioElement>();
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      setAudio(currentAudio);
    }
  }, [audio]);

  const handleChangeVolume = (newValue: number) => {
    setVolume(newValue);
  }

  return (
    <div {...other}>
      <div>
        <audio
          ref={audioRef}
          {...audioProps}
        />
      </div>
      {audio && customControls &&
        customControls(audio)
      }
      {audio && !customControls &&
        <div>
          <PlayIconButton
            media={audio as HTMLMediaElement}
            playIcon={playIcon}
            pauseIcon={pauseIcon}
          />
          <MuteIconButton media={audio as HTMLMediaElement} />
          <VolumeSlider
            media={audio as HTMLMediaElement}
            onChangeVolume={handleChangeVolume}
          />
        </div>
      }
    </div>
  );
}