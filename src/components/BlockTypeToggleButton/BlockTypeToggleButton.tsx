import React, { forwardRef, useCallback } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import DraftToggleButton from '../DraftToggleButton/DraftToggleButton';
import { ToggleButtonProps } from '@material-ui/lab';

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
  runFirstTime?: boolean;
}

const BlockTypeToggleButton = forwardRef<
  HTMLButtonElement,
  BlockTypeToggleButtonProps
>(({ value, selected, children, ...rest }: BlockTypeToggleButtonProps, ref) => {
  const handleToggle = useCallback(
    (editorState: EditorState): EditorState => {
      return RichUtils.toggleBlockType(editorState, value);
    },
    [value]
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
