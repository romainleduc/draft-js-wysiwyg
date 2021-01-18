import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertFromHTML,
  EditorState,
  getDefaultKeyBinding as getDraftDefaultKeyBinding,
} from 'draft-js';
import { IndentCommand } from '../components/IndentDraftButton/IndentDraftButton';
import { Media } from '../components/Media';
import { getDefaultDecorator } from './decoratorUtils';

export const getDefaultBlockRenderer = (contentBlock: ContentBlock): any => {
  if (contentBlock.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
};

export const getDefaultBlockStyle = (contentBlock: ContentBlock): string => {
  const textAlign = contentBlock.getData()?.get('textAlign');

  if (textAlign) {
    return `align-${textAlign}`;
  }

  return '';
};

export const getDefaultKeyBinding = (
  e: React.KeyboardEvent<{}>
): string | null => {
  if (e.shiftKey) {
    switch (e.key) {
      case 'Tab':
        return IndentCommand.Decrease;
    }
  } else {
    switch (e.key) {
      case 'Tab':
        return IndentCommand.Increase;
    }
  }

  return getDraftDefaultKeyBinding(e);
};

export const createEditorStateFromHTML = (
  html: string,
  decorator?: CompositeDecorator
): EditorState => {
  const blocksFromHTML = convertFromHTML(html);

  return EditorState.createWithContent(
    ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    ),
    decorator || getDefaultDecorator()
  );
}
