import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import clsx from 'clsx';

export interface AtomicIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {}

export interface AtomicIframeButtonProps extends ButtonProps {
  onInserted?: () => void;
  atomicIframeProps: AtomicIframeProps;
}

const AtomicIframeButton = forwardRef<HTMLButtonElement, AtomicIframeButtonProps>(
  (
    {
      className,
      atomicIframeProps,
      children,
      onInserted,
      ...other
    }: AtomicIframeButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleClick = () => {
      if (editorState && setEditorState) {
        setTimeout(
          () =>
            setEditorState(
              insertAtomicBlock(editorState, 'media', {
                atomicIframeProps,
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

export default AtomicIframeButton;
