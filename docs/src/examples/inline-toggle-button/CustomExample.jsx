import React, { useState } from 'react';
import { ToggleButtonGroup } from '@material-ui/lab';
import {
  EditorContainer,
  Editor,
  EditorToolbar,
  InlineToggleButton,
} from 'draft-js-wysiwyg';

const CustomExample = () => {
  const [size, setSize] = useState('FONT_SIZE_MEDIUM');

  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  return (
    <EditorContainer>
      <EditorToolbar>
        <ToggleButtonGroup
          exclusive
          value={size}
          onChange={handleSize}
          size='small'
        >
          {[
            ['FONT_SIZE_SMALL', 'Small'],
            ['FONT_SIZE_MEDIUM', 'Medium'],
            ['FONT_SIZE_LARGE', 'Large'],
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
      <Editor
        placeholder='Enter some text..'
        customStyleMap={{
          FONT_SIZE_SMALL: {
            fontSize: 10,
          },
          FONT_SIZE_MEDIUM: {
            fontSize: 15,
          },
          FONT_SIZE_LARGE: {
            fontSize: 30,
          }
        }}
      />
    </EditorContainer>
  );
};

export default CustomExample;
