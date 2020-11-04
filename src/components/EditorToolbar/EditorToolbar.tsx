import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface EditorToolbarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(
    ({ children, ...props }: EditorToolbarProps, ref) => {
        return (
            <div ref={ref} className={clsx('draft-toolbar', props.className)}>
                {children}
            </div>
        );
    }
);

EditorToolbar.displayName = 'EditorToolbar';

export default EditorToolbar;
