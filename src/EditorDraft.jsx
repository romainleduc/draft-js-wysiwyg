import React, { useContext } from 'react';
import { Editor, RichUtils, Modifier, EditorState } from 'draft-js';
import EditorContext from './EditorContext';
import { mergeBlockData } from './utils';

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

    const handleReturn = () => {
        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();

        if (contentState) {
            setEditorState(mergeBlockData(editorState, contentState, startKey));
            return "handled";
        }

        return "not-handled"
    }

    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                handleReturn={handleReturn}
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
