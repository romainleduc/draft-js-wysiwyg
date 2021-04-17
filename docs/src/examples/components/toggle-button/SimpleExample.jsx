import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  InlineToggleButton,
} from 'draft-js-wysiwyg';
import {
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  FormatUnderlined,
  Code,
} from '@material-ui/icons';
import { EditorState } from 'draft-js';

const SimpleExample = () => {
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
            ['BOLD', <FormatBold />],
            ['ITALIC', <FormatItalic />],
            ['STRIKETHROUGH', <FormatStrikethrough />],
            ['UNDERLINE', <FormatUnderlined />],
            ['CODE', <Code />],
          ].map(inline =>
            <InlineToggleButton
              key={`inline-${inline[0]}`}
              value={inline[0]}
            >
              {inline[1]}
            </InlineToggleButton>
          )}
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default SimpleExample;
