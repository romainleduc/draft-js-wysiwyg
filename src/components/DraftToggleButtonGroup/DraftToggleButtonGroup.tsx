import React, { forwardRef } from 'react';
import { ToggleButtonGroup, ToggleButtonGroupProps } from '@material-ui/lab';

export interface DraftToggleButtonGroupProps extends ToggleButtonGroupProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
}

const DraftToggleButtonGroup = forwardRef<
  HTMLButtonElement,
  DraftToggleButtonGroupProps
>(
  (
    {
      value,
      children,
      disableKeyboardShortcuts,
      ...other
    }: DraftToggleButtonGroupProps,
    ref
  ) => (
    <ToggleButtonGroup ref={ref} value={value} {...other}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          disableKeyboardShortcuts:
            child.props.disableKeyboardShortcuts || disableKeyboardShortcuts,
        });
      })}
    </ToggleButtonGroup>
  )
);

DraftToggleButtonGroup.displayName = 'DraftToggleButtonGroup';
export default DraftToggleButtonGroup;
