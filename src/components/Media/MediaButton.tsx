import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { MediaType } from './Media';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import { MediaVolumeProps } from './MediaVolume';

interface MediaAudioProps
  extends Omit<
    React.AudioHTMLAttributes<HTMLAudioElement>,
    'controls' | 'controlsList'
  > {
  volumeProps: MediaVolumeProps;
}

export interface MediaButtonProps extends ButtonProps {
  mediaType: MediaType;
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
      mediaType,
      audioProps,
      imgProps,
      videoProps,
      iframeProps,
      sourcesProps,
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
                mediaType,
              })
            ),
          0
        );

        onInserted?.();
      }
    };

    return (
      <Button ref={ref} onClick={handleClick} {...other}>
        {children}
      </Button>
    );
  }
);

export default MediaButton;
