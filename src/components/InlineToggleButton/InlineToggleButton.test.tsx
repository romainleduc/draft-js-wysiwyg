import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { render } from 'test-utils';
import { EditorContainer } from '../EditorContainer';
import InlineToggleButton from './InlineToggleButton';

let editorState: EditorState;

beforeEach(() => {
  editorState = EditorState.createEmpty();
});

test('should not add class `selected` to root element if its value is not present in current inline style', () => {
  const { getByTestId } = render(
    <EditorContainer editorState={editorState} onChange={() => {}}>
      <InlineToggleButton data-testid="root" value="BOLD">
        Bold
      </InlineToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).not.toHaveClass('Mui-selected');
});

test('should add class `selected` to root element if its value is present in current inline style', () => {
  const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');

  const { getByTestId } = render(
    <EditorContainer editorState={newEditorState} onChange={() => {}}>
      <InlineToggleButton data-testid="root" value="BOLD">
        Bold
      </InlineToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).toHaveClass('Mui-selected');
});