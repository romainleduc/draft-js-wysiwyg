import React, { useContext, useEffect, forwardRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from './EditorContext';
import DraftToggleButton, {
  DraftToggleButtonProps,
} from './DraftToggleButton';

export interface InlineToggleButtonProps
  extends Omit<DraftToggleButtonProps, 'value'> {
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
      handleClick();
    }
  }, []);

  // Synchronize selection with keyboard shortcuts
  // const synchronizeSelection = () => {
  //     if (editorState && setEditorState) {
  //         if (editorState.getCurrentContent().hasText()) {
  //             const hasValue = editorState.getCurrentInlineStyle().has(value);

  //             return (hasValue && !selected) || (!hasValue && selected)
  //                 ? !selected
  //                 : selected;
  //         }
  //     }

  //     return selected;
  // };

  const handleClick = () => {
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
      value={value}
      {...rest}
    >
      {children}
    </DraftToggleButton>
  );
});

InlineToggleButton.displayName = 'InlineToggleButton';

export default InlineToggleButton;
