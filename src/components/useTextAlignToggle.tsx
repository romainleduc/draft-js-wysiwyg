import { EditorState } from 'draft-js';
import React, { useCallback, useContext } from 'react';
import { setBlockData, setBlocksData } from '../utils';
import { EditorContext } from './Editor';
import useToggle from './useToggle';

interface useInlineToggleProps {
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
   onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
   onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const useTextAlignToggle = ({
  disableKeyboardShortcuts,
  value,
  defaultSelected,
  ignoreSelection,
  onClick,
  onMouseDown
}: useInlineToggleProps) => {
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

  const props = useToggle({
    disableKeyboardShortcuts,
    keyCommand: `align-${value}`,
    defaultSelected,
    onClick,
    onMouseDown,
    onToggle: handleToggle
  });

  return {
    ...props,
    selected:
      editorState &&
      editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getData()
        .toArray()
        .includes(value),
    
  }
}

export default useTextAlignToggle;