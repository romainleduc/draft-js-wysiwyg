import React, { useContext, forwardRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';

export interface BlockTypeToggleButtonProps
  extends Omit<ToggleButtonProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   *
   */
  value: string;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(({ value, selected, children, ...rest }: BlockTypeToggleButtonProps, ref) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};

  console.log(selected);
  const handleToggle = () => {
    if (editorState && setEditorState) {
      setEditorState(
        RichUtils.toggleBlockType(
          EditorState.forceSelection(editorState, editorState.getSelection()),
          value
        )
      );
    }
  };

  return (
    <DraftToggleButton
      ref={ref}
      onToggle={handleToggle}
      value={value}
      selected={selected}
      keyCommand={value}
      {...rest}
    >
      {children}
    </DraftToggleButton>
  );
});

export default BlockTypeToggleButton;
