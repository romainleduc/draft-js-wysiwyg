import React, { forwardRef, useContext } from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@material-ui/lab';
import EditorContext from '../EditorContext';
import { DraftBlockType, RichUtils } from 'draft-js';
import isValueSelected from './isValueSelected';

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
    const { editorState } = useContext(EditorContext) || {};

    const isCurrentSelected = (value: string): boolean => {
      if (!editorState) {
        return false;
      }

      return (
        editorState.getCurrentInlineStyle()?.toArray().includes(value) ||
        RichUtils.getCurrentBlockType(editorState) === value
      );
    };

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
            selected:
              child.props.selected === undefined
                ? isCurrentSelected(child.props.value)
                : child.props.selected,
          });
        })}
      </MuiToggleButtonGroup>
    );
  }
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
export default ToggleButtonGroup;
