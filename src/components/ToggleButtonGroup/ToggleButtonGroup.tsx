import React, { forwardRef, useContext, useEffect } from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@material-ui/lab';
import { DraftBlockType } from 'draft-js';
import isValueSelected from './isValueSelected';
import ToggleContext from '../ToggleContext/ToggleContext';

export interface ToggleButtonGroupProps
  extends Omit<MuiToggleButtonGroupProps, 'defaultValue'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  defaultValue?: string | string[];
  onChangeSelection?: (newValue: {
    inlineStyles: string[];
    blockType: DraftBlockType;
  }) => void;
}

const ToggleButtonGroup = forwardRef<any, ToggleButtonGroupProps>(
  (
    {
      onChangeSelection,
      value,
      defaultValue,
      children,
      disableKeyboardShortcuts,
      exclusive,
      ...other
    }: ToggleButtonGroupProps,
    ref
  ) => {
    const { inlineStyles, blockType } = useContext(ToggleContext);

    useEffect(() => {
      console.log('inlineStyles a changé', inlineStyles);
    }, [inlineStyles])

    useEffect(() => {
      console.log('blockTypes a changé', blockType);
    }, [blockType])

    return (
      <MuiToggleButtonGroup
        exclusive={exclusive}
        value={value}
        ref={ref}
        {...other}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            runFirstTime: isValueSelected(child.props.value, value),
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
