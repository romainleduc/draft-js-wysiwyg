import React, { forwardRef } from 'react';
import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@material-ui/lab';
import { isFragment } from 'react-is';
import { makeStyles, Theme } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import clsx from 'clsx';

export interface ToggleButtonGroupProps
  extends Omit<
    MuiToggleButtonGroupProps,
    'defaultValue' | 'onChange' | 'value' | 'exclusive'
  > {
  /**
   * If `true`, inline style will not be available from keyboard shortcuts
   * @default false
   */
  disableKeyboardShortcuts?: boolean;
  defaultValue?: string | string[];
}

export const useStyles = makeStyles((theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius,
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column',
  },
  /* Styles applied to the children. */
  grouped: {},
  /* Styles applied to the children if `orientation="horizontal"`. */
  groupedHorizontal: {
    '&:not(:first-child)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  /* Styles applied to the children if `orientation="vertical"`. */
  groupedVertical: {
    '&:not(:first-child)': {
      marginTop: -1,
      borderTop: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    '&:not(:last-child)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
}));

const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
  (
    {
      children,
      defaultValue,
      disableKeyboardShortcuts,
      className,
      orientation = 'horizontal',
      size = 'medium',
      ...other
    }: ToggleButtonGroupProps,
    ref
  ) => {
    const classes = useStyles();

    return (
      <div
        role="group"
        className={clsx(
          classes.root,
          {
            [classes.vertical]: orientation === 'vertical',
          },
          className
        )}
        ref={ref as any}
        {...other}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          if (process.env.NODE_ENV !== 'production') {
            if (isFragment(child)) {
              console.error(
                [
                  "Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
                  'Consider providing an array instead.',
                ].join('\n')
              );
            }
          }

          return React.cloneElement(child, {
            className: clsx(
              classes.grouped,
              classes[`grouped${capitalize(orientation)}`],
              child.props.className
            ),
            disableKeyboardShortcuts:
              child.props.disableKeyboardShortcuts || disableKeyboardShortcuts,
            size: child.props.size || size,
          });
        })}
      </div>
    );
  }
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
export default ToggleButtonGroup;
