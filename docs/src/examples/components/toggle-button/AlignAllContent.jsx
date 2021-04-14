import React, { useState } from 'react';
import { ToggleButtonGroup } from '@material-ui/lab';
import {
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
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <EditorContainer
      editorState={editorState}
      onChange={(newEditorState) => {
        setEditorState(newEditorState);
      }}
    >
      <EditorToolbar>
        <ToggleButtonGroup
          exclusive
          value={alignment}
          onChange={handleAlignment}
          size='small'
        >
          {[
            ['left', <FormatAlignLeft />],
            ['center', <FormatAlignCenter />],
            ['right', <FormatAlignRight />],
          ].map(inline =>
            <TextAlignToggleButton
              ignoreSelection
              key={`align-${inline[0]}`}
              value={inline[0]}
            >
              {inline[1]}
            </TextAlignToggleButton>
          )}
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor
        textAlignment={alignment}
        placeholder='Enter some text..'
      />
    </EditorContainer>
  );
};

export default AlignSelection;
