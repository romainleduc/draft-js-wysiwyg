import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab';
import {
    indentIncreaseSelection,
    indentDecreaseSelection,
    isOutdentable,
} from '../utils';
import EditorContext from '../EditorContext';
import { EditorState } from 'draft-js';

export interface IndentToggleButtonProps
    extends Omit<ToggleButtonProps, 'value'> {
    value: 'increase' | 'decrease';
    nestedListOnly?: boolean;
}

const IndentToggleButton = forwardRef<
    HTMLButtonElement,
    IndentToggleButtonProps
>(
    (
        {
            value,
            children,
            nestedListOnly = false,
            ...rest
        }: IndentToggleButtonProps,
        ref
    ) => {
        const { editorState, setEditorState } = useContext(EditorContext) || {};

        useEffect(() => {
            if (rest.selected) {
                setIndentSelection();
            }
        }, []);

        const setIndentSelection = (): void => {
            if (editorState && setEditorState) {
                setEditorState(indentSelection(editorState));
            }
        };

        const indentSelection = (editorState: EditorState): EditorState => {
            const contentState = editorState.getCurrentContent();

            if (value === 'increase') {
                return indentIncreaseSelection(
                    editorState,
                    contentState,
                    nestedListOnly
                );
            } else if (value === 'decrease') {
                return indentDecreaseSelection(editorState, contentState);
            }

            return editorState;
        };

        const isDisabled = () => {
            if (editorState && setEditorState) {
                if (value === 'decrease') {
                    return !isOutdentable(
                        editorState.getSelection(),
                        editorState.getCurrentContent()
                    );
                }
            }

            return rest.disabled;
        };

        return (
            <ToggleButton
                ref={ref}
                onMouseDown={(e) => {
                    e.preventDefault();
                    setIndentSelection();
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
