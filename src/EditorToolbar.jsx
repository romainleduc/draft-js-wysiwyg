import React from 'react';

export const EditorToolbar = ({
    itemsProps,
    children,
    ...props
}) => {
    return (
        <div className={props.className}>
            {children}
        </div>
    );
}
