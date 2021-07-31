import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  ToggleButton,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';

const BasicExample = () => {
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
          {[
            ['header-one', 'H1'],
            ['header-two', 'H2'],
            ['header-three', 'H3'],
            ['header-four', 'H4'],
            ['header-five', 'H5'],
            ['header-six', 'H6'],
            ['blockquote', 'Blockquote'],
            ['unordered-list-item', 'UL'],
            ['ordered-list-item', 'OL'],
            ['code-block', 'Code Block'],
          ].map(block =>
            <ToggleButton
              key={`basic-block-${block[0]}`}
              value={block[0]}
            >
              {block[1]}
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default BasicExample;
