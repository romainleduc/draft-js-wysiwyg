import React, { useContext, useEffect } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { EditorState, RichUtils } from 'draft-js';

export const ToggleButtonBlockType = ({
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
            const newEditorState = RichUtils.toggleBlockType(
                EditorState.forceSelection(
                    editorState,
                    editorState.getSelection(),
                ),
                value
            );

            if (newEditorState) {
                setEditorState(newEditorState);
            }
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
