import React from 'react';
import {
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined
} from '@material-ui/icons';
import {
  EditorToolbar,
  BlockTypeToggleButton,
  IndentDraftButton,
  InlineToggleButton,
  TextAlignToggleButton
} from 'draft-js-wysiwyg';
import { generateComponents } from './generateComponents';
import ToggleButtonPrefab from './ToggleButtonPrefab';
import { ButtonGroup } from '@material-ui/core';

const MyEditorToolbar = ({
  align,
  inline,
  blockType,
  list,
  indent,
  isToggleMenu: toggleMenus
}) => {
  const isToggleMenu = (type) => {
    return toggleMenus?.includes(type);
  }

  return (
    <EditorToolbar>
      {blockType &&
        <ToggleButtonPrefab
          isToggleMenu={isToggleMenu("blockType")}
          size="small"
          exclusive={true}
        >
          {generateComponents(
            <BlockTypeToggleButton />,
            [
              ['unstyled', 'Paragraph'],
              ['header-one', 'H1'],
              ['header-two', 'H2'],
              ['header-three', 'H3'],
              ['header-four', 'H4'],
              ['header-five', 'H5'],
              ['header-six', 'H6'],
              ['blockquote', 'Blockquote'],
              ['code-block', 'Code Block'],
            ],
            blockType
          )}
        </ToggleButtonPrefab>
      }
      {inline &&
        <ToggleButtonPrefab
          isToggleMenu={isToggleMenu("inline")}
          size="small"
        >
          {generateComponents(
            <InlineToggleButton />,
            [
              ['BOLD', <FormatBold />],
              ['ITALIC', <FormatItalic />],
              ['UNDERLINE', <FormatUnderlined />],
              ['STRIKETHROUGH', <FormatStrikethrough />],
              ['Code', <Code />],
            ],
            inline
          )}
        </ToggleButtonPrefab>
      }
      {align &&
        <ToggleButtonPrefab
          isToggleMenu={isToggleMenu("align")}
          defaultValue="left"
          size="small"
        >
          {generateComponents(
            <TextAlignToggleButton />,
            [
              ['left', <FormatAlignLeft />],
              ['center', <FormatAlignCenter />],
              ['right', <FormatAlignRight />],
              ['justify', <FormatAlignJustify />],
            ],
            align
          )}
        </ToggleButtonPrefab>
      }
      {list &&
        <ToggleButtonPrefab
          isToggleMenu={isToggleMenu("list")}
          defaultValue={[]}
          size="small"
        >
          {generateComponents(
            <BlockTypeToggleButton />,
            [
              ['unordered-list-item', <FormatListBulleted />],
              ['ordered-list-item', <FormatListNumbered />],
            ],
            list
          )}
        </ToggleButtonPrefab>
      }
      {indent &&
        <ButtonGroup size="small">
          {generateComponents(
            <IndentDraftButton />,
            [
              ['increase', <FormatIndentIncrease />],
              ['decrease', <FormatIndentDecrease />],
            ],
            list
          )}
        </ButtonGroup>
      }
    </EditorToolbar>
  );
}

export default MyEditorToolbar;