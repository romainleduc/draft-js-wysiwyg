import React, { useContext, forwardRef, useCallback } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from '../EditorContext/EditorContext';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';
import { insertBlockType } from '../../utils';

export interface BlockTypeToggleButtonProps
  extends Omit<ToggleButtonProps, 'value'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   *
   */
  value: string;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(({ value, selected, children, ...rest }: BlockTypeToggleButtonProps, ref) => {
  const { setEditorState } = useContext(EditorContext) || {};

  const handleToggle = useCallback(
    (targetEditorState: EditorState) => {
      setEditorState?.(
        insertBlockType(targetEditorState, selected ? value : 'unstyled')
      );
    },
    [selected, value]
  );

  return (
    <DraftToggleButton
      ref={ref}
      value={value}
      onToggle={handleToggle}
      selected={selected}
      keyCommand={value}
      {...rest}
    >
      {children}
    </DraftToggleButton>
  );
});

export default BlockTypeToggleButton;
