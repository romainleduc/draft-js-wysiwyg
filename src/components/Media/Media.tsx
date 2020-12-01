import React from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import AtomicImagePrefab from './prefabs/AtomicImagePrefab';
import AtomicMediaPrefab from './prefabs/AtomicMediaPrefab';
import AtomicIframePrefab from './prefabs/AtomicIframePrefab';

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
  const { atomicMediaProps, atomicImageProps, atomicIframeProps, mediaType } = entity.getData();

  return (
    <>
      {atomicImageProps ? (
        <AtomicImagePrefab {...atomicImageProps} />
      ) : atomicMediaProps ? (
        <AtomicMediaPrefab {...atomicMediaProps} />
      ): atomicIframeProps ? (
        <AtomicIframePrefab {...atomicIframeProps} />
      ): null}
    </>
  );
};
