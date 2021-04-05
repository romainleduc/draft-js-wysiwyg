import React, { useState } from 'react';
import Immutable from 'immutable';
import { ToggleButtonGroup } from '@material-ui/lab';
import {
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
  const [block, setBlock] = useState('');

  const handleBlock = (_, newBlock) => {
    setBlock(newBlock);
  };

  return (
    <EditorContainer
      editorState={editorState}
      onChangeEditorState={(newEditorState) => {
        setEditorState(newEditorState);
      }}
    >
      <EditorToolbar>
        <ToggleButtonGroup
          exclusive
          value={block}
          onChange={handleBlock}
          size='small'
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
