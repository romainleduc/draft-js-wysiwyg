import React, { useContext } from 'react';
import { Editor, RichUtils } from 'draft-js';
import EditorContext from './EditorContext';

export const EditorDraft = ({
    acceptCommands,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);

    const handleKeyCommand = (command, editorState) => {
        if (!acceptCommands || acceptCommands.includes(command)) {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setEditorState(newState);
                return 'handled';
            }
        }

        return 'not-handled';
    }

    return (
        <Editor
            {...rest}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
        />
    );
}
