import React, { forwardRef, useRef, useContext } from 'react';
import {
  EditorState,
  EditorProps as DraftEditorProps,
  Editor as DraftEditor,
  RichUtils,
  DraftHandleValue,
} from 'draft-js';
import { indentSelection, mergeBlockData, draftToHtml } from '../../utils';
import EditorContext from '../EditorContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import ReduxContext from '../ReduxContext';
import {
  getDefaultBlockRenderer,
  getDefaultBlockStyle,
  getDefaultKeyBinding,
} from '../../utils/editorUtils';
import 'draft-js/dist/Draft.css';
import { IndentCommand } from '../IndentDraftButton/IndentDraftButton';

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
});

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      keyCommands,
      keyBinding,
      onChange,
      ...rest
    }: EditorProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};
    const editor = useRef<DraftEditor>(null);
    const classes = userStyles();
    const { state } = useContext(ReduxContext);

    const focusEditor = (): void => {
      setTimeout(() => {
        if (editor && editor.current) {
          editor.current.focus();
        }
      }, 0);
    };

    React.useEffect(() => {
      focusEditor();
    }, []);

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
          const indentType = command === IndentCommand.Increase ? 'increase': 'decrease';

          setEditorState(
            indentSelection(
              editorState,
              contentState,
              indentType
            )
          );

          return 'handled';
        } else {
          const newState = RichUtils.handleKeyCommand(editorState, command);

          if (newState) {
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
        onChange(
          draftToHtml(editorState.getCurrentContent())
        );
      }

      setEditorState(editorState);
    }

    return (
      <div
        ref={ref}
        className={clsx('draft-editor', classes.editor, className)}
        onClick={focusEditor}
      >
        {editorState && setEditorState && (
          <DraftEditor
            ref={editor}
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
