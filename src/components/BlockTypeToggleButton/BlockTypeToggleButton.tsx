import React, { useContext, forwardRef, useCallback } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import { insertBlockType } from '../../utils';

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

  // testToggle?: any;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(({ value, selected, children, ...rest }: BlockTypeToggleButtonProps, ref) => {
  const { editorState } = useContext(EditorContext) || {};

  const handleToggle = useCallback((): EditorState | undefined => {
    if (editorState) {
      return RichUtils.toggleBlockType(
        EditorState.forceSelection(editorState, editorState.getSelection()),
        value
      );
    }
  }, [editorState, value]);

  const handleSet = useCallback(
    (value: string | string[]): EditorState | undefined => {
      if (editorState && !Array.isArray(value)) {
        return insertBlockType(
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
      value={value}
      onToggle={handleToggle}
      onSet={handleSet}
      selected={selected}
      keyCommand={value}
      {...rest}
    >
      {children}
    </DraftToggleButton>
  );
});

export default BlockTypeToggleButton;
