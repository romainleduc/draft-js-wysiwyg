import React, { useState } from 'react';
import Immutable from 'immutable';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  BlockTypeToggleButton,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';

const ExtendBlockRenderMap = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  return (
    <EditorContainer
      editorState={editorState}
      onChange={setEditorState}
    >
      <EditorToolbar>
        <ToggleButtonGroup size='small'
        >
          {[
            ['section', 'Section'],
            ['blockquote', 'Blockquote'],
          ].map(block =>
            <BlockTypeToggleButton
              key={`extend-block-${block[0]}`}
              value={block[0]}
            >
              {block[1]}
            </BlockTypeToggleButton>
          )}
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor
        placeholder='Enter some text..'
        blockRenderMapIsExpandable
        blockRenderMap={Immutable.Map({
          'section': {
            element: 'section'
          },
          'unstyled': {
            element: 'div'
          }
        })}
      />
    </EditorContainer>
  );
};

export default ExtendBlockRenderMap;
