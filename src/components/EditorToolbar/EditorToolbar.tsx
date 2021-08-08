import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

export interface EditorToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(
  ({ className, children, ...props }: EditorToolbarProps, ref) => {
    const classes = useStyles();

    return (
      <div
        ref={ref}
        className={clsx('draft-toolbar', className, classes.root)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EditorToolbar.displayName = 'EditorToolbar';

export default EditorToolbar;
