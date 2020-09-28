import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { EditorState, RichUtils } from 'draft-js';

export const InlineToggleButton = forwardRef(
    (
        {
            value,
            selected,
            children,
            ...rest
        },
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext);

        useEffect(() => {
            if (selected) {
                handleClick();
            }
        }, []);

        // Synchronize selection with keyboard shortcuts
        const synchronizeSelection = () => {
            if (editorState && setEditorState) {
                if (editorState.getCurrentContent().hasText()) {
                    const hasValue = editorState
                        .getCurrentInlineStyle()
                        .has(value);

                    return (hasValue && !selected) || (!hasValue && selected)
                        ? !selected
                        : selected;
                }
            }

            return selected;
        }

        const handleClick = () => {
            if (editorState && setEditorState) {
                setEditorState(RichUtils.toggleInlineStyle(
                    EditorState.forceSelection(
                        editorState,
                        editorState.getSelection(),
                    ),
                    value
                ));
            }
        }

        return (
            <ToggleButton
                ref={ref}
                onClick={handleClick}
                selected={synchronizeSelection()}
                value={value}
                {...rest}
            >
                {children}
            </ToggleButton>
        );
    }
);
