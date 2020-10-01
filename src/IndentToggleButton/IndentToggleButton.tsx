import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import EditorContext from '../EditorContext';
import { indentSelection, isOutdentable } from '../utils';

export interface IndentToggleButtonProps
    extends Omit<ToggleButtonProps, 'value'> {
    value: 'increase' | 'decrease';
}

const IndentToggleButton = forwardRef(
    (
        {
            value,
            children,
            ...rest
        }: IndentToggleButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};

        useEffect(() => {
            if (rest.selected) {
                handleClick();
            }
        }, []);

        const handleClick = () => {
            if (editorState && setEditorState) {
                setEditorState(
                    indentSelection(
                        editorState,
                        editorState.getCurrentContent(),
                        value
                    )
                );
            }
        }

        const isDisabled = () => {
            if (editorState && setEditorState) {
                if (value === 'decrease') {
                    return !isOutdentable(editorState.getSelection(), editorState.getCurrentContent());
                }
            }

            return rest.disabled;
        }

        return (
            <ToggleButton
                ref={ref as any}
                onClick={(e: any) => {
                    e.preventDefault();
                    handleClick();
                }}
                disabled={isDisabled()}
                value={value}
                {...rest}
            >
                {children}
            </ToggleButton>
        );
    }
);

export default IndentToggleButton;
