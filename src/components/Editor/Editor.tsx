import React, { forwardRef, useContext } from 'react';
import {
  EditorState,
  EditorProps as DraftEditorProps,
  Editor as DraftEditor,
  RichUtils,
  DraftHandleValue,
  DraftStyleMap,
} from 'draft-js';
import { indentSelection, mergeBlockData, draftToHtml } from '../../utils';
import EditorContext from './EditorContext';
import { makeStyles } from '@material-ui/core';
import ReduxContext from '../ReduxContext';
import {
  getDefaultBlockRenderer,
  getDefaultBlockStyle,
  getDefaultKeyBinding,
} from '../../utils/editorUtils';
import { IndentCommand } from '../IndentDraftButton/IndentDraftButton';
import clsx from 'clsx';
import EditorProviderContext from '../EditorProvider/EditorProviderContext';

export interface EditorProps
  extends Omit<DraftEditorProps, 'editorState' | 'onChange'> {
  className?: string;
  keyCommands?: string[];
  keyBinding?: string[];
  onChange?(html: string): void;
  onClick?: (event: any, editorState: EditorState | undefined) => void;
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
  (
    { className, keyCommands, onChange, onClick, ...rest }: EditorProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};
    const { state, dispatch } = useContext(ReduxContext);
    const { customStyleMaps } = useContext(EditorProviderContext);
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

    const getCustomStyleMap = (): DraftStyleMap => {
      const nextCustomStyleMap = new Map();

      customStyleMaps.forEach((customStyleMap) => {
        Object.keys(customStyleMap.styles).forEach((style) => {
          nextCustomStyleMap.set(
            [`${customStyleMap.group}_${style}`],
            customStyleMap.styles[style]
          );
        });
      });

      return Object.fromEntries(nextCustomStyleMap);
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

    const handleChange = (newEditorState: EditorState) => {
      if (onChange) {
        onChange(draftToHtml(newEditorState.getCurrentContent()));
      }

      setEditorState?.(newEditorState);
    };

    return (
      <div
        className={clsx(
          'draft-editor',
          className,
          isNotEmpty() && classes.hidePlaceholder,
          classes.editor
        )}
        onClick={(event) => onClick?.(event, editorState)}
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
            customStyleMap={getCustomStyleMap()}
            {...rest}
          />
        )}
      </div>
    );
  }
);

Editor.displayName = 'Editor';
export default Editor;
