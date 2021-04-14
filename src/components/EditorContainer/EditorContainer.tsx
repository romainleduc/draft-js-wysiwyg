import React, { forwardRef, useReducer, useState } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import clsx from 'clsx';
import keyCommandsReducer from '../../redux/reducers/keyCommandsReducer';
import ReduxContext from '../ReduxContext';
import { initialState } from '../../redux/reducers/keyCommandsReducer';
import { NoSsr } from '@material-ui/core';
import ToggleContext from '../ToggleContext/ToggleContext';

export interface EditorContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  editorState: EditorState;
  onChangeEditorState(editorState: EditorState): void;
  noSsr?: boolean;
}

const RenderWithPossibleSsr = ({ noSsr, children, ...other }) => {
  if (noSsr) {
    return <NoSsr {...other}>{children}</NoSsr>;
  }

  return children;
};

const EditorContainer = forwardRef<HTMLDivElement, EditorContainerProps>(
  (
    {
      className,
      editorState,
      onChangeEditorState,
      children,
      noSsr,
      ...rest
    }: EditorContainerProps,
    ref
  ) => {
    const [state, dispatch] = useReducer(keyCommandsReducer, initialState);
    const [inlineStyles, setInlineStyles] = useState<string[]>([]);
    const [blockType, setBlockType] = useState<string | null>(null);

    return (
      <RenderWithPossibleSsr noSsr={noSsr}>
        <ReduxContext.Provider value={{ state, dispatch }}>
          <EditorContext.Provider
            value={{
              editorState,
              setEditorState: onChangeEditorState,
            }}
          >
            <ToggleContext.Provider
              value={{
                inlineStyles,
                setInlineStyles,
                blockType,
                setBlockType
              }}
            >
            <div
              ref={ref}
              {...rest}
              className={clsx('draft-container', className)}
            >
              {children}
            </div>
            </ToggleContext.Provider>
          </EditorContext.Provider>
        </ReduxContext.Provider>
      </RenderWithPossibleSsr>
    );
  }
);

EditorContainer.displayName = 'EditorContainer';

export default EditorContainer;
