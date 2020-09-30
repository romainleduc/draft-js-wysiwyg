import React from 'react';
import {
    EditorState,
} from 'draft-js';

interface EditorContextType {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const EditorContext = React.createContext<EditorContextType | null>(null);

export default EditorContext;