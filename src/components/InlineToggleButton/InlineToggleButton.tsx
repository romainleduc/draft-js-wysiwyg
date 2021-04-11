import React, { useContext, forwardRef, useCallback } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import { setInlineStyle } from '../../utils';

export interface InlineToggleButtonProps
  extends Omit<ToggleButtonProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;

  /**
   * The inline style value to associate with the button
   */
  value: string;

  onSet?: any;
}

const InlineToggleButton = forwardRef<
  HTMLButtonElement,
  InlineToggleButtonProps
>(({ value, selected, children, ...rest }: InlineToggleButtonProps, ref) => {
  const { editorState } = useContext(EditorContext) || {};

  const handleToggle = useCallback((): EditorState | undefined => {
    if (editorState) {
      return RichUtils.toggleInlineStyle(
        EditorState.forceSelection(editorState, editorState.getSelection()),
        value
      );
    }
  }, [editorState, value]);

  const handleSet = useCallback(
    (value: string | string[]): EditorState | undefined => {
      if (editorState) {
        return setInlineStyle(
          EditorState.forceSelection(editorState, editorState.getSelection()),
          value
        );
      }
    },
    [editorState]
  );

  return (
    <DraftToggleButton
      ref={ref}
      selected={selected}
      onToggle={handleToggle}
      onSet={handleSet}
      keyCommand={value.toLowerCase()}
      value={value}
      {...rest}
    >
      {children}
    </DraftToggleButton>
  );
});

InlineToggleButton.displayName = 'InlineToggleButton';

export default InlineToggleButton;
