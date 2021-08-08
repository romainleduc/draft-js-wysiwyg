import { EditorState, RichUtils } from 'draft-js';
import React, { useCallback, useContext } from 'react';
import { EditorContext } from './Editor';
import useToggle from './useToggle';

interface useInlineToggleProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
   disableKeyboardShortcuts?: boolean;
   /**
    * The inline style value to associate with the button
    */
   value: string;
   /**
    *
    */
   defaultSelected?: boolean;
   onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
   onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const useBlockTypeToggle = ({
  disableKeyboardShortcuts,
  value,
  defaultSelected,
  onClick,
  onMouseDown
}: useInlineToggleProps) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};

  const handleToggle = useCallback(
    (newEditorState: EditorState): void => {
      setEditorState?.(RichUtils.toggleBlockType(newEditorState, value));
    },
    [value]
  );

  const props = useToggle({
    disableKeyboardShortcuts,
    keyCommand: value,
    defaultSelected,
    onClick,
    onMouseDown,
    onToggle: handleToggle
  });

  return {
    ...props,
    selected: editorState && value === RichUtils.getCurrentBlockType(editorState),
  }
}

export default useBlockTypeToggle;