import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { render } from 'test-utils';
import { EditorContainer } from '../EditorContainer';
import ToggleButton from './ToggleButton';

let editorState: EditorState;

beforeEach(() => {
  editorState = EditorState.createEmpty();
});

test('should not add class `selected` to root element if its value is not present in current inline style', () => {
  const { getByTestId } = render(
    <EditorContainer editorState={editorState} onChange={() => {}}>
      <ToggleButton data-testid="root" value="BOLD">
        Bold
      </ToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).not.toHaveClass('Mui-selected');
});

test('should add class `selected` to root element if its value is present in current inline style', () => {
  const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');

  const { getByTestId } = render(
    <EditorContainer editorState={newEditorState} onChange={() => {}}>
      <ToggleButton data-testid="root" value="BOLD">
        Bold
      </ToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).toHaveClass('Mui-selected');
});

test('should not add class `selected` to root element if its value is not equal to the current block type', () => {
  const { getByTestId } = render(
    <EditorContainer editorState={editorState} onChange={() => {}}>
      <ToggleButton data-testid="root" value="header-one">
        H1
      </ToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).not.toHaveClass('Mui-selected');
});

test('should add class `selected` to root element if its value is equal to the current block type', () => {
  const newEditorState = RichUtils.toggleBlockType(editorState, 'header-one');

  const { getByTestId } = render(
    <EditorContainer editorState={newEditorState} onChange={() => {}}>
      <ToggleButton data-testid="root" value="header-one">
        H1
      </ToggleButton>
    </EditorContainer>
  );

  expect(getByTestId('root')).toHaveClass('Mui-selected');
});
