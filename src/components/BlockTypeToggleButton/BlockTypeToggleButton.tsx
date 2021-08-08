import React, { forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import useBlockTypeToggle from '../useBlockTypeToggle';

export interface BlockTypeToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'selected'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   *
   */
  value: string;
  /**
   *
   */
  defaultSelected?: boolean;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(
  (
    {
      disableKeyboardShortcuts,
      value,
      defaultSelected,
      onClick,
      onMouseDown,
      ...other
    }: BlockTypeToggleButtonProps,
    ref
  ) => {
    const menuItemProps = useBlockTypeToggle({
      disableKeyboardShortcuts,
      value,
      defaultSelected,
      onClick,
      onMouseDown,
    });

    return <ToggleButton ref={ref} {...menuItemProps} {...other} />;
  }
);

export default BlockTypeToggleButton;
