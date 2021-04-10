import React, { forwardRef, useState } from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@material-ui/lab';

export interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
}

const ToggleButtonGroup = forwardRef<any, ToggleButtonGroupProps>(
  (
    {
      onChange,
      value,
      defaultValue,
      children,
      disableKeyboardShortcuts,
      ...other
    }: ToggleButtonGroupProps,
    ref
  ) => {
    const [format, setFormat] = useState(defaultValue);

    const handleChange = (event: any, newValue: any) => {
      if (onChange) {
        onChange(event, newValue);
      } else {
        setFormat(newValue);
      }
    };

    return (
      <MuiToggleButtonGroup
        value={value || format}
        onChange={handleChange}
        ref={ref}
        {...other}
      >
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
    );
  }
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
export default ToggleButtonGroup;
