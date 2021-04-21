import React, { forwardRef, useContext, useEffect } from 'react';
import { ButtonProps } from '@material-ui/core';
import ReduxContext from '../ReduxContext';
import { ACTION_TYPES } from '../../redux/constants';
import BaseButton from '../BaseButton/BaseButton';

export interface DraftButtonProps extends ButtonProps {
  /**
   *
   */
  keyCommand: string;
  /**
   * If `true`, indentation will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
}

const DraftButton = forwardRef<HTMLButtonElement, DraftButtonProps>(
  (
    {
      children,
      keyCommand,
      disableKeyboardShortcuts,
      ...other
    }: DraftButtonProps,
    ref
  ) => {
    const { dispatch } = useContext(ReduxContext);

    useEffect(() => {
      if (!disableKeyboardShortcuts) {
        dispatch({
          type: ACTION_TYPES.ADD_KEY_COMMAND,
          payload: keyCommand,
        });
      }
    }, []);

    return (
      <BaseButton {...other}>
        {children}
      </BaseButton>
    );
  }
);

DraftButton.displayName = 'DraftButton';

export default DraftButton;
