import React, { forwardRef, useState, useRef } from 'react';
import { Button, ButtonProps, PopoverProps, Popover } from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';
import { ToggleButtonGroupProps } from '@material-ui/lab';
import { DraftToggleButtonGroup } from '../DraftToggleButtonGroup';

export interface SelectToggleButtonGroupProps
  extends Omit<ToggleButtonGroupProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  button?: React.ReactElement<any, any>;
  buttonProps?: ButtonProps;
  popoverProps?: PopoverProps;
  value: string;
}

const SelectToggleButtonGroup = forwardRef<
  HTMLDivElement,
  SelectToggleButtonGroupProps
>(
  (
    {
      disableKeyboardShortcuts,
      popoverProps,
      button,
      buttonProps,
      exclusive,
      value,
      onChange,
      children,
      ...other
    }: SelectToggleButtonGroupProps,
    ref
  ) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const ButtonComponent = button || <Button />;

    const handlechange = (event: any, buttonValue: any) => {
      if (!onChange) {
        return;
      }

      // if (exclusive) {
      //   setOpen(false);
      // }

      // setSelectedValue(buttonValue);
      // onChange(event, event.target.value);
    };

    const handleClick = (event: any) => {
      console.log(event, event.currentTarget);
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        {React.cloneElement(
          ButtonComponent,
          {
            onClick: handleClick,
            endIcon: Boolean(anchorEl) ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            ),
            role: undefined,
            ...buttonProps,
          },
          ['Test']
        )}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          {...popoverProps}
        >
          <DraftToggleButtonGroup
            ref={null as any}
            value={value}
            onChange={handlechange}
            {...other}
          >
            {children}
          </DraftToggleButtonGroup>
        </Popover>
      </div>
    );
  }
);

export default SelectToggleButtonGroup;
