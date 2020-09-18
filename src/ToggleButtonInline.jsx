import React, { useContext } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { RichUtils } from 'draft-js';

export const ToggleButtonInline = ({
    value,
    selected,
    children,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);

    // Synchronize selection with keyboard shortcuts
    const checkSelected = () => {
        const hasValue = editorState
            .getCurrentInlineStyle()
            .has(value.toUpperCase());

        return (hasValue && !selected) || (!hasValue && selected)
            ? !selected
            : selected;
    }

    const handleClick = () => {
        if (editorState && setEditorState) {
            setEditorState(RichUtils.toggleInlineStyle(editorState, value));
        }
    }

    return (
        <ToggleButton
            onClick={handleClick}
            selected={checkSelected()}
            value={value}
            {...rest}
        >
            {children}
        </ToggleButton>
    );
};
