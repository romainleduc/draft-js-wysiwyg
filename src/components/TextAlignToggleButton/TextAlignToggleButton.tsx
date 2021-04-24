import React, { forwardRef, useCallback, useContext } from 'react';
import { setBlockData, setBlocksData } from '../../utils';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import { EditorState } from 'draft-js';
import EditorContext from '../Editor/EditorContext';

export interface TextAlignToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'selected'> {
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
  /**
   *
   */
  defaultSelected?: boolean;
}

const TextAlignToggleButton = forwardRef<
  HTMLButtonElement,
  TextAlignToggleButtonProps
>(
  (
    {
      value,
      children,
      ignoreSelection = false,
      ...rest
    }: TextAlignToggleButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleToggle = useCallback(
      (newEditorState: EditorState): void => {
        const contentState = newEditorState.getCurrentContent();
        const selectionState = newEditorState.getSelection();
        const blockData = { textAlign: value };

        if (ignoreSelection) {
          const contentBlocks = contentState.getBlocksAsArray();

          if (!contentBlocks.length) {
            return;
          }

          setEditorState?.(
            setBlocksData(
              newEditorState,
              contentState,
              contentBlocks[0].getKey(),
              contentBlocks[contentBlocks.length - 1].getKey(),
              blockData
            )
          );
        } else {
          setEditorState?.(
            setBlockData(
              newEditorState,
              contentState,
              selectionState,
              blockData
            )
          );
        }
      },
      [ignoreSelection]
    );

    return (
      <DraftToggleButton
        ref={ref}
        selected={
          editorState &&
          editorState
            .getCurrentContent()
            .getBlockForKey(editorState.getSelection().getStartKey())
            .getData()
            .toArray()
            .includes(value)
        }
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
