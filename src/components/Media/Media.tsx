import React from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import { AudioPrefab } from './prefabs/AudioPrefab';
import { VideoPrefab } from './prefabs/VideoPrefab';
import { ImagePrefab } from './prefabs/ImagePrefab';

export interface MediaData {
  title?: string;
  src: string;
  alt?: string;
}

export type MediaType = 'image' | 'video' | 'audio' | 'embedded_link';

export interface MediaProps {
  contentState: ContentState;
  block: ContentBlock;
}

export const Media = (props: MediaProps): JSX.Element => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const {
    mediaType,
    src,
    mediaProps,
    customControls,
    sourceProps,
  } = entity.getData();

  return (
    <>
      {mediaType === 'image' && (
        <ImagePrefab src={src} sourceProps={sourceProps} {...mediaProps} />
      )}
      {mediaType === 'audio' && (
        <AudioPrefab
          src={src}
          audioProps={mediaProps}
          customControls={customControls}
          sourceProps={sourceProps}
        />
      )}
      {mediaType === 'video' && (
        <VideoPrefab
          src={src}
          videoProps={mediaProps}
          customControls={customControls}
          sourceProps={sourceProps}
        />
      )}
      {/*         
      {type === 'embedded_link' && (
        <iframe
          frameBorder="0"
          allowFullScreen
          title="Wysiwyg Embedded Content"
          {...iframeProps}
        />
      )} */}
    </>
  );
};
