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
        execute();
      }
    }, []);

    const execute = useCallback(() => {
      if (editorState) {
        setTimeout(() => onToggle(editorState), 1);
      }
    }, [editorState]);

    // const hasSelectedKeyCommand = () => {
    //   return state.selectedKeyCommands.includes(keyCommand);
    // };

    const handleMouseDown = (event: any) => {
      if (editorState) {
        event.preventDefault();

        if (onMouseDown) {
          onMouseDown(event);
        }

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
      // if (hasSelectedKeyCommand()) {
      //   dispatch({
      //     type: ACTION_TYPES.SWITCH_SELECTED_KEY_COMMAND,
      //     payload: keyCommand,
      //   });

      //   value = null;
      // }
    };

    return (
      <ToggleButton
        ref={ref}
        value={value}
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
