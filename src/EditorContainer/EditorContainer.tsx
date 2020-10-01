import React, { useState, forwardRef } from 'react';
import { EditorState, EditorProps, Editor, RichUtils, ContentBlock, getDefaultKeyBinding } from 'draft-js';
import { mergeBlockData, indentSelection } from '../utils';
import EditorContext from '../EditorContext';

export interface EditorContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    acceptCommands?: any;
    editorToolbar?: React.ReactNode;
    editorProps?: EditorProps;
}

const EditorContainer = forwardRef(
    (
        {
            className,
            acceptCommands,
            editorToolbar,
            editorProps,
            ...rest
        }: EditorContainerProps,
        ref
    ) => {
        const [editorState, setEditorState] = useState(editorProps?.editorState || EditorState.createEmpty());
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
                            setEditorState(
                                indentSelection(
                                    editorState,
                                    contentState,
                                    'decrease'
                                )
                            );
                            return null;
                    }
                } else {
                    switch (e.key) {
                        case 'Tab':
                            e.preventDefault();
                            setEditorState(
                                indentSelection(
                                    editorState,
                                    contentState,
                                    'increase'
                                )
                            );
                            return null;
                    }
                }
            }

            return getDefaultKeyBinding(e);
        }

        return (
            <EditorContext.Provider value={{
                editorState,
                setEditorState,
            }}>
                <div ref={ref as any} {...rest}>
                    {editorToolbar}
                    <div onClick={focusEditor}>
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                            handleKeyCommand={handleKeyCommand}
                            handleReturn={handleReturn}
                            blockStyleFn={blockStyleFn}
                            keyBindingFn={keyBindingFn}
                            {...editorProps}
                        />
                    </div>
                </div>
            </EditorContext.Provider>
        );
    }
);

export default EditorContainer;
