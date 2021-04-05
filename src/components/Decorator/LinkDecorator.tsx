import React from 'react';

const LinkDecorator = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();

  return <a href={url}>{props.children}</a>;
};

export default LinkDecorator;
