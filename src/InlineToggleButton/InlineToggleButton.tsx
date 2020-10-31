import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext';

export interface InlineToggleButtonProps
    extends Omit<ToggleButtonProps, 'value'> {
    value: string;
}

const InlineToggleButton = forwardRef<
    HTMLButtonElement,
    InlineToggleButtonProps
>(({ value, selected, children, ...rest }: InlineToggleButtonProps, ref) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    useEffect(() => {
        if (selected) {
            handleClick();
        }
    }, []);

    // Synchronize selection with keyboard shortcuts
    // const synchronizeSelection = () => {
    //     if (editorState && setEditorState) {
    //         if (editorState.getCurrentContent().hasText()) {
    //             const hasValue = editorState.getCurrentInlineStyle().has(value);

    //             return (hasValue && !selected) || (!hasValue && selected)
    //                 ? !selected
    //                 : selected;
    //         }
    //     }

    //     return selected;
    // };

    const handleClick = () => {
        if (editorState && setEditorState) {
            setEditorState(
                RichUtils.toggleInlineStyle(
                    EditorState.forceSelection(
                        editorState,
                        editorState.getSelection()
                    ),
                    value
                )
            );
        }
    };

    return (
        <ToggleButton
            ref={ref}
            onClick={handleClick}
            // selected={synchronizeSelection()}
            selected={selected}
            value={value}
            {...rest}
        >
            {children}
        </ToggleButton>
    );
});

InlineToggleButton.displayName = 'InlineToggleButton';

export default InlineToggleButton;
