import React, { createRef, useState, useEffect } from 'react';
import MediaContext from './MediaContext';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    color: 'white',
  },
  body: {
    display: 'flex',
  },
});

interface AudioContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  audioProps: React.AudioHTMLAttributes<HTMLAudioElement>;
  customControls?: (audio: HTMLMediaElement) => JSX.Element;
}

export const AudioContainer = ({
  className,
  audioProps,
  customControls,
  children,
  ...other
}: AudioContainerProps): JSX.Element => {
  const audioRef = createRef<HTMLAudioElement>();
  const [media, setMedia] = useState<HTMLMediaElement>();
  const classes = useStyles();

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      setMedia(audio);
    }
  }, [media]);

  return (
    <MediaContext.Provider
      value={{
        media,
      }}
    >
      <div className={clsx(classes.root, className)} {...other}>
        <div>
          <audio ref={audioRef} {...audioProps} />
        </div>
        {customControls && media && customControls(media)}
        {!customControls && <div className={classes.body}>{children}</div>}
      </div>
    </MediaContext.Provider>
  );
};
