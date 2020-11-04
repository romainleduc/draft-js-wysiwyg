import React, { forwardRef, useRef, useContext } from 'react';
import {
    EditorState,
    EditorProps as DraftEditorProps,
    Editor as DraftEditor,
    RichUtils,
    ContentBlock,
    getDefaultKeyBinding,
    DraftHandleValue,
    DefaultDraftBlockRenderMap,
    DraftBlockRenderMap,
} from 'draft-js';
import { indentSelection, mergeBlockData } from '../../utils';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import EditorContext from '../EditorContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import ReduxContext from '../ReduxContext';
import 'draft-js/dist/Draft.css';
import { Media } from '../Media';

export interface EditorProps
    extends Omit<DraftEditorProps, 'editorState' | 'onChange'> {
    className?: string;
    keyCommands?: string[];
    keyBinding?: string[];
    onChange?(html: string): void;
    blockRenderMapIsExpandable?: boolean;
}

const userStyles = makeStyles({
    editor: {
        '& .public-DraftStyleDefault-ltr': {
            textAlign: 'inherit',
        },
        '& .align-left': {
            textAlign: 'left',
        },
        '& .align-center': {
            textAlign: 'center',
        },
        '& .align-right': {
            textAlign: 'right',
        },
    },
});

const Editor = forwardRef<HTMLDivElement, EditorProps>(
    (
        {
            className,
            keyCommands,
            keyBinding,
            onChange,
            blockRenderMap,
            blockRenderMapIsExpandable,
            ...rest
        }: EditorProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};
        const editor = useRef<DraftEditor>(null);
        const classes = userStyles();
        const { state } = useContext(ReduxContext);

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
            if (
                keyCommands?.includes(command) ||
                state.keyCommands.includes(command)
            ) {
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

        const blockRenderMapFn = (): DraftBlockRenderMap | undefined => {
            if (blockRenderMap) {
                if (blockRenderMapIsExpandable) {
                    return DefaultDraftBlockRenderMap.merge(blockRenderMap);
                }

                return blockRenderMap;
            }

            return undefined;
        };

        return (
            <div
                ref={ref}
                className={clsx('draft-editor', classes.editor, className)}
                onClick={focusEditor}
            >
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
                        blockRenderMap={blockRenderMapFn()}
                        keyBindingFn={(e) => {
                            if (
                                editorState &&
                                setEditorState &&
                                (keyBinding?.includes(e.key) ||
                                    state.keyBinding.includes(e.key))
                            ) {
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
