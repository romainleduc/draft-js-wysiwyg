import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import {
    setBlockDataSelection,
    setAllBlocksData,
} from './utils';

export const TextAlignToggleButton = forwardRef(
    (
        {
            value,
            children,
            ignoreSelection,
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
                const contentState = editorState.getCurrentContent();
                const blockData = { textAlign: value };

                if (ignoreSelection) {
                    setEditorState(
                        setAllBlocksData(
                            editorState,
                            contentState,
                            blockData
                        )
                    );
                } else {
                    setEditorState(
                        setBlockDataSelection(
                            editorState,
                            contentState,
                            blockData
                        )
                    );
                }
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
