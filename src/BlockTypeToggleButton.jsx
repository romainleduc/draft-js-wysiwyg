import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { EditorState, RichUtils } from 'draft-js';

export const BlockTypeToggleButton = forwardRef(
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
                setEditorState(RichUtils.toggleBlockType(
                    EditorState.forceSelection(
                        editorState,
                        editorState.getSelection(),
                    ),
                    value
                ));
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
