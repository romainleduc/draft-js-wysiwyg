import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps, ToggleButtonGroup } from '@material-ui/lab';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext';

export interface BlockTypeToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'onChange'> {
  value: string;
  onChange?: (event: React.MouseEvent<HTMLElement>, value?: string) => void;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(({ value, selected, children, onChange, ...rest }: BlockTypeToggleButtonProps, ref) => {
  const { editorState, setEditorState } = useContext(EditorContext) || {};

  useEffect(() => {
    if (selected && value) {
      toggleBlockType(value);
    }
  }, []);

  const toggleBlockType = (buttonValue: string) => {
    if (editorState && setEditorState) {
      setEditorState(
        RichUtils.toggleBlockType(
          EditorState.forceSelection(editorState, editorState.getSelection()),
          buttonValue
        )
      );
    }
  };

  return (
    <ToggleButton
      ref={ref}
      onChange={(e: any) => {
        const buttonValue = value || e.target.value;

        if (buttonValue) {
          toggleBlockType(buttonValue);
        }

        onChange?.(e, buttonValue);
      }}
      value={value}
      selected={selected}
      {...rest}
    >
      {children}
    </ToggleButton>
  );
});

export default BlockTypeToggleButton;
