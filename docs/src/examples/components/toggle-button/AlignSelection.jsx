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
          <ToggleButton value="align-left-selection">
            <FormatAlignLeft />
          </ToggleButton>
          <ToggleButton value="align-center-selection" >
            <FormatAlignCenter />
          </ToggleButton>
          <ToggleButton value="align-right-selection" >
            <FormatAlignRight />
          </ToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default AlignSelection;
