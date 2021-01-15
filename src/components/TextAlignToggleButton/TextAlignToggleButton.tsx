import React, { useContext, useEffect, forwardRef } from 'react';
import { setBlockData, setBlocksData } from '../../utils';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton, {
  DraftToggleButtonProps,
} from '../DraftToggleButton/DraftToggleButton';

export interface TextAlignToggleButtonProps
  extends Omit<DraftToggleButtonProps, 'value' | 'keyCommand'> {
  value: 'left' | 'center' | 'right' | 'justify';
  ignoreSelection?: boolean;
}

const TextAlignToggleButton = forwardRef<
  HTMLButtonElement,
  TextAlignToggleButtonProps
>(
  (
    {
      selected,
      value,
      children,
      ignoreSelection = false,
      ...rest
    }: TextAlignToggleButtonProps,
    ref
  ) => {
    const { editorState, setEditorState } = useContext(EditorContext) || {};

    useEffect(() => {
      if (selected) {
        toggleTextAlign();
      }
    }, []);

    const handleClick = () => {
      toggleTextAlign();
    };

    const toggleTextAlign = () => {
      if (editorState && setEditorState) {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const blockData = { textAlign: value };

        if (ignoreSelection) {
          const contentBlocks = contentState.getBlocksAsArray();

          if (!!contentBlocks.length) {
            setEditorState(
              setBlocksData(
                editorState,
                contentState,
                contentBlocks[0].getKey(),
                contentBlocks[contentBlocks.length - 1].getKey(),
                blockData
              )
            );
          }
        } else {
          setEditorState(
            setBlockData(editorState, contentState, selectionState, blockData)
          );
        }
      }
    };

    return (
      <DraftToggleButton
        ref={ref}
        selected={selected}
        onClick={handleClick}
        keyCommand={`align-${value}`}
        value={value}
        {...rest}
      >
        {children}
      </DraftToggleButton>
    );
  }
);

export default TextAlignToggleButton;
