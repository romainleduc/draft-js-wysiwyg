import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  EditorContainer,
  Editor,
  EditorToolbar,
  InlineToggleButton,
  EditorProvider,
  ToggleButtonMenu
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';
import { makeStyles } from '@material-ui/core';

const customStyleMaps = [
  {
    group: 'FONT_FAMILY',
    exclusive: true,
    styles: {
      ROBOTO: {
        fontFamily: '"Roboto", sans-serif',
      },
      DANCING: {
        fontFamily: '"Dancing Script", cursive',
      },
      UBUNTU: {
        fontFamily: '"Ubuntu", sans-serif',
      },
    }
  },
  {
    group: 'FONT_SIZE',
    exclusive: true,
    styles: {
      SMALL: { fontSize: 10 },
      MEDIUM: { fontSize: 15 },
      LARGE: { fontSize: 30 },
    }
  },
  {
    group: 'COLOR',
    exclusive: true,
    styles: {
      RED: { color: 'rgba(255, 0, 0, 1.0)' },
      ORANGE: { color: 'rgba(255, 127, 0, 1.0)' },
      YELLOW: { color: 'rgba(180, 180, 0, 1.0)' },
    }
  },
];

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(.5),
  }
}));

const ExtendStyle = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const classes = useStyles();

  return (
    <EditorProvider customStyleMaps={customStyleMaps}>
      <EditorContainer
        editorState={editorState}
        onChange={setEditorState}
      >
        <EditorToolbar>
          <ToggleButtonMenu
            exclusive
            orientation="vertical"
            size="small"
            defaultValue="Font"
            buttonProps={{
              className: classes.button,
            }}
          >
            <InlineToggleButton value="FONT_FAMILY_ROBOTO">
              Roboto
            </InlineToggleButton>
            <InlineToggleButton value="FONT_FAMILY_DANCING">
              Dancing
            </InlineToggleButton>
            <InlineToggleButton value="FONT_FAMILY_UBUNTU">
              Ubuntu
            </InlineToggleButton>
          </ToggleButtonMenu>
          <ToggleButtonMenu
            exclusive
            orientation="vertical"
            size="small"
            defaultValue="Size"
            buttonProps={{
              className: classes.button,
            }}
          >
            <InlineToggleButton value="FONT_SIZE_SMALL">
              Small
            </InlineToggleButton>
            <InlineToggleButton value="FONT_SIZE_MEDIUM">
              Medium
            </InlineToggleButton>
            <InlineToggleButton value="FONT_SIZE_LARGE">
              Large
            </InlineToggleButton>
          </ToggleButtonMenu>
          <ToggleButtonGroup size="small">
            <InlineToggleButton value="COLOR_RED">
              Red
            </InlineToggleButton>
            <InlineToggleButton value="COLOR_ORANGE">
              Orange
            </InlineToggleButton>
            <InlineToggleButton value="COLOR_YELLOW">
              Yellow
            </InlineToggleButton>
          </ToggleButtonGroup>
        </EditorToolbar>
        <Editor placeholder='Enter some text..' />
      </EditorContainer>
    </EditorProvider>
  );
};

export default ExtendStyle;
