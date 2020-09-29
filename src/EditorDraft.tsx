import React, { useContext } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding, EditorProps, EditorState, ContentBlock } from 'draft-js';
import EditorContext from './EditorContext';
import { mergeBlockData, indentSelection, outdentSelection } from './utils';

export interface EditorDraftProps extends EditorProps {
    acceptCommands: any
}

const EditorDraft = ({
    acceptCommands,
    ...rest
}: EditorDraftProps) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};
    const editor = React.useRef(null) as any;

    const focusEditor = () => {
        setTimeout(() => {
            editor.current.focus();
        }, 0);
    }

    React.useEffect(() => {
        focusEditor()
    }, []);

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        if (!acceptCommands || acceptCommands.includes(command)) {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState && setEditorState) {
                setEditorState(newState);
                return 'handled';
            }
        }

        return 'not-handled';
    }

    const handleReturn = () => {
        if (editorState && setEditorState) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
    
            if (contentState) {
                setEditorState(mergeBlockData(editorState, contentState, startKey));
                return "handled";
            }
        }

        return "not-handled"
    }

    const blockStyleFn = (contentBlock: ContentBlock) => {
        const textAlign = contentBlock.getData()?.get('textAlign');

        if (textAlign) {
            return `align-${textAlign}`;
        }

        return '';
    }

    const keyBindingFn = (e: React.KeyboardEvent<{}>) => {
        if (editorState && setEditorState) {
            const contentState = editorState.getCurrentContent();
    
            if (e.shiftKey) {
                switch (e.key) {
                    case 'Tab':
                        e.preventDefault();
                        setEditorState(outdentSelection(editorState, contentState));
                        return null;
                }
            } else {
                switch (e.key) {
                    case 'Tab':
                        e.preventDefault();
                        setEditorState(indentSelection(editorState, contentState));
                        return null;
                }
            }
        }

        return getDefaultKeyBinding(e);
    }

    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                handleReturn={handleReturn}
                blockStyleFn={blockStyleFn}
                keyBindingFn={keyBindingFn}
                {...rest}
            />
        </div>
    );
}

export default EditorDraft;
