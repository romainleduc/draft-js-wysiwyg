import React, { useContext, forwardRef } from 'react';
import { setBlockData, setBlocksData } from '../../utils';
import EditorContext from '../EditorContext/EditorContext';
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
    const { setEditorState } = useContext(EditorContext) || {};

    const handleToggle = (targetEditorState: EditorState) => {
      if (setEditorState) {
        const contentState = targetEditorState.getCurrentContent();
        const selectionState = targetEditorState.getSelection();
        const blockData = { textAlign: selected ? value : undefined };

        if (ignoreSelection) {
          const contentBlocks = contentState.getBlocksAsArray();

          if (contentBlocks.length) {
            setEditorState(
              setBlocksData(
                targetEditorState,
                contentState,
                contentBlocks[0].getKey(),
                contentBlocks[contentBlocks.length - 1].getKey(),
                blockData
              )
            );
          }
        } else {
          setEditorState(
            setBlockData(
              targetEditorState,
              contentState,
              selectionState,
              blockData
            )
          );
        }
      }
    };

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
