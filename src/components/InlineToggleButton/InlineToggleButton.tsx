import React, { useContext, useEffect, forwardRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton, {
  DraftToggleButtonProps,
} from '../DraftToggleButton/DraftToggleButton';

export interface InlineToggleButtonProps
  extends Omit<DraftToggleButtonProps, 'value' | 'keyCommand'> {
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

  useEffect(() => {
    if (selected) {
      toggleInlineStyle();
    }
  }, []);

  const handleClick = () => {
    toggleInlineStyle();
  };

  const toggleInlineStyle = () => {
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
      onClick={handleClick}
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
