import React, { useContext } from 'react';
import {
  Button,
  Popper,
  PopperProps,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import {
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '../ToggleButtonGroup';
import EditorContext from '../EditorContext';
import { RichUtils } from 'draft-js';

export interface ToggleButtonMenuProps {
  exclusive?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  popperProps?: PopperProps;
  toggleButtonGroupProps?: ToggleButtonGroupProps;
  children?: React.ReactNode;
  defaultValue?: string | string[];
}

const ToggleButtonMenu = ({
  exclusive,
  openIcon = <ArrowDropUp />,
  closeIcon = <ArrowDropDown />,
  popperProps,
  toggleButtonGroupProps,
  children,
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
      <Button
        ref={anchorRef}
        endIcon={open ? openIcon : closeIcon}
        variant="contained"
        onClick={handleToggle}
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
      </Button>
      <Popper
        style={{ zIndex: 2 }}
        anchorEl={anchorRef.current}
        open={open}
        {...popperProps}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <ToggleButtonGroup
              orientation="vertical"
              {...toggleButtonGroupProps}
              ref={toggleButtonGroupProps?.ref as any}
            >
              {React.Children.map(children, (child: any, key) => {
                if (child) {
                  return React.cloneElement(child, {
                    onClick: handleClick,
                    forceSelection: true,
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
