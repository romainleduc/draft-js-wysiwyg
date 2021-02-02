import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import { findEntitiesRangeByType } from './blockUtils';
import ImageDecorator from '../components/Decorator/ImageDecorator';
import LinkDecorator from '../components/Decorator/LinkDecorator';

export const getDefaultDecorator = () => {
  return new CompositeDecorator([
    {
      strategy: findImageEntities,
      component: ImageDecorator,
    },
    {
      strategy: findLinkEntities,
      component: LinkDecorator,
    },
  ]);
};

export const findImageEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  findEntitiesRangeByType(contentBlock, callback, contentState, 'IMAGE');
};

export const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  findEntitiesRangeByType(contentBlock, callback, contentState, 'LINK');
};
