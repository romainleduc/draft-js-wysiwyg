import React, { useState } from 'react';
import Immutable from 'immutable';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  ToggleButton,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';

const ConfiguringBlockRenderMap = () => {
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
          <ToggleButton value="header-one">
            H1
          </ToggleButton>
          <ToggleButton value="header-two">
            H2
          </ToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor
        placeholder='Enter some text..'
        blockRenderMap={Immutable.Map({
          'header-one': {
            element: 'h1',
          },
          'header-two': {
            element: 'h2'
          },
          'unstyled': {
            element: 'h2'
          }
        })}
      />
    </EditorContainer>
  );
};

export default ConfiguringBlockRenderMap;
