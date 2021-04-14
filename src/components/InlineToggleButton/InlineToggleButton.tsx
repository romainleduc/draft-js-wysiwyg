import React, { forwardRef, useCallback, useContext } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import ToggleContext from '../ToggleContext/ToggleContext';

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
  runFirstTime?: boolean;
}

const InlineToggleButton = forwardRef<
  HTMLButtonElement,
  InlineToggleButtonProps
>(({ value, selected, children, ...rest }: InlineToggleButtonProps, ref) => {
  const { inlineStyles, setInlineStyles } = useContext(ToggleContext);

  const handleToggle = useCallback(
    (editorState: EditorState): EditorState => {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, value);
      setInlineStyles(newEditorState.getCurrentInlineStyle().toArray());
      return newEditorState;
    },
    [inlineStyles, value]
  );

  return (
    <DraftToggleButton
      ref={ref}
      selected={inlineStyles.includes(value)}
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
