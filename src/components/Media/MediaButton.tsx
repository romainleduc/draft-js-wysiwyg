import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { MediaType } from './Media';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import clsx from 'clsx';

export interface MediaButtonProps extends ButtonProps {
  mediaType: MediaType;
  customControls?: (audio: HTMLMediaElement) => JSX.Element;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  audioProps?: React.AudioHTMLAttributes<HTMLAudioElement>;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
  sourcesProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  onInserted?: () => void;
}

const MediaButton = forwardRef<HTMLButtonElement, MediaButtonProps>(
  (
    {
      className,
      mediaType,
      audioProps,
      imgProps,
      videoProps,
      iframeProps,
      sourcesProps,
      customControls,
      children,
      onInserted,
      ...other
    }: MediaButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleClick = () => {
      if (editorState && setEditorState) {
        setTimeout(
          () =>
            setEditorState(
              insertAtomicBlock(editorState, mediaType, {
                audioProps,
                imgProps,
                videoProps,
                iframeProps,
                sourcesProps,
                customControls,
                mediaType,
              })
            ),
          0
        );

        onInserted?.();
      }
    };

    return (
      <Button
        className={clsx(className, 'media-button')}
        ref={ref}
        onClick={handleClick}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

export default MediaButton;
