import React, { forwardRef, useCallback, useContext } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import EditorContext from '../Editor/EditorContext';
import EditorThemeContext from '../EditorProvider/EditorProviderContext';

export interface InlineToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'selected'> {
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
}

const InlineToggleButton = forwardRef<
  HTMLButtonElement,
  InlineToggleButtonProps
>(({ value, children, ...rest }: InlineToggleButtonProps, ref) => {
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

  return (
    <DraftToggleButton
      ref={ref}
      selected={editorState?.getCurrentInlineStyle().toArray().includes(value)}
      onToggle={handleToggle}
      keyCommand={value.toLowerCase()}
      value={value}
      {...rest}
    >
      {children}
    </DraftToggleButton>
  );
});

InlineToggleButton.displayName = 'InlineToggleButton';

export default InlineToggleButton;
