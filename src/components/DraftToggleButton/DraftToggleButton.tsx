import React, { useContext, useEffect, forwardRef, useCallback } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { EditorState } from 'draft-js';
import EditorContext from '../Editor/EditorContext';
import { ACTION_TYPES } from '../../redux/constants';
import ReduxContext from '../ReduxContext';

export interface DraftToggleButtonProps extends ToggleButtonProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  keyCommand: string;
  onToggle: (editorState: EditorState) => void;
  defaultSelected?: boolean;
  forceSelection?: boolean;
}

const DraftToggleButton = forwardRef<HTMLButtonElement, DraftToggleButtonProps>(
  (
    {
      value,
      children,
      disableKeyboardShortcuts,
      onToggle,
      defaultSelected,
      selected,
      keyCommand,
      forceSelection = false,
      onMouseDown,
      onClick,
      ...other
    }: DraftToggleButtonProps,
    ref
  ) => {
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
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (editorState) {
        event.preventDefault();

        if (onMouseDown) {
          onMouseDown(event);
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
