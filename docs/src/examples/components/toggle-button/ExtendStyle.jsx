import React, { useState } from 'react';
import {
  EditorContainer,
  Editor,
  EditorToolbar,
  EditorProvider,
  SelectMenu
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';
import { Colorize as ColorizeIcon } from '@material-ui/icons';

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

const ExtendStyle = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  return (
    <EditorProvider customStyleMaps={customStyleMaps}>
      <EditorContainer
        editorState={editorState}
        onChange={setEditorState}
      >
        <EditorToolbar>
          <SelectMenu
            exclusive
            label="Font family"
            size="small"
            type="inline"
            choices={[
              {
                label: 'Roboto',
                value: 'FONT_FAMILY_ROBOTO',
              },
              {
                label: 'Dancing',
                value: 'FONT_FAMILY_DANCING',
              },
              {
                label: 'Ubuntu',
                value: 'FONT_FAMILY_UBUNTU',
              },
            ]}
          />
          <SelectMenu
            exclusive
            label="Size"
            size="small"
            type="inline"
            choices={[
              {
                label: 'Small',
                value: 'FONT_SIZE_SMALL',
              },
              {
                label: 'Medium',
                value: 'FONT_SIZE_MEDIUM',
              },
              {
                label: 'Large',
                value: 'FONT_SIZE_LARGE',
              },
            ]}
          />
          <SelectMenu
            exclusive
            label={<ColorizeIcon />}
            size="small"
            type="inline"
            choices={[
              {
                label: 'Red',
                value: 'COLOR_RED',
              },
              {
                label: 'Orange',
                value: 'COLOR_ORANGE',
              },
              {
                label: 'Yellow',
                value: 'COLOR_YELLOW',
              },
            ]}
          />
        </EditorToolbar>
        <Editor placeholder='Enter some text..' />
      </EditorContainer>
    </EditorProvider>
  );
};

export default ExtendStyle;
