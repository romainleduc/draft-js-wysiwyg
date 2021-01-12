import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from './EditorContext';

export interface BlockTypeToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'onChange'> {
  value: string;
  onChange?: (event: React.MouseEvent<HTMLElement>, value?: string) => void;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(
  (
    {
      value,
      selected,
      children,
      onChange,
      ...rest
    }: BlockTypeToggleButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    useEffect(() => {
      if (selected && value) {
        toggleBlockType(value);
      }
    }, []);

    const handleChange = (event: React.FormEvent<HTMLButtonElement>) => {
      const buttonValue = value || (event.target as HTMLButtonElement).value;

      if (buttonValue) {
        toggleBlockType(buttonValue);
      }

      onChange?.(event as any, buttonValue);
    };

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
        onChange={handleChange}
        value={value}
        selected={selected}
        {...rest}
      >
        {children}
      </ToggleButton>
    );
  }
);

export default BlockTypeToggleButton;
