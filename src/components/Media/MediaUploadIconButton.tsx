import React, { useContext, forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { MediaType } from './Media';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';

export interface MediaUploadIconButtonProps extends IconButtonProps {
    mediaType: MediaType;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    audioProps?: React.AudioHTMLAttributes<HTMLAudioElement>;
    videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
    iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
}

export const MediaUploadIconButton = forwardRef<
    HTMLButtonElement,
    MediaUploadIconButtonProps
>(
    (
        {
            mediaType,
            audioProps,
            imgProps,
            videoProps,
            iframeProps,
            children,
            ...other
        }: MediaUploadIconButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};

        const handleClick = () => {
            if (editorState && setEditorState) {
                setEditorState(
                    insertAtomicBlock(editorState, mediaType, {
                        audioProps,
                        imgProps,
                        videoProps,
                        iframeProps,
                    })
                );
            }
        };

        return (
            <IconButton ref={ref} onClick={handleClick} {...other}>
                {children}
            </IconButton>
        );
    }
);
