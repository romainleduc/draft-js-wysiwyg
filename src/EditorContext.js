import React from 'react';

const EditorContext = React.createContext({
    editorState: undefined,
    setEditorState: undefined,
});

export default EditorContext;