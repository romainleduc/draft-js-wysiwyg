import React, {
  useContext,
  useEffect,
  forwardRef,
  useState,
  useCallback,
} from 'react';
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
  onToggle: (editorState: EditorState) => EditorState;
  runFirstTime?: boolean;
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
      ...other
    }: DraftToggleButtonProps,
    ref
  ) => {
    const [forceSelection, setForceSelection] = useState(false);
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    useEffect(() => {
      // if (!disableKeyboardShortcuts) {
      //   dispatch({
      //     type: ACTION_TYPES.ADD_KEY_COMMAND,
      //     payload: keyCommand,
      //   });
      // }

      setForceSelection(true);
    }, []);

    useEffect(() => {
      if (runFirstTime) {
        console.log('pass la ????');
        execute();
      }
    }, []);

    const execute = useCallback(() => {
      console.log(forceSelection);
      if (editorState) {
        setTimeout(
          () =>
            setEditorState?.(
              onToggle(
                forceSelection
                  ? EditorState.forceSelection(
                      editorState,
                      editorState.getSelection()
                    )
                  : editorState
              )
            ),
          1
        );
      }
    }, [editorState, forceSelection]);

    // const hasSelectedKeyCommand = () => {
    //   return state.selectedKeyCommands.includes(keyCommand);
    // };

    const handleChange = (event: any) => {
      if (editorState && onChange) {
        // if (hasSelectedKeyCommand()) {
        //   dispatch({
        //     type: ACTION_TYPES.SWITCH_SELECTED_KEY_COMMAND,
        //     payload: keyCommand,
        //   });

        //   value = null;
        // }

        setEditorState?.(
          onToggle(
            forceSelection
              ? EditorState.forceSelection(
                  editorState,
                  editorState.getSelection()
                )
              : editorState
          )
        );

        onChange(event, value);
      }
    };

    return (
      <ToggleButton
        ref={ref}
        value={value}
        onChange={handleChange}
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
