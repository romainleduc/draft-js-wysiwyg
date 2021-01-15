import React, { useContext, useEffect, forwardRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton, {
  DraftToggleButtonProps,
} from '../DraftToggleButton/DraftToggleButton';

export interface BlockTypeToggleButtonProps
  extends Omit<DraftToggleButtonProps, 'value' | 'onChange' | 'keyCommand'> {
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
      <DraftToggleButton
        ref={ref}
        onChange={handleChange}
        value={value}
        selected={selected}
        keyCommand={value}
        {...rest}
      >
        {children}
      </DraftToggleButton>
    );
  }
);

export default BlockTypeToggleButton;
