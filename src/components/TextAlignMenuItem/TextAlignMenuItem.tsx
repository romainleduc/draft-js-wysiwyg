import React, { forwardRef } from 'react';
import { MenuItem, MenuItemProps } from '@material-ui/core';
import useTextAlignToggle from '../useTextAlignToggle';

export interface TextAlignMenuItemProps
  extends Omit<MenuItemProps, 'selected'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   * The inline style value to associate with the button
   */
  value: 'left' | 'center' | 'right' | 'justify';
  /**
   *
   */
  ignoreSelection?: boolean;
  /**
   *
   */
  defaultSelected?: boolean;
}

const TextAlignMenuItem = forwardRef<HTMLButtonElement, TextAlignMenuItemProps>(
  (
    {
      value,
      ignoreSelection,
      disableKeyboardShortcuts,
      defaultSelected,
      onClick,
      onMouseDown,
      ...other
    }: TextAlignMenuItemProps,
    ref
  ) => {
    const menuItemProps = useTextAlignToggle({
      disableKeyboardShortcuts,
      value,
      defaultSelected,
      ignoreSelection,
      onClick,
      onMouseDown,
    });

    return <MenuItem ref={ref} {...menuItemProps} {...other} />;
  }
);

export default TextAlignMenuItem;
