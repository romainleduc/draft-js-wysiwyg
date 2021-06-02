import React, { useCallback, useContext } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { EditorContext } from '../components/Editor';
import ReduxContext from '../components/ReduxContext';
import { ACTION_TYPES } from '../redux/constants';
import RichTextEditorUtils from '../utils/RichTextEditorUtils';

interface ToggleConfig {
  disableKeyboardShortcuts?: boolean;
  defaultSelected?: boolean;
  forceSelection?: boolean;
}

interface ToggleOptions {
  ignoreSelection?: boolean;
}

interface Meta {
  selectedToggles: string[];
}

export type UseToggleResult = [
  {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onMouseDown: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  },
  Meta,
  () => void
];

const useToggle = (
  value: string,
  config?: ToggleConfig,
  options?: ToggleOptions
): UseToggleResult => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};
  const { dispatch } = useContext(ReduxContext);

  React.useEffect(() => {
    if (!config?.disableKeyboardShortcuts) {
      dispatch({
        type: ACTION_TYPES.ADD_KEY_COMMAND,
        payload: value,
      });
    }

    if (config?.defaultSelected) {
      onToggle();
    }
  }, []);

  const onToggle = useCallback(() => {
    if (editorState && setEditorState) {
      setTimeout(() => {
        const newEditorState = config?.forceSelection
          ? EditorState.forceSelection(editorState, editorState.getSelection())
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
            setEditorState(RichUtils.toggleInlineStyle(newEditorState, value));
            break;
          case 'align-left':
          case 'align-center':
          case 'align-right':
          case 'align-justify':
            setEditorState(
              RichTextEditorUtils.toggleTextAlign(newEditorState, value.substring(6), options?.ignoreSelection) ||
                newEditorState
            );
            break;
          default:
            return null;
        }
      }, 1);
    }
  }, [editorState, setEditorState, config, options, value]);

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

  return [
    {
      onClick: handleClick,
      onMouseDown: handleMouseDown,
    },
    {
      selectedToggles: editorState
        ? [
            ...editorState.getCurrentInlineStyle().toArray(),
            ...editorState
              .getCurrentContent()
              .getBlockForKey(editorState.getSelection().getStartKey())
              .getData()
              .toArray(),
            RichUtils.getCurrentBlockType(editorState),
          ]
        : [],
    },
    onToggle,
  ];
};

export default useToggle;
