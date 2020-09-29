import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from './EditorContext';

export interface EditorProps
    extends React.HTMLAttributes<HTMLDivElement> {
    editorState: EditorState,
    onEditorStateChange: React.Dispatch<React.SetStateAction<EditorState>>;
}

const Editor = ({
    className,
    children,
    editorState,
    onEditorStateChange,
    ...props
}: EditorProps) => {
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

export default Editor;
