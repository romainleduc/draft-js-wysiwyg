import React, { forwardRef } from 'react';
import { MenuItem, MenuItemProps } from '@material-ui/core';
import useBlockTypeToggle from '../useBlockTypeToggle';

export interface BlockTypeMenuItemProps extends Omit<MenuItemProps, 'selected'> {
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

const BlockTypeMenuItem = forwardRef<
HTMLLIElement,
BlockTypeMenuItemProps
>(({ disableKeyboardShortcuts, value, defaultSelected, onClick, onMouseDown, ...other }: BlockTypeMenuItemProps, ref) => {
  const menuItemProps = useBlockTypeToggle({
    disableKeyboardShortcuts,
    value,
    defaultSelected,
    onClick,
    onMouseDown
  });

  return (
    <MenuItem
      ref={ref}
      {...menuItemProps}
      {...other}
    />
  );
});

export default BlockTypeMenuItem;