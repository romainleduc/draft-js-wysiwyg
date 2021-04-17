import React, { forwardRef, useCallback } from 'react';
import { setBlockData, setBlocksData } from '../../utils';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import { EditorState } from 'draft-js';

export interface TextAlignToggleButtonProps
  extends Omit<ToggleButtonProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   *
   */
  value: 'left' | 'center' | 'right' | 'justify';
  /**
   *
   */
  ignoreSelection?: boolean;
  runFirstTime?: boolean;
}

const TextAlignToggleButton = forwardRef<
  HTMLButtonElement,
  TextAlignToggleButtonProps
>(
  (
    {
      selected,
      value,
      children,
      ignoreSelection = false,
      ...rest
    }: TextAlignToggleButtonProps,
    ref
  ) => {
    const handleToggle = useCallback(
      (editorState: EditorState): EditorState => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const blockData = { textAlign: value };

        if (ignoreSelection) {
          const contentBlocks = contentState.getBlocksAsArray();

          if (!contentBlocks.length) {
            return editorState;
          }

          return setBlocksData(
            editorState,
            contentState,
            contentBlocks[0].getKey(),
            contentBlocks[contentBlocks.length - 1].getKey(),
            blockData
          );
        } else {
          return setBlockData(
            editorState,
            contentState,
            selectionState,
            blockData
          );
        }
      },
      [ignoreSelection]
    );

    return (
      <DraftToggleButton
        ref={ref}
        selected={selected}
        onToggle={handleToggle}
        keyCommand={`align-${value}`}
        value={value}
        {...rest}
      >
        {children}
      </DraftToggleButton>
    );
  }
);

export default TextAlignToggleButton;
