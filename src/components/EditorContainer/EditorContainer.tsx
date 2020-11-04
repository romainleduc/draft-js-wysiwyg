import React, { useState, forwardRef, useReducer } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from '../EditorContext';
import clsx from 'clsx';
import keyCommandsReducer from '../../redux/reducers/keyCommandsReducer';
import ReduxContext from '../ReduxContext';
import { initialState } from '../../redux/reducers/keyCommandsReducer';

export interface EditorContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    editorState?: EditorState;
}

const EditorContainer = forwardRef<HTMLDivElement, EditorContainerProps>(
    (
        {
            className,
            editorState: editorStateProps,
            children,
            ...rest
        }: EditorContainerProps,
        ref
    ) => {
        const [state, dispatch] = useReducer(keyCommandsReducer, initialState);
        const [editorState, setEditorState] = useState(
            editorStateProps || EditorState.createEmpty()
        );

        return (
            <EditorContext.Provider
                value={{
                    editorState,
                    setEditorState,
                }}
            >
                <ReduxContext.Provider value={{ state, dispatch }}>
                    <div
                        ref={ref}
                        {...rest}
                        className={clsx('draft-container', className)}
                    >
                        {children}
                    </div>
                </ReduxContext.Provider>
            </EditorContext.Provider>
        );
    }
);

EditorContainer.displayName = 'EditorContainer';

export default EditorContainer;
