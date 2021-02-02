import React from 'react';
import { AtomicImage } from '../Media/Media';

const ImageDecorator = (props: any) => {
  const imageProps = props.contentState.getEntity(props.entityKey).getData();

  return <AtomicImage {...imageProps} />;
};

export default ImageDecorator;
