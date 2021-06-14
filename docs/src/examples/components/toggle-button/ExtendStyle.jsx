import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';

const ExtendStyle = () => {
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
            ['FONT_SIZE_SMALL', 'Small'],
            ['FONT_SIZE_MEDIUM', 'Medium'],
            ['FONT_SIZE_LARGE', 'Large'],
          ].map(inline =>
            <ToggleButton
              key={`inline-${inline[0]}`}
              value={inline[0]}
            >
              {inline[1]}
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor
        placeholder='Enter some text..'
        customStyleMap={{
          FONT_SIZE_SMALL: { fontSize: 10 },
          FONT_SIZE_MEDIUM: { fontSize: 15 },
          FONT_SIZE_LARGE: { fontSize: 30 }
        }}
      />
    </EditorContainer>
  );
};

export default ExtendStyle;
