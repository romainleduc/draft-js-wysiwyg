import React from 'react';

export interface EditorToolbarProps
    extends React.HTMLAttributes<HTMLDivElement> {
        children: React.ReactNode;
}

const EditorToolbar = ({
    children,
    ...props
}: EditorToolbarProps) => {
    return (
        <div className={props.className}>
            {children}
        </div>
    );
}

export default EditorToolbar;
