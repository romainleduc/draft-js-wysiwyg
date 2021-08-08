import { EditorState } from 'draft-js';
import React, { useCallback, useContext, useEffect } from 'react';
import { ACTION_TYPES } from '../redux/constants';
import { EditorContext } from './Editor';
import ReduxContext from './ReduxContext';

interface useToggleProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
   disableKeyboardShortcuts?: boolean;
   keyCommand: string;
   onToggle: (editorState: EditorState) => void;
   defaultSelected?: boolean;
   forceSelection?: boolean;
   onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
   onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const useToggle = ({
  disableKeyboardShortcuts,
  keyCommand,
  onToggle,
  onClick,
  onMouseDown,
  defaultSelected,
  forceSelection
}: useToggleProps) => {
  const { editorState } = useContext(EditorContext) || {};
  const { dispatch } = useContext(ReduxContext);

  useEffect(() => {
    if (!disableKeyboardShortcuts) {
      dispatch({
        type: ACTION_TYPES.ADD_KEY_COMMAND,
        payload: keyCommand,
      });
    }

    if (defaultSelected) {
      executeToggle();
    }
  }, []);

  const executeToggle = useCallback(() => {
    if (editorState) {
      setTimeout(
        () =>
          onToggle(
            forceSelection
              ? EditorState.forceSelection(
                  editorState,
                  editorState.getSelection()
                )
              : editorState
          ),
        1
      );
    }
  }, [onToggle, forceSelection, editorState]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (editorState) {
      event.preventDefault();

      if (onClick) {
        onClick(event);
      }

      executeToggle();
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (editorState) {
      event.preventDefault();

      if (onMouseDown) {
        onMouseDown(event);
      }
    }
  };

  return {
    onClick: handleClick,
    onMouseDown: handleMouseDown,
  }
}

export default useToggle;