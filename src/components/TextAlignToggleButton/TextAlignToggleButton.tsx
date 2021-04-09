import React, { useContext, useEffect, forwardRef } from 'react';
import { setBlockData, setBlocksData } from '../../utils';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';

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
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleToggle = () => {
      if (editorState && setEditorState) {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const blockData = { textAlign: value };

        if (ignoreSelection) {
          const contentBlocks = contentState.getBlocksAsArray();

          if (!!contentBlocks.length) {
            setTimeout(
              () =>
                setEditorState(
                  setBlocksData(
                    editorState,
                    contentState,
                    contentBlocks[0].getKey(),
                    contentBlocks[contentBlocks.length - 1].getKey(),
                    blockData
                  )
                ),
              0
            );
          }
        } else {
          setTimeout(
            () =>
              setEditorState(
                setBlockData(editorState, contentState, selectionState, blockData)
              ),
            0
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
