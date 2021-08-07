import React, { useContext } from 'react';
import {
  Popper,
  PopperProps,
  Paper,
  ClickAwayListener,
  ButtonProps,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import {
  ToggleButtonGroupProps,
} from '../ToggleButtonGroup';
import EditorContext from '../Editor/EditorContext';
import BaseButton from '../BaseButton/BaseButton';
import InlineToggleButton from '../InlineToggleButton';
import TextAlignToggleButton from '../TextAlignToggleButton';
import { BlockTypeToggleButton } from '../BlockTypeToggleButton';
import { RichUtils } from 'draft-js';

export interface ToggleButtonMenuProps extends ToggleButtonGroupProps {
  label?: string;
  exclusive?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  popperProps?: PopperProps;
  children?: React.ReactNode;
  defaultValue?: string | string[];
  buttonProps: ButtonProps;
  choices: { label: string, value: string }[];
  type: 'inline' | 'blockType' | 'textAlign';
}

const SelectMenu = ({
  label = '',
  type,
  exclusive,
  openIcon = <ArrowDropUp />,
  closeIcon = <ArrowDropDown />,
  popperProps,
  children,
  disableKeyboardShortcuts,
  size = 'medium',
  buttonProps,
  defaultValue,
  choices,
  ...other
}: ToggleButtonMenuProps): JSX.Element => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const { editorState } = useContext(EditorContext) || {};

  let ToggleButton;
  let textButton;

  if (editorState) {
    switch (type) {
      case 'inline':
        ToggleButton = InlineToggleButton;
        textButton = editorState
          .getCurrentInlineStyle()
          .toArray()
          .map(inlineStyle => {
            const choice = choices.find(({ value }) => value === inlineStyle);

            if (choice) {
              return choice.label;
            }
          })
          .join(',');
        break;
      case 'blockType':
        ToggleButton = BlockTypeToggleButton;
        textButton = choices.find(({ value }) => value === RichUtils.getCurrentBlockType(editorState))?.label;
        break;
      case 'textAlign':
        ToggleButton = TextAlignToggleButton
        textButton = editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
          .getData()
          .toArray()
          .map(textAlign => {
            const choice = choices.find(({ value }) => value === textAlign);

            if (choice) {
              return choice.label;
            }
          })
          .join(',')
        break;
    }
  }

  const handleClick = () => {
    if (exclusive) {
      setOpen(false);
    }
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BaseButton
        ref={anchorRef}
        endIcon={open ? openIcon : closeIcon}
        onClick={handleToggle}
        size={size}
        {...buttonProps}
      >
        {textButton || label}
      </BaseButton>
      <Popper
        style={{ zIndex: 2 }}
        anchorEl={anchorRef.current}
        open={open}
        {...popperProps}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              {choices.map(choice =>
                <MenuItem
                  forceSelection
                  component={ToggleButton}
                  onClick={handleClick}
                  size={size}
                  value={choice.value}
                  fullWidth
                >
                  {choice.label}
                </MenuItem>
              )}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default SelectMenu;