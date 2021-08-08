import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  InlineToggleButton,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';

const SimpleExample = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  return (
    <EditorContainer
      editorState={editorState}
      onChange={setEditorState}
    >
      <EditorToolbar>
        <ToggleButtonGroup size='small'>
          <InlineToggleButton value="BOLD">
            Bold
          </InlineToggleButton>
          <InlineToggleButton value="ITALIC">
            Italic
          </InlineToggleButton>
          <InlineToggleButton value="STRIKETHROUGH">
            Strikethrough
          </InlineToggleButton>
          <InlineToggleButton value="UNDERLINE">
            Underline
          </InlineToggleButton>
          <InlineToggleButton value="CODE">
            Code
          </InlineToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default SimpleExample;
