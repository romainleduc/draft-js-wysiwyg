import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext';

export interface BlockTypeToggleButtonProps
  extends Omit<ToggleButtonProps, 'value'> {
  value: string;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(({ value, children, ...rest }: BlockTypeToggleButtonProps, ref) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};

  useEffect(() => {
    if (rest.selected) {
      handleClick();
    }
  }, []);

  const handleClick = () => {
    if (editorState && setEditorState) {
      setEditorState(
        RichUtils.toggleBlockType(
          EditorState.forceSelection(editorState, editorState.getSelection()),
          value
        )
      );
    }
  };

  return (
    <ToggleButton ref={ref} onClick={handleClick} value={value} {...rest}>
      {children}
    </ToggleButton>
  );
});

export default BlockTypeToggleButton;
