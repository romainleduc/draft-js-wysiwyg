import React, { useContext, useEffect, forwardRef, useCallback } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { EditorState } from 'draft-js';
import EditorContext from '../EditorContext';

export interface DraftToggleButtonProps
  extends Omit<ToggleButtonProps, 'onChange'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  keyCommand: string;
  onChange?: any;
  onToggle: (editorState: EditorState) => void;
  runFirstTime?: boolean;
  forceSelection?: boolean;
}

const DraftToggleButton = forwardRef<HTMLButtonElement, DraftToggleButtonProps>(
  (
    {
      value,
      children,
      disableKeyboardShortcuts,
      onChange,
      onToggle,
      runFirstTime,
      selected,
      keyCommand,
      forceSelection = false,
      onMouseDown,
      onClick,
      ...other
    }: DraftToggleButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    useEffect(() => {
      // if (!disableKeyboardShortcuts) {
      //   dispatch({
      //     type: ACTION_TYPES.ADD_KEY_COMMAND,
      //     payload: keyCommand,
      //   });
      // }
    }, []);

    useEffect(() => {
      if (runFirstTime) {
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

    // const hasSelectedKeyCommand = () => {
    //   return state.selectedKeyCommands.includes(keyCommand);
    // };

    // if (hasSelectedKeyCommand()) {
    //   dispatch({
    //     type: ACTION_TYPES.SWITCH_SELECTED_KEY_COMMAND,
    //     payload: keyCommand,
    //   });

    //   value = null;
    // }

    const handleClick = (event: any) => {
      if (editorState) {
        event.preventDefault();

        if (onClick) {
          onClick(event);
        }

        if (!editorState.getSelection().isCollapsed()) {
          executeToggle();
        }
      }
    };

    const handleMouseDown = (event: any) => {
      if (editorState) {
        event.preventDefault();

        if (onMouseDown) {
          onMouseDown(event);
        }

        if (editorState.getSelection().isCollapsed()) {
          executeToggle();
        }
      }
    };

    return (
      <ToggleButton
        ref={ref}
        value={value}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        selected={selected}
        {...other}
      >
        {children}
      </ToggleButton>
    );
  }
);

DraftToggleButton.displayName = 'DraftToggleButton';
export default DraftToggleButton;
