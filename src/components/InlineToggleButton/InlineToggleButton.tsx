import React, { forwardRef, useCallback, useContext } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import EditorContext from '../Editor/EditorContext';

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
>(({ value, children, ...rest }: InlineToggleButtonProps, ref) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};

  const handleToggle = useCallback(
    (newEditorState: EditorState): void => {
      setEditorState?.(RichUtils.toggleInlineStyle(newEditorState, value));
    },
    [value]
  );

  return (
    <DraftToggleButton
      ref={ref}
      selected={editorState?.getCurrentInlineStyle().toArray().includes(value)}
      onToggle={handleToggle}
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
