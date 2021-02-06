import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import { getMediaType } from './patterns';
import clsx from 'clsx';

export interface AtomicMediaProps
  extends Omit<React.MediaHTMLAttributes<HTMLMediaElement>, 'src'> {
  sourcesProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  src: string;
}

export interface AtomicMediaButtonProps extends ButtonProps {
  onInserted?: () => void;
  atomicMediaProps: AtomicMediaProps;
}

const AtomicMediaButton = forwardRef<HTMLButtonElement, AtomicMediaButtonProps>(
  (
    {
      className,
      atomicMediaProps,
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
              insertAtomicBlock(editorState, 'media', {
                atomicMediaProps,
                atomicMediaType: getMediaType(atomicMediaProps.src),
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
