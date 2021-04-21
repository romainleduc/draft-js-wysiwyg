import React, { useContext } from 'react';
import {
  Popper,
  PopperProps,
  Paper,
  ClickAwayListener,
  ButtonProps,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import {
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '../ToggleButtonGroup';
import EditorContext from '../EditorContext';
import { RichUtils } from 'draft-js';
import BaseButton from '../BaseButton/BaseButton';

export interface ToggleButtonMenuProps extends ToggleButtonGroupProps {
  exclusive?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  popperProps?: PopperProps;
  children?: React.ReactNode;
  defaultValue?: string | string[];
  buttonProps: ButtonProps;
}

const ToggleButtonMenu = ({
  exclusive,
  openIcon = <ArrowDropUp />,
  closeIcon = <ArrowDropDown />,
  popperProps,
  children,
  size = 'medium',
  buttonProps,
  ...other
}: ToggleButtonMenuProps): JSX.Element => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const { editorState } = useContext(EditorContext) || {};

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
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          const value = child.props.value;

          if (editorState) {
            if (
              editorState.getCurrentInlineStyle().toArray().includes(value) ||
              RichUtils.getCurrentBlockType(editorState) === value
            ) {
              return child.props.children;
            }
          }
        })}
      </BaseButton>
      <Popper
        style={{ zIndex: 2 }}
        anchorEl={anchorRef.current}
        open={open}
        {...popperProps}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <ToggleButtonGroup {...other} ref={other?.ref as any}>
              {React.Children.map(children, (child: any, key) => {
                if (child) {
                  return React.cloneElement(child, {
                    onClick: handleClick,
                    forceSelection: true,
                    size,
                  });
                }
              })}
            </ToggleButtonGroup>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default ToggleButtonMenu;
