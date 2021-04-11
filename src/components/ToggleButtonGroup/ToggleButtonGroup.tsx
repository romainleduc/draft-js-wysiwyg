import React, { forwardRef, useContext } from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@material-ui/lab';
import EditorContext from '../EditorContext';
import { DraftBlockType } from 'draft-js';
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
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleTestToggle = (tvalue: any, set: any, toggle: any) => {
      if (!editorState) {
        return;
      }

      let newEditorState = editorState;

      if (!exclusive || tvalue === value) {
        newEditorState = toggle();
      } else {
        newEditorState = set(tvalue);
      }

      setEditorState?.(newEditorState);
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
            disableKeyboardShortcuts:
              child.props.disableKeyboardShortcuts || disableKeyboardShortcuts,
            testToggle: handleTestToggle,
            selected:
              child.props.selected === undefined
                ? isValueSelected(child.props.value, value)
                : child.props.selected,
          });
        })}
      </MuiToggleButtonGroup>
    );
  }
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
export default ToggleButtonGroup;
