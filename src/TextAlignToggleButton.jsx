import React, { useContext, useEffect } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { setBlockData } from './utils';

export const TextAlignToggleButton = ({
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
            setEditorState(setBlockData(editorState, { textAlign: value }));
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
