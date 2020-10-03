import React, { useState, forwardRef, useRef } from 'react';
import {
    EditorState,
    EditorProps,
    Editor,
    RichUtils,
    ContentBlock,
    getDefaultKeyBinding,
    DraftHandleValue,
} from 'draft-js';
import { indentSelection, mergeBlockData } from '../utils';
import EditorContext from '../EditorContext';

export interface EditorContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    acceptCommands?: string[];
    editorToolbar?: React.ReactNode;
    editorProps?: EditorProps;
}

const EditorContainer = forwardRef<HTMLDivElement, EditorContainerProps>(
    (
        {
            acceptCommands,
            editorToolbar,
            editorProps,
            ...rest
        }: EditorContainerProps,
        ref
    ) => {
        const [editorState, setEditorState] = useState(
            editorProps?.editorState || EditorState.createEmpty()
        );
        const editor = useRef<Editor>(null);

        const focusEditor = (): void => {
            setTimeout(() => {
                if (editor && editor.current) {
                    editor.current.focus();
                }
            }, 0);
        };

        React.useEffect(() => {
            focusEditor();
        }, []);

        const handleKeyCommand = (
            command: string,
            editorState: EditorState
        ): DraftHandleValue => {
            if (!acceptCommands || acceptCommands.includes(command)) {
                const newState = RichUtils.handleKeyCommand(
                    editorState,
                    command
                );

                if (newState && setEditorState) {
                    setEditorState(newState);
                    return 'handled';
                }
            }

            return 'not-handled';
        };

        const handleReturn = (): DraftHandleValue => {
            if (editorState && setEditorState) {
                const contentState = editorState.getCurrentContent();
                const startKey = editorState.getSelection().getStartKey();

                if (contentState) {
                    setEditorState(
                        mergeBlockData(editorState, contentState, startKey)
                    );
                    return 'handled';
                }
            }

            return 'not-handled';
        };

        const blockStyleFn = (contentBlock: ContentBlock): string => {
            const textAlign = contentBlock.getData()?.get('textAlign');

            if (textAlign) {
                return `align-${textAlign}`;
            }

            return '';
        };

        return (
            <EditorContext.Provider
                value={{
                    editorState,
                    setEditorState,
                }}
            >
                <div ref={ref} {...rest}>
                    {editorToolbar}
                    <div onClick={focusEditor}>
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                            handleKeyCommand={handleKeyCommand}
                            handleReturn={handleReturn}
                            blockStyleFn={blockStyleFn}
                            keyBindingFn={(e) => {
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
                            }}
                            {...editorProps}
                        />
                    </div>
                </div>
            </EditorContext.Provider>
        );
    }
);

EditorContainer.displayName = 'EditorContainer';

export default EditorContainer;
