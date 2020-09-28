import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { setBlockData } from './utils';

export const TextAlignToggleButton = forwardRef(
    (
        {
            value,
            children,
            ...rest
        },
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext);

        useEffect(() => {
            if (rest.selected) {
                handleClick();
            }
        }, []);

        const handleClick = () => {
            if (editorState && setEditorState) {
                setEditorState(setBlockData(editorState, { textAlign: value }));
            }
        }

        return (
            <ToggleButton
                ref={ref}
                onClick={handleClick}
                value={value}
                {...rest}
            >
                {children}
            </ToggleButton>
        );
    }
);
