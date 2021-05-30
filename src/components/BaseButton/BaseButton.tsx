import React, { forwardRef } from 'react';
import {
  fade,
  ButtonProps,
  Button,
  capitalize,
  withStyles,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';

export type SizeType = 'root' | 'label' | 'sizeLarge' | 'sizeSmall';

export interface BaseButtonProps extends ButtonProps {
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
}

const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.button,
    minWidth: 0,
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

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { className, classes, children, disabled, size, ...rest }: BaseButtonProps,
    ref
  ) => (
    <Button
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
    </Button>
  )
);

export default withStyles(styles, {
  name: 'DraftBaseButton',
})(BaseButton);
