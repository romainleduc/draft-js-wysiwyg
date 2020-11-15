import React, { useEffect, useState, createRef } from 'react';
import { Slider, SliderProps } from '@material-ui/core';
import { MediaVolumn } from './MediaVolumn';
import MediaContext from './MediaContext';

interface AudioProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
  playIcon: any;
}

export const AudioTest = ({ playIcon, muted, ...other }: AudioProps) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = createRef<HTMLAudioElement>();

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && duration === 0) {
      setDuration(audio.duration);
    }
  });

  const handlePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }

      setPlaying(!playing);
    }
  };

  const handleSliderChange = (event, newCurrentTime: number) => {
    const audio = audioRef.current;

    if (audio) {
      audio.currentTime = newCurrentTime;
    }
  };

  return (
    <div className="audio">
      <div>
        <audio
          ref={audioRef}
          onTimeUpdate={(e) => {
            setCurrentTime(e.target.currentTime);
          }}
          onEnded={() => {
            setPlaying(false);
          }}
          {...other}
        />
      </div>
      <div>
        <button onClick={handlePlay}>{playing ? 'Pause' : 'Play'}</button>
        {/* <MediaVolumn
          offIcon={offIcon}
          muteIcon={muteIcon}
          downIcon={downIcon}
          offIcon={offIcon}
          muted={muted}
        />
        <Slider
          value={currentTime}
          onChange={handleSliderChange}
          min={0}
          max={duration}
        /> */}
      </div>
    </div>
  );
};
