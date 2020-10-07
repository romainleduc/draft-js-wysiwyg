import React, { useState, forwardRef } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from '../EditorContext';

export interface EditorContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    editorState?: EditorState;
}

const EditorContainer = forwardRef<HTMLDivElement, EditorContainerProps>(
    (
        {
            editorState: editorStateProps,
            children,
            ...rest
        }: EditorContainerProps,
        ref
    ) => {
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
                <div ref={ref} {...rest}>
                    {children}
                </div>
            </EditorContext.Provider>
        );
    }
);

EditorContainer.displayName = 'EditorContainer';

export default EditorContainer;
