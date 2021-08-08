import React, { forwardRef } from 'react';
import { MenuItem, MenuItemProps } from '@material-ui/core';
import useInlineToggle from '../useInlineToggle';

export interface InlineMenuItemProps extends Omit<MenuItemProps, 'selected'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   * The inline style value to associate with the button
   */
  value: string;
  /**
   *
   */
  defaultSelected?: boolean;
}

const InlineMenuItem = forwardRef<HTMLLIElement, InlineMenuItemProps>(
  (
    {
      disableKeyboardShortcuts,
      value,
      defaultSelected,
      onClick,
      onMouseDown,
      ...other
    }: InlineMenuItemProps,
    ref
  ) => {
    const menuItemProps = useInlineToggle({
      disableKeyboardShortcuts,
      value,
      defaultSelected,
      onClick,
      onMouseDown,
    });

    return <MenuItem ref={ref} {...menuItemProps} {...other} />;
  }
);

export default InlineMenuItem;
