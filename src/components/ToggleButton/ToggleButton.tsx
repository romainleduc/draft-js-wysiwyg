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
  value: string;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      value,
      disableKeyboardShortcuts,
      defaultSelected,
      forceSelection = false,
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
            case 'align-left-selection':
            case 'align-center-selection':
            case 'align-right-selection':
            case 'align-justify-selection':
              setEditorState(
                RichTextEditorUtils.toggleTextAlign(
                  newEditorState,
                  value.split('-')[1],
                  false
                ) || newEditorState
              );
              break;
              case 'align-left-content':
              case 'align-center-content':
              case 'align-right-content':
              case 'align-justify-content':
                setEditorState(
                  RichTextEditorUtils.toggleTextAlign(
                    newEditorState,
                    value.split('-')[1],
                    true
                  ) || newEditorState
                );
                break;
            default:
              return null;
          }
        }, 1);
      }
    }, [editorState, setEditorState, forceSelection, value]);

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
      if (!editorState) {
        return [];
      }

      const selectedData: string[] = [];

      const currentContentData = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection()
        .getStartKey())
        .getData();

      if (currentContentData) {
        const textAlign = currentContentData.get('textAlign');
        const textAlignType = currentContentData.get('textAlignType');

        if (textAlign && textAlignType) {
          selectedData.push(`align-${textAlign}-${textAlignType}`);
        }
      }

      return [
        ...selectedData,
        ...editorState.getCurrentInlineStyle().toArray(),
        RichUtils.getCurrentBlockType(editorState)
      ];
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
