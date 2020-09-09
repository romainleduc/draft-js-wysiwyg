import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import EditorContext from './EditorContext';
import { RichUtils } from 'draft-js';

export const ButtonBlockType = ({
    blockType,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);

    const toggleBlockType = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    return (
        <Button
            onClick={toggleBlockType}
            variant='contained'
            color='action'
            {...rest}
        />
    );
};
