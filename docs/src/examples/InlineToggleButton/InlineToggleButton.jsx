import React, { useState } from 'react';
import { ToggleButtonGroup } from '@material-ui/lab';
import {
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

const SimpleExample = () => {
  const [formats, setFormats] = useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <EditorContainer>
      <EditorToolbar>
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          size='small'
        >
          {[
            ['BOLD', <FormatBold />],
            ['ITALIC', <FormatItalic />],
            ['STRIKETHROUGH', <FormatStrikethrough />],
            ['UNDERLINE', <FormatUnderlined />],
            ['CODE', <Code />],
          ].map(inline =>
            <InlineToggleButton value={inline[0]}>
              {inline[1]}
            </InlineToggleButton>
          )}
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor />
    </EditorContainer>
  );
};

export default SimpleExample;
