import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { EditorState, RichUtils } from 'draft-js';

export interface InlineToggleButtonProps extends ToggleButtonProps {}

const InlineToggleButton = forwardRef(
    (
        {
            value,
            selected,
            children,
            ...rest
        }: InlineToggleButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};

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
                ref={ref as any}
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

export default InlineToggleButton;
