import React from 'react';

interface MediaContextType {
  media?: HTMLAudioElement | HTMLVideoElement;
}

const MediaContext = React.createContext<MediaContextType | null>(null);

export default MediaContext;
