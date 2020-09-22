import React, { useContext, useEffect } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { EditorState, Modifier } from 'draft-js';

export const ToggleButtonTextAlign = ({
    value,
    children,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);

    useEffect(() => {
        if (rest.selected) {
            handleClick();
        }
    }, []);

    const handleClick = () => {
        if (editorState && setEditorState) {
            const newContentState = Modifier.setBlockData(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                { textAlign: value }
            );

            setEditorState(EditorState.push(editorState, newContentState, 'change-block-data'));
        }
    }

    return (
        <ToggleButton
            onClick={handleClick}
            value={value}
            {...rest}
        >
            {children}
        </ToggleButton>
    );
};
