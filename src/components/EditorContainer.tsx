import React, { useState, forwardRef, useReducer } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from './EditorContext';
import clsx from 'clsx';
import keyCommandsReducer from '../redux/reducers/keyCommandsReducer';
import ReduxContext from './ReduxContext';
import { initialState } from '../redux/reducers/keyCommandsReducer';
import { NoSsr } from '@material-ui/core';

export interface EditorContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  editorState?: EditorState;
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
      editorState: editorStateProps,
      children,
      noSsr,
      ...rest
    }: EditorContainerProps,
    ref
  ) => {
    const [state, dispatch] = useReducer(keyCommandsReducer, initialState);
    const [editorState, setEditorState] = useState(
      editorStateProps || EditorState.createEmpty()
    );

    return (
      <RenderWithPossibleSsr noSsr={noSsr}>
        <ReduxContext.Provider value={{ state, dispatch }}>
          <EditorContext.Provider
            value={{
              editorState,
              setEditorState,
            }}
          >
            <div
              ref={ref}
              {...rest}
              className={clsx('draft-container', className)}
            >
              {children}
            </div>
          </EditorContext.Provider>
        </ReduxContext.Provider>
      </RenderWithPossibleSsr>
    );
  }
);

EditorContainer.displayName = 'EditorContainer';

export default EditorContainer;
