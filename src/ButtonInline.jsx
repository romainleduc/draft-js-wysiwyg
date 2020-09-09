import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import EditorContext from './EditorContext';
import { RichUtils } from 'draft-js';

export const ButtonInline = ({
    inlineStyle,
    ...rest
}) => {
    const { editorState, setEditorState } = useContext(EditorContext);

    const toggleInlineStyle = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    return (
        <Button
            onClick={toggleInlineStyle}
            variant='contained'
            color='action'
            {...rest}
        />
    );
};
