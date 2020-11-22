import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { MediaType } from './Media';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import clsx from 'clsx';

export interface AtomicMediaButtonProps extends ButtonProps {
  mediaType: MediaType;
  onInserted?: () => void;
  src: string | string[];
  mediaProps?:
    | React.ImgHTMLAttributes<HTMLImageElement>
    | React.AudioHTMLAttributes<HTMLAudioElement>
    | React.VideoHTMLAttributes<HTMLVideoElement>;
  customControls?: (video: HTMLVideoElement) => JSX.Element;
  sourceProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
}

const AtomicMediaButton = forwardRef<HTMLButtonElement, AtomicMediaButtonProps>(
  (
    {
      className,
      mediaType,
      src,
      mediaProps,
      sourceProps,
      customControls,
      children,
      onInserted,
      ...other
    }: AtomicMediaButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleClick = () => {
      if (editorState && setEditorState) {
        setTimeout(
          () =>
            setEditorState(
              insertAtomicBlock(editorState, mediaType, {
                mediaType,
                src,
                mediaProps,
                sourceProps,
                customControls,
              })
            ),
          0
        );

        onInserted?.();
      }
    };

    return (
      <Button
        className={clsx(className, 'atomic-media-button')}
        ref={ref}
        onClick={handleClick}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

export default AtomicMediaButton;
