import React, { useContext, forwardRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';

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
}

const InlineToggleButton = forwardRef<
  HTMLButtonElement,
  InlineToggleButtonProps
>(({ value, selected, children, ...rest }: InlineToggleButtonProps, ref) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};

  const handleToggle = () => {
    if (editorState && setEditorState) {
      setEditorState(
        RichUtils.toggleInlineStyle(
          EditorState.forceSelection(editorState, editorState.getSelection()),
          value
        )
      );
    }
  };

  return (
    <DraftToggleButton
      ref={ref}
      selected={selected}
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
