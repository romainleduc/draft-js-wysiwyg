import React from 'react';
import {
    Editor,
    EditorState,
    RichUtils
} from 'draft-js';

const WysiwygEditor = (props) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    return (
        <Editor
            ref={props.editorRef}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={editorState => setEditorState(editorState)}
        />
    );
}

export default WysiwygEditor;