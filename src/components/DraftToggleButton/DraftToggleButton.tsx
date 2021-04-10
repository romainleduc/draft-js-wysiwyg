import React, { useContext, useEffect, forwardRef, useState } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { ACTION_TYPES } from '../../redux/constants';
import ReduxContext from '../ReduxContext';
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
  enforce?: boolean;
  onToggle: (editorState: EditorState) => void;
  onFirstRender?: () => void;
}

const DraftToggleButton = forwardRef<HTMLButtonElement, DraftToggleButtonProps>(
  (
    {
      value,
      children,
      disableKeyboardShortcuts,
      onChange,
      onFirstRender,
      onToggle,
      selected,
      keyCommand,
      enforce,
      ...other
    }: DraftToggleButtonProps,
    ref
  ) => {
    const [forceSelection, setForceSelection] = useState(false);
    const { state, dispatch } = useContext(ReduxContext);
    const { editorState } = useContext(EditorContext) || {};

    useEffect(() => {
      if (!disableKeyboardShortcuts) {
        dispatch({
          type: ACTION_TYPES.ADD_KEY_COMMAND,
          payload: keyCommand,
        });
      }

      setForceSelection(true);
    }, []);

    useEffect(() => {
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
          0
        );
      }
    }, [selected]);

    const hasSelectedKeyCommand = () => {
      return state.selectedKeyCommands.includes(keyCommand);
    };

    const handleChange = (event: any) => {
      if (onChange) {
        if (hasSelectedKeyCommand()) {
          dispatch({
            type: ACTION_TYPES.SWITCH_SELECTED_KEY_COMMAND,
            payload: keyCommand,
          });

          value = null;
        }

        onChange(event, value);
      }
    };

    return (
      <ToggleButton
        ref={ref}
        value={value}
        onChange={handleChange}
        selected={
          (selected && !hasSelectedKeyCommand()) ||
          (!selected && hasSelectedKeyCommand())
        }
        {...other}
      >
        {children}
      </ToggleButton>
    );
  }
);

DraftToggleButton.displayName = 'DraftToggleButton';
export default DraftToggleButton;
