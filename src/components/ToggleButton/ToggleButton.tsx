import React, { forwardRef } from 'react';
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps,
} from '@material-ui/lab';
import useToggle from '../../hooks/useToggle';

export interface ToggleButtonProps extends Omit<MuiToggleButtonProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  defaultSelected?: boolean;
  forceSelection?: boolean;
  value: string;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      value,
      disableKeyboardShortcuts,
      defaultSelected,
      forceSelection = false,
      onMouseDown,
      onClick,
      ...other
    }: ToggleButtonProps,
    ref
  ) => {
    const [toggle, meta] = useToggle(value, {
      disableKeyboardShortcuts,
      defaultSelected,
      forceSelection,
    });

    return (
      <MuiToggleButton
        ref={ref}
        value={value}
        selected={meta?.selectedToggles.includes(value) || false}
        {...toggle}
        {...other}
      />
    );
  }
);

ToggleButton.displayName = 'DraftToggleButton';
export default ToggleButton;
