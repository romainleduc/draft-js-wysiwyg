import React, { useContext } from 'react';
import { Editor, RichUtils } from 'draft-js';
import EditorContext from './EditorContext';

export const EditorDraft = ({
    acceptCommands,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);
    const editor = React.useRef(null);

    const focusEditor = (e) => {
        setTimeout(() => {
            editor.current.focus();
        }, 0);
    }

    React.useEffect(() => {
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
                blockStyleFn={(block) => {
                    const textAlign = block.getData()?.get('textAlign');

                    if (textAlign) {
                        return `align-${textAlign}`;
                    }
                }}
                {...rest}
            />
        </div>
    );
}
