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

const AlignSelection = () => {
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <EditorContainer>
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
      <Editor textAlignment={alignment} placeholder='Enter some text..' />
    </EditorContainer>
  );
};

export default AlignSelection;
