import { EditorState, Modifier, RichUtils } from 'draft-js';
import React, { useCallback, useContext } from 'react';
import { EditorContext } from './Editor';
import EditorThemeContext from './EditorProvider/EditorProviderContext';
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

const useInlineToggle = ({
  disableKeyboardShortcuts,
  value,
  defaultSelected,
  onClick,
  onMouseDown
}: useInlineToggleProps) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};
  const { customStyleMaps, getCustomStyleMapOfKey } =
    useContext(EditorThemeContext);

  const handleToggle = useCallback(
    (newEditorState: EditorState): void => {
      const group = getCustomStyleMapOfKey(value);

      let nextEditorState: EditorState;

      if (group?.exclusive) {
        const selection = newEditorState.getSelection();
        const currentStyle = newEditorState.getCurrentInlineStyle();

        // Unset style override for current color.
        if (selection.isCollapsed()) {
          nextEditorState = currentStyle.reduce((state: any, style: any) => {
            const styleGroup = getCustomStyleMapOfKey(style);
            const valueGroup = getCustomStyleMapOfKey(value);

            if (styleGroup?.group === valueGroup?.group) {
              return RichUtils.toggleInlineStyle(state, style);
            }

            return state;
          }, newEditorState);
        } else {
          // Let's just allow one style at a time. Turn off all active styles group.
          const nextContentState = Object.keys(group.styles).reduce(
            (contentState, style) => {
              return Modifier.removeInlineStyle(
                contentState,
                selection,
                `${group.group}_${style}`
              );
            },
            newEditorState.getCurrentContent()
          );

          nextEditorState = EditorState.push(
            newEditorState,
            nextContentState,
            'change-inline-style'
          );
        }

        // If the style is being toggled on, apply it.
        if (!currentStyle.has(value)) {
          nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, value);
        }
      } else {
        nextEditorState = RichUtils.toggleInlineStyle(newEditorState, value);
      }

      setEditorState?.(nextEditorState);
    },
    [customStyleMaps, value]
  );

  const props = useToggle({
    disableKeyboardShortcuts,
    keyCommand: value.toLowerCase(),
    defaultSelected,
    onClick,
    onMouseDown,
    onToggle: handleToggle
  });

  return {
    ...props,
    selected: editorState?.getCurrentInlineStyle().toArray().includes(value),
  }
}

export default useInlineToggle;