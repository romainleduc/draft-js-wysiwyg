import React, { forwardRef, useContext, useEffect } from 'react';
import {
  fade,
  ButtonBaseProps,
  ButtonBase,
  capitalize,
  withStyles,
  Theme,
} from '@material-ui/core';
import ReduxContext from '../ReduxContext';
import clsx from 'clsx';
import { ACTION_TYPES } from '../../redux/constants';

export type SizeType = 'root' | 'label' | 'sizeLarge' | 'sizeSmall';

export interface DraftButtonProps extends ButtonBaseProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    label?: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall?: string;
    /** Styles applied to the root element if `size="large"`. */
    sizeLarge?: string;
  };
  /**
   * The size of the button.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
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

const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.button,
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    color: fade(theme.palette.action.active, 0.38),
    '&$disabled': {
      color: fade(theme.palette.action.disabled, 0.12),
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(theme.palette.text.primary, 0.05),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the `label` wrapper element. */
  label: {
    width: '100%', // Ensure the correct width for iOS Safari
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: 7,
    fontSize: theme.typography.pxToRem(13),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    padding: 15,
    fontSize: theme.typography.pxToRem(15),
  },
});

const DraftButton = forwardRef<HTMLButtonElement, DraftButtonProps>(
  (
    {
      className,
      classes,
      children,
      disabled,
      size,
      keyCommand,
      disableKeyboardShortcuts,
      ...rest
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
      <ButtonBase
        className={clsx(
          classes?.root,
          size && {
            [classes?.[`size${capitalize(size)}` as SizeType] as any]:
              size !== 'medium',
          },
          {
            [classes?.disabled as any]: disabled,
          },
          className
        )}
        ref={ref}
        {...rest}
      >
        <span className={classes?.label}>{children}</span>
      </ButtonBase>
    );
  }
);

DraftButton.displayName = 'DraftButton';

export default withStyles(styles)(DraftButton);
