import React, { forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import useInlineToggle from '../useInlineToggle';

export interface InlineToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'selected'> {
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

const InlineToggleButton = forwardRef<
  HTMLButtonElement,
  InlineToggleButtonProps
>(({ disableKeyboardShortcuts, value, defaultSelected, onClick, onMouseDown, children, ...rest }: InlineToggleButtonProps, ref) => {
  const menuItemProps = useInlineToggle({
    disableKeyboardShortcuts,
    value,
    defaultSelected,
    onClick,
    onMouseDown
  });

  return (
    <ToggleButton
      ref={ref}
      {...menuItemProps}
      {...rest}
    >
      {children}
    </ToggleButton>
  );
});

InlineToggleButton.displayName = 'InlineToggleButton';

export default InlineToggleButton;
