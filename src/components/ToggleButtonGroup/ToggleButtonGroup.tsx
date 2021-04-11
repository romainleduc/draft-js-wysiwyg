import React, {
  forwardRef,
  useContext,
  useEffect,
} from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from '@material-ui/lab';
import EditorContext from '../EditorContext';
import { DraftBlockType, RichUtils } from 'draft-js';

export interface ToggleButtonGroupProps
  extends Omit<MuiToggleButtonGroupProps, 'defaultValue'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  defaultValue?: string | string[];
  onChangeSelection?: (newValue: { inlineStyles: string[], blockType: DraftBlockType}) => void;
}

const ToggleButtonGroup = forwardRef<any, ToggleButtonGroupProps>(
  (
    {
      onChangeSelection,
      value,
      defaultValue,
      children,
      disableKeyboardShortcuts,
      ...other
    }: ToggleButtonGroupProps,
    ref
  ) => {
    const { editorState } = useContext(EditorContext) || {};

    useEffect(() => {
      if (editorState && onChangeSelection) {
        onChangeSelection({
          inlineStyles: editorState.getCurrentInlineStyle().toArray(),
          blockType: RichUtils.getCurrentBlockType(editorState),
        })
      }
    }, [editorState]);

    return (
      <MuiToggleButtonGroup
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
          });
        })}
      </MuiToggleButtonGroup>
    );
  }
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
export default ToggleButtonGroup;
