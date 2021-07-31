import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  ToggleButton,
} from 'draft-js-wysiwyg';
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from '@material-ui/icons';
import { EditorState } from 'draft-js';

const AlignSelection = () => {
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
          <ToggleButton
            ignoreSelection
            value="left"
          >
            <FormatAlignLeft />
          </ToggleButton>
          <ToggleButton
            ignoreSelection
            value="center"
          >
            <FormatAlignCenter />
          </ToggleButton>
          <ToggleButton
            ignoreSelection
            value="right"
          >
            <FormatAlignRight />
          </ToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default AlignSelection;
