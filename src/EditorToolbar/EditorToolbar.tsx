import React, { forwardRef } from 'react';

export interface EditorToolbarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(
    ({ children, ...props }: EditorToolbarProps, ref) => {
        return (
            <div ref={ref} className={props.className}>
                {children}
            </div>
        );
    }
);

EditorToolbar.displayName = 'EditorToolbar';

export default EditorToolbar;
