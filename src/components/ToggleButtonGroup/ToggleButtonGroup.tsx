import React, { forwardRef } from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps
} from '@material-ui/lab';

export interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
}

const ToggleButtonGroup = forwardRef<
  HTMLDivElement,
  ToggleButtonGroupProps
>(
  (
    {
      children,
      disableKeyboardShortcuts,
      ...other
    }: ToggleButtonGroupProps,
    ref
  ) => {
    return (
      <MuiToggleButtonGroup ref={ref} {...other}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            disableKeyboardShortcuts:
              child.props.disableKeyboardShortcuts || disableKeyboardShortcuts,
          });
        })}
      </MuiToggleButtonGroup>
    )
  }
);

ToggleButtonGroup.displayName = 'DraftToggleButtonGroup';
export default ToggleButtonGroup;
