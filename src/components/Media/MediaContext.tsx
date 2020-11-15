import React from 'react';

interface MediaContextType {
  media?: HTMLMediaElement;
}

const MediaContext = React.createContext<MediaContextType | null>(null);

export default MediaContext;
