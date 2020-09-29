import React, {
    useContext,
    useEffect,
    forwardRef,
} from 'react';
import {
    ToggleButton,
    ToggleButtonProps,
} from '@material-ui/lab';
import EditorContext from './EditorContext';
import {
    setBlockData,
    setAllBlocksData,
} from './utils';

export interface TextAlignToggleButtonProps extends ToggleButtonProps {
    ignoreSelection: boolean;
}

const TextAlignToggleButton = forwardRef(
    (
        {
            selected,
            value,
            children,
            ignoreSelection,
            ...rest
        }: TextAlignToggleButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};

        useEffect(() => {
            if (selected) {
                handleClick();
            }
        }, []);

        const handleClick = () => {
            if (editorState && setEditorState) {
                const contentState = editorState.getCurrentContent();
                const selectionState = editorState.getSelection();
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
                        setBlockData(
                            editorState,
                            contentState,
                            selectionState,
                            blockData
                        )
                    );
                }
            }
        }

        return (
            <ToggleButton
                ref={ref as any}
                selected={selected}
                onClick={handleClick}
                value={value}
                {...rest}
            >
                {children}
            </ToggleButton>
        );
    }
);

export default TextAlignToggleButton;
