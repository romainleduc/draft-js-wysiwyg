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
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme => ({
  root: {
    width: 196,
  },
  editor: {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 0,
    minHeight: 60,
    padding: 5,
  }
})));

const SimpleExample = () => {
  const [formats, setFormats] = useState(() => []);
  const classes = useStyles();

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <EditorContainer className={classes.root}>
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
      <Editor
        className={classes.editor}
        placeholder='Begin typing...'
      />
    </EditorContainer>
  );
};

export default SimpleExample;
