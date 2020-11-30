import React, { useContext, forwardRef } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import EditorContext from '../EditorContext';
import { insertAtomicBlock } from '../../utils';
import clsx from 'clsx';

export interface AtomicImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  sourcesProps: React.SourceHTMLAttributes<HTMLSourceElement>[];
}

export interface AtomicImageButtonProps extends ButtonProps {
  onInserted?: () => void;
  atomicImageProps: AtomicImageProps;
}

const AtomicImageButton = forwardRef<HTMLButtonElement, AtomicImageButtonProps>(
  (
    {
      className,
      atomicImageProps,
      children,
      onInserted,
      ...other
    }: AtomicImageButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    const handleClick = () => {
      if (editorState && setEditorState) {
        setTimeout(
          () =>
            setEditorState(
              insertAtomicBlock(editorState, 'image', {
                atomicImageProps,
              })
            ),
          0
        );

        onInserted?.();
      }
    };

    return (
      <Button
        className={clsx(className, 'atomic-image-button')}
        ref={ref}
        onClick={handleClick}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

export default AtomicImageButton;
