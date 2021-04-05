import React from 'react';
import { EditorState } from 'draft-js';

interface EditorContextType {
  editorState: EditorState;
  setEditorState(editorState: EditorState): void;
}

const EditorContext = React.createContext<EditorContextType | null>(null);

export default EditorContext;
