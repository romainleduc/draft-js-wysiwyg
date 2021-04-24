import { EditorState, RichUtils } from 'draft-js';
import React from 'react';
import { render } from 'test-utils';
import { EditorContainer } from '../EditorContainer';
import BlockTypeToggleButton from './BlockTypeToggleButton';

let editorState: EditorState;

beforeEach(() => {
  editorState = EditorState.createEmpty();
});

test('should not add class `selected` to root element if its value is not equal to the current block type', () => {
  const { getByTestId } = render(
    <EditorContainer editorState={editorState} onChange={() => {}}>
      <BlockTypeToggleButton data-testid="root" value="header-one">
        H1
      </BlockTypeToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).not.toHaveClass('Mui-selected');
});

test('should add class `selected` to root element if its value is equal to the current block type', () => {
  const newEditorState = RichUtils.toggleBlockType(editorState, 'header-one');

  const { getByTestId } = render(
    <EditorContainer editorState={newEditorState} onChange={() => {}}>
      <BlockTypeToggleButton data-testid="root" value="header-one">
        H1
      </BlockTypeToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).toHaveClass('Mui-selected');
});