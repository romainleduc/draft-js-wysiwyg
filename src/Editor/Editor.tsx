import React, { forwardRef, useRef, useContext } from 'react';
import {
    EditorState,
    EditorProps as DraftEditorProps,
    Editor as DraftEditor,
    RichUtils,
    ContentBlock,
    getDefaultKeyBinding,
    DraftHandleValue,
} from 'draft-js';
import { indentSelection, mergeBlockData } from '../utils';
import { draftToHtml } from '../utils';
import { convertToRaw } from 'draft-js';
import EditorContext from '../EditorContext';
import { Media } from '../Media';

export interface EditorProps
    extends Omit<DraftEditorProps, 'editorState' | 'onChange'> {
    acceptCommands?: string[];
    onChange?(html: string): void;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
    ({ acceptCommands, onChange, ...rest }: EditorProps, ref) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};
        const editor = useRef<DraftEditor>(null);

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

        const mediaBlockRenderer = (contentBlock: ContentBlock) => {
            if (contentBlock.getType() === 'atomic') {
                return {
                    component: Media,
                    editable: false,
                };
            }

            return null;
        };

        const blockStyleFn = (contentBlock: ContentBlock): string => {
            const textAlign = contentBlock.getData()?.get('textAlign');

            if (textAlign) {
                return `align-${textAlign}`;
            }

            return '';
        };

        return (
            <div ref={ref} onClick={focusEditor}>
                {editorState && setEditorState && (
                    <DraftEditor
                        ref={editor}
                        editorState={editorState}
                        onChange={(editorState) => {
                            if (onChange) {
                                onChange(
                                    draftToHtml(
                                        convertToRaw(
                                            editorState.getCurrentContent()
                                        )
                                    )
                                );
                            }

                            setEditorState(editorState);
                        }}
                        handleKeyCommand={handleKeyCommand}
                        handleReturn={handleReturn}
                        blockRendererFn={mediaBlockRenderer}
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
                        {...rest}
                    />
                )}
            </div>
        );
    }
);

Editor.displayName = 'Editor';

export default Editor;
