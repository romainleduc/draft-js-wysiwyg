import React, { useContext } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import EditorContext from './EditorContext';

export const EditorDraft = ({
    acceptCommands,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);
    const editor = React.useRef(null);

    const focusEditor = (e) => {
        console.log('passe la ?')
        setTimeout(() => {
            console.log(editor.current)
            editor.current.focus();
        }, 0);
    }

    React.useEffect(() => {
        console.log('passe ici ou pas ?')
        focusEditor()
    }, []);

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
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                {...rest}
            />
        </div>
    );
}
