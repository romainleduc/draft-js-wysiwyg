import React, { forwardRef } from 'react';

export interface EditorToolbarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const EditorToolbar = forwardRef(
    (
        {
            children,
            ...props
        }: EditorToolbarProps,
        ref
    ) => {
        return (
            <div ref={ref as any} className={props.className}>
                {children}
            </div>
        );
    });

export default EditorToolbar;
