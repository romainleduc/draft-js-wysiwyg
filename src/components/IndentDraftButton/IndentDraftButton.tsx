import React, { useContext, forwardRef } from 'react';
import {
  indentSelection as indentSelectionUtils,
  isOutdentable,
  IndentType,
} from '../../utils';
import EditorContext from '../EditorContext/EditorContext';
import DraftButton, { DraftButtonProps } from '../DraftButton/DraftButton';

export interface IndentDraftButtonProps
  extends Omit<DraftButtonProps, 'keyCommand'> {
  /**
   * The value to associate with the button
   */
  value: IndentType;
  /**
   * If `true`, indentation will only be performed on nested list.
   * @default false
   */
  nestedListOnly?: boolean;
}

export enum IndentCommand {
  Increase = 'increase-indent',
  Decrease = 'decrease-indent',
}

const IndentDraftButton = forwardRef<HTMLButtonElement, IndentDraftButtonProps>(
  (
    {
      children,
      value,
      nestedListOnly,
      disableKeyboardShortcuts,
      ...rest
    }: IndentDraftButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleIndentSelection = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
      e.preventDefault();

      if (editorState && setEditorState) {
        const contentState = editorState.getCurrentContent();

        setEditorState(
          indentSelectionUtils(editorState, contentState, value, nestedListOnly)
        );
      }
    };

    const isDisabled = () => {
      if (editorState && setEditorState) {
        if (value === 'decrease') {
          return !isOutdentable(
            editorState.getSelection(),
            editorState.getCurrentContent()
          );
        }
      }

      return rest.disabled;
    };

    return (
      <DraftButton
        ref={ref}
        keyCommand={`${value}-indent`}
        onMouseDown={handleIndentSelection}
        disabled={isDisabled()}
        {...rest}
      >
        {children}
      </DraftButton>
    );
  }
);

export default IndentDraftButton;
