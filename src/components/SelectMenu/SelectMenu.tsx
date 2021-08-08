import React, { useContext } from 'react';
import {
  Popper,
  PopperProps,
  Paper,
  ClickAwayListener,
  ButtonProps,
  MenuList,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { ToggleButtonGroupProps } from '../ToggleButtonGroup';
import EditorContext from '../Editor/EditorContext';
import BaseButton from '../BaseButton/BaseButton';
import InlineToggleButton from '../InlineToggleButton';
import TextAlignToggleButton from '../TextAlignToggleButton';
import { BlockTypeToggleButton } from '../BlockTypeToggleButton';
import { RichUtils } from 'draft-js';

export interface ToggleButtonMenuProps extends ToggleButtonGroupProps {
  minWidth?: number;
  maxWidth?: number;
  label?: string;
  exclusive?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  popperProps?: PopperProps;
  children?: React.ReactNode;
  defaultValue?: string | string[];
  buttonProps: ButtonProps;
  choices: { label: string; value: string }[];
  type: 'inline' | 'blockType' | 'textAlign';
}

const useStyles = makeStyles((theme) => ({
  menuItem: {
    border: 'none',
  },
  select: {},
}));

const SelectMenu = ({
  className,
  minWidth = 0,
  maxWidth = 200,
  label = '',
  type,
  exclusive,
  openIcon = <ArrowDropUp />,
  closeIcon = <ArrowDropDown />,
  popperProps,
  disableKeyboardShortcuts,
  size = 'medium',
  buttonProps,
  choices,
}: ToggleButtonMenuProps): JSX.Element => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const { editorState } = useContext(EditorContext) || {};
  const classes = useStyles();

  let textButton;

  if (editorState) {
    switch (type) {
      case 'inline':
        const inlineStyles: string[] = [];
        editorState
          .getCurrentInlineStyle()
          .toArray()
          .forEach((inlineStyle) => {
            const choice = choices.find(({ value }) => value === inlineStyle);

            if (choice) {
              inlineStyles.push(choice.label);
            }
          });
        textButton = inlineStyles.join(',');
        break;
      case 'blockType':
        textButton = choices.find(
          ({ value }) => value === RichUtils.getCurrentBlockType(editorState)
        )?.label;
        break;
      case 'textAlign':
        textButton = editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
          .getData()
          .toArray()
          .map((textAlign) => {
            const choice = choices.find(({ value }) => value === textAlign);

            if (choice) {
              return choice.label;
            }
          })
          .join(',');
        break;
    }
  }

  const handleClick = () => {
    if (exclusive) {
      setOpen(false);
    }
  };

  const handleToggleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleToggleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className} style={{ minWidth, maxWidth }}>
      <BaseButton
        ref={anchorRef}
        endIcon={open ? openIcon : closeIcon}
        onMouseDown={handleToggleMouseDown}
        onClick={handleToggleClick}
        size={size}
        fullWidth
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
        <Paper style={{ minWidth, maxWidth }}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              {choices.map((choice) => {
                const props = {
                  className: classes.menuItem,
                  // forceSelection: true,
                  onClick: handleClick,
                  component: MenuItem,
                  size,
                  value: choice.value,
                  children: choice.label,
                  disableKeyboardShortcuts,
                };

                switch (type) {
                  case 'inline':
                    return <InlineToggleButton {...props} />;
                  case 'blockType':
                    return <BlockTypeToggleButton {...props} />;
                  case 'textAlign':
                    return <TextAlignToggleButton {...props} />;
                  default:
                    return null;
                }
              })}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};

export default SelectMenu;
