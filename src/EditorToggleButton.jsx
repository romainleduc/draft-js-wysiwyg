import React, { useContext } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { RichUtils, EditorState } from 'draft-js';

export const EditorToggleButton = ({
    type,
    value,
    selected,
    children,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);

    // Synchronize selection with keyboard shortcuts
    const checkSelected = () => {
        if (editorState.getCurrentContent().hasText()) {
            const hasValue = editorState
                .getCurrentInlineStyle()
                .has(value);

            return (hasValue && !selected) || (!hasValue && selected)
                ? !selected
                : selected;
        } else {
            return selected;
        }
    }

    const toggleSwitch = () => {
        const eSF = EditorState.forceSelection(
            editorState,
            editorState.getSelection(),
        )

        const {
            toggleInlineStyle,
            toggleBlockType,
        } = RichUtils;

        switch (type) {
            case 'inline':
                return toggleInlineStyle(eSF, value);
            case 'blockType':
                return toggleBlockType(eSF, value);
            default: return null;
        }
    }

    const handleClick = () => {
        if (editorState && setEditorState) {
            const newEditorState = toggleSwitch();

            if (newEditorState) {
                setEditorState(newEditorState);
            }
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
