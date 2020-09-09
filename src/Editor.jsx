import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from './EditorContext';

export const Editor = ({
    className,
    children,
    editorState,
    onEditorStateChange,
    ...props
}) => {
    const init = () => {
        if (!editorState || !onEditorStateChange) {
            const [state, setState] = useState(EditorState.createEmpty());

            return {
                editorState: state,
                setEditorState: setState
            }
        }

        return {
            editorState,
            setEditorState: onEditorStateChange,
        }
    }

    return (
        <EditorContext.Provider value={init()}>
            <div {...props}>
                {children}
                {/* <textarea
                    readOnly
                    style={{ display: 'none' }}
                    value={stateToHTML(editorState.getCurrentContent())}
                /> */}
            </div>
        </EditorContext.Provider>
    );
}
