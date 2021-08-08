import React, { forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import useTextAlignToggle from '../useTextAlignToggle';

export interface TextAlignToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'selected'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   *
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

const TextAlignToggleButton = forwardRef<
  HTMLButtonElement,
  TextAlignToggleButtonProps
>(
  (
    {
      value,
      children,
      ignoreSelection,
      disableKeyboardShortcuts,
      defaultSelected,
      onClick,
      onMouseDown,
      ...other
    }: TextAlignToggleButtonProps,
    ref
  ) => {
    const menuItemProps = useTextAlignToggle({
      disableKeyboardShortcuts,
      value,
      defaultSelected,
      ignoreSelection,
      onClick,
      onMouseDown
    });

    return (
      <ToggleButton
        ref={ref}
        {...menuItemProps}
        {...other}
      >
        {children}
      </ToggleButton>
    );
  }
);

export default TextAlignToggleButton;
