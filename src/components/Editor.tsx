import React, { forwardRef, useContext } from 'react';
import {
  EditorState,
  EditorProps as DraftEditorProps,
  Editor as DraftEditor,
  RichUtils,
  DraftHandleValue,
} from 'draft-js';
import { indentSelection, mergeBlockData, draftToHtml } from '../utils';
import EditorContext from './EditorContext';
import { makeStyles } from '@material-ui/core';
import ReduxContext from './ReduxContext';
import {
  getDefaultBlockRenderer,
  getDefaultBlockStyle,
  getDefaultKeyBinding,
} from '../utils/editorUtils';
import { IndentCommand } from './IndentDraftButton';
import clsx from 'clsx';

export interface EditorProps
  extends Omit<DraftEditorProps, 'editorState' | 'onChange'> {
  className?: string;
  keyCommands?: string[];
  keyBinding?: string[];
  onChange?(html: string): void;
}

const userStyles = makeStyles({
  editor: {
    '& .public-DraftStyleDefault-ltr': {
      textAlign: 'inherit',
    },
    '& .align-left': {
      textAlign: 'left',
    },
    '& .align-center': {
      textAlign: 'center',
    },
    '& .align-right': {
      textAlign: 'right',
    },
  },
  hidePlaceholder: {
    '& .public-DraftEditorPlaceholder-root': {
      display: 'none',
    },
  },
});

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ className, keyCommands, onChange, ...rest }: EditorProps, ref) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};
    const { state } = useContext(ReduxContext);
    const classes = userStyles();

    const isNotEmpty = () => {
      const contentState = editorState?.getCurrentContent();

      if (contentState) {
        return (
          contentState.hasText() ||
          contentState.getFirstBlock().getType() !== 'unstyled'
        );
      }

      return false;
    };

    const handleKeyCommand = (
      command: string,
      editorState: EditorState
    ): DraftHandleValue => {
      if (
        keyCommands?.includes(command) ||
        state.keyCommands.includes(command)
      ) {
        if (Object.values(IndentCommand).includes(command as IndentCommand)) {
          const contentState = editorState.getCurrentContent();
          const indentType =
            command === IndentCommand.Increase ? 'increase' : 'decrease';

          if (!setEditorState) {
            return 'not-handled';
          }

          setEditorState(
            indentSelection(editorState, contentState, indentType)
          );

          return 'handled';
        } else {
          const newState = RichUtils.handleKeyCommand(editorState, command);

          if (newState && setEditorState) {
            setEditorState(newState);
            return 'handled';
          }
        }
      }

      return 'not-handled';
    };

    const handleReturn = (): DraftHandleValue => {
      if (editorState && setEditorState) {
        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();

        if (contentState) {
          setEditorState(mergeBlockData(editorState, contentState, startKey));
          return 'handled';
        }
      }

      return 'not-handled';
    };

    const handleChange = (editorState: EditorState) => {
      if (onChange) {
        onChange(draftToHtml(editorState.getCurrentContent()));
      }

      setEditorState?.(editorState);
    };

    return (
      <div
        className={clsx(
          'draft-editor',
          className,
          isNotEmpty() && classes.hidePlaceholder,
          classes.editor
        )}
      >
        {editorState && setEditorState && (
          <DraftEditor
            ref={ref as any}
            editorState={editorState}
            blockRendererFn={getDefaultBlockRenderer}
            blockStyleFn={getDefaultBlockStyle}
            keyBindingFn={getDefaultKeyBinding}
            handleKeyCommand={handleKeyCommand}
            handleReturn={handleReturn}
            onChange={handleChange}
            {...rest}
          />
        )}
      </div>
    );
  }
);

Editor.displayName = 'Editor';
export default Editor;
