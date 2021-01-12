import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import { ACTION_TYPES } from '../redux/constants';
import ReduxContext from './ReduxContext';

export interface DraftToggleButtonProps extends ToggleButtonProps {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
}

const DraftToggleButton = forwardRef<HTMLButtonElement, DraftToggleButtonProps>(
  (
    {
      value,
      selected,
      children,
      disableKeyboardShortcuts,
      ...rest
    }: DraftToggleButtonProps,
    ref
  ) => {
    const { dispatch } = useContext(ReduxContext);
    useEffect(() => {
      if (!disableKeyboardShortcuts) {
        dispatch({
          type: ACTION_TYPES.ADD_KEY_COMMAND,
          payload: value,
        });
      }
    }, []);

    return (
      <ToggleButton ref={ref} selected={selected} value={value} {...rest}>
        {children}
      </ToggleButton>
    );
  }
);

DraftToggleButton.displayName = 'DraftToggleButton';
export default DraftToggleButton;
