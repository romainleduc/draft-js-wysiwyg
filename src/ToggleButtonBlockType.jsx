import React, { useContext } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { RichUtils, EditorState } from 'draft-js';

export const ToggleButtonBlockType = ({
    value,
    selected,
    children,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);
    const {
        getCurrentBlockType,
        toggleBlockType,
    } = RichUtils;

    const checkSelected = () => {
        return getCurrentBlockType(editorState) === value;
    }

    const handleClick = () => {
        if (editorState && setEditorState) {
            const editorStateFocused = EditorState.forceSelection(
                editorState,
                editorState.getSelection(),
            );

            setEditorState(toggleBlockType(editorStateFocused, value));
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
