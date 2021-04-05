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

const ConfiguringBlockRenderMap = () => {
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
            ['header-one', 'H1'],
            ['header-two', 'H2'],
          ].map(block =>
            <BlockTypeToggleButton
              key={`configuring-block-${block[0]}`}
              value={block[0]}
            >
              {block[1]}
            </BlockTypeToggleButton>
          )}
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
