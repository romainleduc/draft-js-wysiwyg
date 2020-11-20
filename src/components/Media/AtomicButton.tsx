import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { MediaType } from './Media';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import clsx from 'clsx';
import { AtomicVideoProps } from './AtomicVideoButton';
import { AtomicAudioProps } from './AtomicAudioButton';
import { AtomicImageProps } from './AtomicImageButton';

export interface AtomicButtonProps extends ButtonProps {
  mediaType: MediaType;
  onInserted?: () => void;
  atomicVideoProps?: AtomicVideoProps;
  atomicAudioProps?: AtomicAudioProps;
  atomicImageProps?: AtomicImageProps;
}

const AtomicButton = forwardRef<HTMLButtonElement, AtomicButtonProps>(
  (
    {
      className,
      mediaType,
      atomicVideoProps,
      atomicAudioProps,
      children,
      onInserted,
      ...other
    }: AtomicButtonProps,
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
                atomicVideoProps,
                atomicAudioProps,
              })
            ),
          0
        );

        onInserted?.();
      }
    };

    return (
      <Button
        className={clsx(className, 'atomic-button')}
        ref={ref}
        onClick={handleClick}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

export default AtomicButton;
