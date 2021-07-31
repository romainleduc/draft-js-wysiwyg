import React from 'react';
import {
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined
} from '@material-ui/icons';
import {
  EditorToolbar,
  ToggleButton,
} from 'draft-js-wysiwyg';
import { generateComponents } from './generateComponents';
import ToggleButtonPrefab from './ToggleButtonPrefab';

const MyEditorToolbar = ({
  align,
  inline,
  blockType,
  list,
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
            <ToggleButton />,
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
            <ToggleButton />,
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
            <ToggleButton />,
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
            <ToggleButton />,
            [
              ['unordered-list-item', <FormatListBulleted />],
              ['ordered-list-item', <FormatListNumbered />],
            ],
            list
          )}
        </ToggleButtonPrefab>
      }
    </EditorToolbar>
  );
}

export default MyEditorToolbar;