import React, { forwardRef, useCallback, useContext } from 'react';
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps,
} from '@material-ui/lab';
import RichTextEditorUtils from '../../utils/RichTextEditorUtils';
import { EditorState, RichUtils } from 'draft-js';
import useKeyCommand from '../../hooks/useKeyCommand';
import { EditorContext } from '../Editor';

export interface ToggleButtonProps extends Omit<MuiToggleButtonProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  defaultSelected?: boolean;
  forceSelection?: boolean;
  ignoreSelection?: boolean;
  value: string;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      value,
      disableKeyboardShortcuts,
      defaultSelected,
      forceSelection = false,
      ignoreSelection = false,
      onMouseDown,
      onClick,
      ...other
    }: ToggleButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};
    const [{}, add] = useKeyCommand();

    React.useEffect(() => {
      if (!disableKeyboardShortcuts) {
        add(value);
      }

      if (defaultSelected) {
        onToggle();
      }
    }, []);

    const onToggle = useCallback(() => {
      if (editorState && setEditorState) {
        setTimeout(() => {
          const newEditorState = forceSelection
            ? EditorState.forceSelection(
                editorState,
                editorState.getSelection()
              )
            : editorState;

          switch (value) {
            case 'unstyled':
            case 'paragraph':
            case 'header-one':
            case 'header-two':
            case 'header-three':
            case 'header-four':
            case 'header-five':
            case 'header-six':
            case 'unordered-list-item':
            case 'ordered-list-item':
            case 'blockquote':
            case 'code-block':
            case 'atomic':
              setEditorState(RichUtils.toggleBlockType(newEditorState, value));
              break;
            case 'BOLD':
            case 'CODE':
            case 'ITALIC':
            case 'STRIKETHROUGH':
            case 'UNDERLINE':
              setEditorState(
                RichUtils.toggleInlineStyle(newEditorState, value)
              );
              break;
            case 'align-left':
            case 'align-center':
            case 'align-right':
            case 'align-justify':
              setEditorState(
                RichTextEditorUtils.toggleTextAlign(
                  newEditorState,
                  value.substring(6),
                  ignoreSelection
                ) || newEditorState
              );
              break;
            default:
              return null;
          }
        }, 1);
      }
    }, [editorState, setEditorState, forceSelection, ignoreSelection, value]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (editorState) {
          event.preventDefault();
          onToggle();
        }
      },
      [editorState, onToggle]
    );

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (editorState) {
          event.preventDefault();
        }
      },
      [editorState]
    );

    const getSelectedToggles = (): string[] => {
      return editorState
        ? [
            ...editorState.getCurrentInlineStyle().toArray(),
            ...editorState
              .getCurrentContent()
              .getBlockForKey(editorState.getSelection().getStartKey())
              .getData()
              .toArray()
              .map((value) => value.replace(value, `align-${value}`)),
            RichUtils.getCurrentBlockType(editorState),
          ]
        : [];
    };

    return (
      <MuiToggleButton
        ref={ref}
        value={value}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        selected={getSelectedToggles().includes(value) || false}
        {...other}
      />
    );
  }
);

ToggleButton.displayName = 'DraftToggleButton';
export default ToggleButton;
