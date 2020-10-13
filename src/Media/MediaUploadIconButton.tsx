import React, { useContext, forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { MediaType } from './Media';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../utils';

export interface MediaUploadIconButtonProps extends IconButtonProps {
    mediaType: MediaType;
    src: string;
    alt?: string;
}

export const MediaUploadIconButton = forwardRef<
    HTMLButtonElement,
    MediaUploadIconButtonProps
>(({ mediaType, src, alt, children, ...other }: MediaUploadIconButtonProps, ref) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    console.log(editorState)

    const handleClick = () => {
        if (editorState && setEditorState) {
            setEditorState(insertAtomicBlock(editorState, mediaType, { src, alt }));
        }
    }

    return (
        <IconButton
            ref={ref}
            onClick={handleClick}
            {...other}
        >
            {children}
        </IconButton>
    );
});