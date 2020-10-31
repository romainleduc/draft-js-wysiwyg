import React, { useState } from 'react';
import { ToggleButtonGroup } from '@material-ui/lab';
import {
  EditorContainer,
  Editor,
  EditorToolbar,
  InlineToggleButton,
} from 'draft-js-wysiwyg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme => ({
  root: {
    width: 184.8,
  },
})));

const CustomExample = () => {
  const [size, setSize] = useState('FONT_SIZE_MEDIUM');
  const classes = useStyles();

  const handleSize = (event, newSize) => {
    setSize(newSize);
  };

  return (
    <EditorContainer className={classes.root}>
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
        className={classes.editor}
        placeholder='Enter some text..'
        customStyleMap={{
          FONT_SIZE_SMALL: {
            fontSize: '10px',
          },
          FONT_SIZE_MEDIUM: {
            fontSize: '15px',
          },
          FONT_SIZE_LARGE: {
            fontSize: '30px',
          }
        }}
      />
    </EditorContainer>
  );
};

export default CustomExample;
