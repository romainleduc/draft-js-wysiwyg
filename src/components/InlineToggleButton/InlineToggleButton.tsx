import React, { useContext, forwardRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import { addInlineStyle } from '../../utils';

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

  const onFirstRender = () => {
    if (editorState && setEditorState) {
      if (selected) {
        setTimeout(
          () =>
            setEditorState(addInlineStyle(editorState, value)),
          0
        );
      }
    }
  }

  const handleToggle = () => {
    if (editorState && setEditorState) {
      setTimeout(
        () =>
          setEditorState(
            RichUtils.toggleInlineStyle(
              EditorState.forceSelection(editorState, editorState.getSelection()),
              value
            )
          ),
        0
      );
    }
  };

  return (
    <DraftToggleButton
      ref={ref}
      selected={selected}
      onFirstRender={onFirstRender}
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
