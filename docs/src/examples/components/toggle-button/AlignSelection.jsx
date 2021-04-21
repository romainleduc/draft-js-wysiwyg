import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  TextAlignToggleButton,
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
          <TextAlignToggleButton value="left">
            <FormatAlignLeft />
          </TextAlignToggleButton>
          <TextAlignToggleButton value="center" >
            <FormatAlignCenter />
          </TextAlignToggleButton>
          <TextAlignToggleButton value="right" >
            <FormatAlignRight />
          </TextAlignToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default AlignSelection;
