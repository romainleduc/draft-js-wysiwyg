import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import clsx from 'clsx';

export interface AtomicMediaProps {
  url: string | string[] | any[];
  playing?: boolean;
  volume?: number;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  style?: any;
  width?: number;
  height?: number;
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
