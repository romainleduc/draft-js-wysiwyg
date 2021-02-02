import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { ACTION_TYPES } from '../../redux/constants';
import ReduxContext from '../ReduxContext';

export interface DraftToggleButtonProps
  extends Omit<ToggleButtonProps, 'onChange'> {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  /**
   *
   */
  keyCommand: string;
  /**
   *
   */
  onChange?: any;
  /**
   *
   */
  onToggle?: () => void;
}

const DraftToggleButton = forwardRef<HTMLButtonElement, DraftToggleButtonProps>(
  (
    {
      value,
      children,
      disableKeyboardShortcuts,
      onChange,
      onToggle,
      selected,
      keyCommand,
      ...other
    }: DraftToggleButtonProps,
    ref
  ) => {
    const { state, dispatch } = useContext(ReduxContext);

    useEffect(() => {
      if (!disableKeyboardShortcuts) {
        dispatch({
          type: ACTION_TYPES.ADD_KEY_COMMAND,
          payload: keyCommand,
        });
      }

      if (selected) {
        onToggle?.();
      }
    }, []);

    const hasSelectedKeyCommand = () => {
      return state.selectedKeyCommands.includes(keyCommand);
    };

    const handleChange = (event: any) => {
      if (onChange) {
        if (hasSelectedKeyCommand()) {
          dispatch({
            type: ACTION_TYPES.SWITCH_SELECTED_KEY_COMMAND,
            payload: keyCommand,
          });

          value = null;
        }

        onToggle?.();
        onChange(event, value);
      }
    };

    return (
      <ToggleButton
        ref={ref}
        value={value}
        onChange={handleChange}
        selected={
          (selected && !hasSelectedKeyCommand()) ||
          (!selected && hasSelectedKeyCommand())
        }
        {...other}
      >
        {children}
      </ToggleButton>
    );
  }
);

DraftToggleButton.displayName = 'DraftToggleButton';
export default DraftToggleButton;
