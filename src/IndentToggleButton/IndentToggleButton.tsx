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
}

const IndentToggleButton = forwardRef<
    HTMLButtonElement,
    IndentToggleButtonProps
>(({ value, children, ...rest }: IndentToggleButtonProps, ref) => {
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
            return indentIncreaseSelection(editorState, contentState);
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
            onClick={setIndentSelection}
            disabled={isDisabled()}
            value={value}
            {...rest}
        >
            {children}
        </ToggleButton>
    );
});

export default IndentToggleButton;
